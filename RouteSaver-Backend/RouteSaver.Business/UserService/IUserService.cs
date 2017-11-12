using RouteSaver.EF.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace RouteSaver.Business.UserService
{
    public interface IUserService
    {
        User Authenticate(string username, string password);
        User Create(User user, string password);
    }
}
