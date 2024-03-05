using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Data
{
    public static class DbInitializer
    {
        public static void Initialize(StoreContext context)
        {
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