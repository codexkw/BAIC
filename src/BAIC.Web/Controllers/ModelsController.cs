using Microsoft.AspNetCore.Mvc;

namespace BAIC.Web.Controllers;

public class ModelsController : Controller
{
    public IActionResult BJ30() => View();
    public IActionResult BJ80() => View();
    public IActionResult BJ60() => View();
    public IActionResult BJ40Plus() => View();
    public IActionResult BJ40PlusRHD() => View();
    public IActionResult AllNewX7() => View();
}
