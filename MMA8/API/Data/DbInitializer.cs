using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(StoreContext context, UserManager<User> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user =  new User
                {
                    UserName = "teodor",
                    Email = "teodor@test.com"
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
                await userManager.AddToRoleAsync(user, "Member");

                var admin = new User
                {
                    UserName = "admin",
                    Email = "admin@test.com"
                };

                await userManager.CreateAsync(admin, "Pa$$w0rd");
                await userManager.AddToRolesAsync(admin, new[] {"Member", "Admin"});
            }


            if (context.Grade.Any())
            {
                return;
            }
            
            var grade = new List<Grade>
            {
                new Grade{
                    NumeGrad = "centura-alba"
                },
                new Grade{
                    NumeGrad = "centura-galbena"
                },
                new Grade{
                    NumeGrad = "centura-portocalie"
                },
                new Grade{
                    NumeGrad = "centura-rosie"
                },
                new Grade{
                    NumeGrad = "centura-verde"
                },
                new Grade{
                    NumeGrad = "centura-albastra"
                },
                new Grade{
                    NumeGrad = "centura-mov"
                },
                new Grade{
                    NumeGrad = "centura-maro"
                },
                new Grade{
                    NumeGrad = "centura-neagra"
                }

            };


            foreach (var grad in grade)
            {
                context.Grade.Add(grad);
            }

            context.SaveChanges();
        }
    }
}