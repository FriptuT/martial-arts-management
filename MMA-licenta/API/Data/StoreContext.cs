using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext: DbContext
    {
        public StoreContext(DbContextOptions options): base(options)
        {

        }

        public DbSet<Membru> Membrii { get; set; }
        public DbSet<Grade> Grade { get; set; }
        public DbSet<GradeMembrii> GradeMembrii { get; set; }
    }
}