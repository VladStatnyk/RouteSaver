using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RouteSaver.WebApi.DTO
{
    public class RouteDto
    {
        public string FirstPoint { get; set; }

        public string LastPoint { get; set; }

        public string[] MiddlePoints { get; set; }

        public string RouteName { get; set; }
    }
}
