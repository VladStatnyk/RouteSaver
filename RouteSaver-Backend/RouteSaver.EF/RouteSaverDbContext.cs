using System;
using System.Collections.Generic;
using System.Text;
using RouteSaver.EF.Entities;
using Microsoft.EntityFrameworkCore;

namespace RouteSaver.EF
{
    public class RouteSaverDbContext : DbContext
    {
        public RouteSaverDbContext(DbContextOptions<RouteSaverDbContext> options) : base(options)
        {
           
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Route> Routes { get; set; }

        public DbSet<RoutePoint> RoutePoints { get; set; }
    }
}
