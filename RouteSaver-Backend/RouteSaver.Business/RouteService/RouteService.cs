﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;
using RouteSaver.EF;
using RouteSaver.EF.Entities;

namespace RouteSaver.Business.RouteService
{
    public class RouteService : IRouteService
    {
        private readonly RouteSaverDbContext _context;

        public RouteService(RouteSaverDbContext context)
        {
            _context = context;
        }

        public void CreateRoute(string routeName, List<string> routePoints, int userId)
        {
            var user = _context.Users.FirstOrDefault(x => x.Id == userId);
            var route = new Route
            {
                RouteName = routeName,
                Owner = user
            };

            var routePointsEntity = routePoints.Select(x => new RoutePoint
            {
                PointName = x
            })
            .ToList();

            route.RoutePoints = routePointsEntity;
            _context.Routes.Add(route);
            _context.SaveChanges();
        }

        public IEnumerable<Route> GetAllRoutes(int userId)
        {
            return _context.Routes
                .Include(x => x.RoutePoints)
                .Include(x => x.Owner)
                .Where(x => x.Owner.Id == userId)
                .ToList();
        }

        public Route GetRouteById(int id)
        {
            return _context.Routes.FirstOrDefault(x => x.Id == id);
        }
    }
}
