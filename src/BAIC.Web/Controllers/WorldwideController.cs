using Microsoft.AspNetCore.Mvc;

namespace BAIC.Web.Controllers;

public class WorldwideController : Controller
{
    public IActionResult Index() => View();
}
