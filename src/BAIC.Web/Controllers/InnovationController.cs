using Microsoft.AspNetCore.Mvc;

namespace BAIC.Web.Controllers;

public class InnovationController : Controller
{
    public IActionResult CapitalBeauty() => View();
    public IActionResult ConceptCar() => View();
    public IActionResult ConceptCar2026() => View();
    public IActionResult OffRoad() => View();
    public IActionResult Power() => View();
}
