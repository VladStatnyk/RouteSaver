using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RouteSaver.Business.RouteService;
using RouteSaver.EF.Entities;
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
            var userId = Convert.ToInt32(HttpContext.User.Identity.Name);
            List<string> routePoints = new List<string>
            {
                routeDto.FirstPoint,
                routeDto.LastPoint
            };

            if (routeDto.MiddlePoints != null && routeDto.MiddlePoints.Length != 0)
            {
                routePoints.AddRange(routeDto.MiddlePoints);
            }

            _routeService.CreateRoute(routeDto.RouteName, routePoints, userId);

            return Ok();
        }

        [HttpGet("get-all-routes")]
        public IActionResult GetAllRoutes()
        {
            var userId = Convert.ToInt32(HttpContext.User.Identity.Name);
            var allRoutes = _routeService.GetAllRoutes(userId);
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