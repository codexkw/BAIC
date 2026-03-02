using Microsoft.AspNetCore.Mvc;

namespace BAIC.Web.Controllers;

public class AboutController : Controller
{
    public IActionResult Index() => View();
    public IActionResult History() => View();
    public IActionResult ESG() => View();
    public IActionResult AfterSale() => View();
}
