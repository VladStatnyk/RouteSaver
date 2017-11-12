using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RouteSaver.Business.RouteService;
using RouteSaver.WebApi.DTO;

namespace RouteSaver.WebApi.Controllers
{
    [Route("[controller]")]
    [Authorize]
    public class RouteController : Controller
    {
        private readonly IRouteService _routeService;

        public RouteController(IRouteService routeService)
        {
            _routeService = routeService;
        }

        [HttpPost("create")]
        public IActionResult Create([FromBody]RouteDto routeDto)
        {
            var userName = HttpContext.User.Identity.Name;
            List<string> routePoints = new List<string>
            {
                routeDto.FirstPoint,
                routeDto.LastPoint
            };

            routePoints.AddRange(routeDto.MiddlePoints);
            _routeService.CreateRoute(routeDto.RouteName, routePoints, userName);

            return Ok();
        }

        [HttpGet("get-all-routes")]
        public IActionResult GetAllRoutes()
        {
            var userName = HttpContext.User.Identity.Name;
            var allRoutes = _routeService.GetAllRoutes(userName);
            return Ok(allRoutes);
        }

        [HttpGet("get-route-by-id")]
        public IActionResult GetRouteById(int routeId)
        {
            var route = _routeService.GetRouteById(routeId);
            return Ok(route);
        }
    }
}