using System;
using System.Collections.Generic;
using System.Text;
using RouteSaver.EF.Entities;

namespace RouteSaver.Business.RouteService
{
    public interface IRouteService
    {
        void CreateRoute(string routeName, List<string> routePoints, int userId);

        IEnumerable<Route> GetAllRoutes(int userId);

        Route GetRouteById(int id);
    }
}
