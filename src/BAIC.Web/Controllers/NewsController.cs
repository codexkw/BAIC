using Microsoft.AspNetCore.Mvc;

namespace BAIC.Web.Controllers;

public class NewsController : Controller
{
    public IActionResult NewsRelease() => View();
    public IActionResult Subscribe() => View();
    public IActionResult MediaContact() => View();
    public IActionResult DownloadCenter() => View();
}
