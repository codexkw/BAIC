using Microsoft.AspNetCore.Mvc;

namespace BAIC.Web.Controllers;

public class HomeController : Controller
{
    public IActionResult Index() => View();
    public IActionResult Error() => View();
}
