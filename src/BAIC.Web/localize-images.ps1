param(
  [Parameter(Mandatory=$true)][string]$File
)

# Process a view file: extract baicglobal image URLs, download to wwwroot/images/baicglobal/<decoded-path>,
# then rewrite the file replacing remote URLs with ~/images/baicglobal/<decoded-path> (or /images/... in CSS/JS).

$ErrorActionPreference = 'Stop'

# Read as UTF-8 (PS 5.1's Get-Content -Raw defaults to ANSI/cp1252 which mangles non-ASCII).
$utf8NoBom = New-Object System.Text.UTF8Encoding $false
$resolved = (Resolve-Path -LiteralPath $File).Path
$content = [System.IO.File]::ReadAllText($resolved, [System.Text.Encoding]::UTF8)

# Extract candidate URLs (image extensions only). Allow spaces / parens in the path — stop only at quote, angle, or backtick.
$pattern = 'https://www\.baicglobal\.com/[^"''<>`]+?\.(?:jpg|jpeg|png|webp|avif|gif|svg)'
$matches = [regex]::Matches($content, $pattern, 'IgnoreCase')
$urls = $matches | ForEach-Object { $_.Value } | Sort-Object -Unique

if ($urls.Count -eq 0) {
  Write-Host "No image URLs found in $File"
  exit 0
}

Write-Host "Found $($urls.Count) unique image URL(s) in $File"

# Determine if file is css/js (use absolute / paths) or razor/html (~/ paths)
$ext = [IO.Path]::GetExtension($File).ToLowerInvariant()
$useRazor = $ext -eq '.cshtml'

$mappings = @{}
foreach ($u in $urls) {
  $remotePath = $u.Substring('https://www.baicglobal.com/'.Length)
  $decoded = [System.Net.WebUtility]::UrlDecode($remotePath)
  # Build a properly URL-encoded request URL: encode each path segment (preserve '/')
  $encodedSegments = $decoded.Split('/') | ForEach-Object { [System.Uri]::EscapeDataString($_) }
  $requestUrl = 'https://www.baicglobal.com/' + ($encodedSegments -join '/')
  $disk = Join-Path 'wwwroot/images/baicglobal' $decoded
  $dir = Split-Path $disk
  if (-not (Test-Path $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
  if (-not (Test-Path $disk)) {
    $ok = $false
    for ($attempt = 1; $attempt -le 3 -and -not $ok; $attempt++) {
      try {
        Invoke-WebRequest -Uri $requestUrl -OutFile $disk -UseBasicParsing -TimeoutSec 120
        $size = (Get-Item $disk).Length
        if ($size -lt 100) { throw "tiny file ($size bytes)" }
        Write-Host "  OK  $size  $decoded"
        $ok = $true
      } catch {
        Write-Host "  RETRY[$attempt] $requestUrl :: $($_.Exception.Message)"
        if (Test-Path $disk) { Remove-Item -LiteralPath $disk -Force }
      }
    }
    if (-not $ok) {
      Write-Host "  FAIL after 3 attempts: $u"
      continue
    }
  } else {
    Write-Host "  SKIP exists  $decoded"
  }
  if ($useRazor) {
    $mappings[$u] = '~/images/baicglobal/' + $decoded
  } else {
    $mappings[$u] = '/images/baicglobal/' + $decoded
  }
}

# Rewrite content
$new = $content
foreach ($k in $mappings.Keys) {
  $new = $new.Replace($k, $mappings[$k])
}

if ($new -ne $content) {
  # Write without BOM to avoid breaking Razor / static file parsing
  $utf8NoBom = New-Object System.Text.UTF8Encoding $false
  [System.IO.File]::WriteAllText((Resolve-Path $File), $new, $utf8NoBom)
  Write-Host "Rewrote $File"
} else {
  Write-Host "No changes to $File"
}
