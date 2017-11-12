using System;
using System.Collections.Generic;
using System.Text;
using RouteSaver.EF.Entities;

namespace RouteSaver.Business.RouteService
{
    public interface IRouteService
    {
        void CreateRoute(string routeName, List<string> routePoints, string userName);

        IEnumerable<Route> GetAllRoutes(string userName);

        Route GetRouteById(int id);
    }
}
