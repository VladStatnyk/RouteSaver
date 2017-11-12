using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Text;

namespace RouteSaver.EF.Entities
{
    public class Route
    {
        public int Id { get; set; }

        public string RouteName { get; set; }

        public List<RoutePoint> RoutePoints { get; set; }

        public User Owner { get; set; }
    }
}
