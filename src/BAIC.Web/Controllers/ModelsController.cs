using Microsoft.AspNetCore.Mvc;

namespace BAIC.Web.Controllers;

public class ModelsController : Controller
{
    public IActionResult BJ30() => View();
    public IActionResult BJ80() => View();
}
