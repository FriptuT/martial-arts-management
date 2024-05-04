using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext : IdentityDbContext<User>
    {
        public StoreContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Membru> Membrii { get; set; }
        public DbSet<Grade> Grade { get; set; }
        public DbSet<GradeMembrii> GradeMembrii { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<IdentityRole>()
                .HasData(
                    new IdentityRole{Name = "Member", NormalizedName = "MEMBER"},
                    new IdentityRole{Name = "Admin", NormalizedName = "ADMIN"}
                );
        }




        // protected override void OnModelCreating(ModelBuilder modelBuilder)
        // {
        //     base.OnModelCreating(modelBuilder);

        //     modelBuilder.Entity<GradeMembrii>()
        //         .HasMany(m => m.Grade)
        //         .WithOne(gm => gm.Membru)
        //         .HasForeignKey(gm => gm.MembruId)
        //         .IsRequired();

        //     modelBuilder.Entity<Grade>()
        //         .HasMany(g => g.GradeMembrii)
        //         .WithOne(gm => gm.Grade)
        //         .HasForeignKey(gm => gm.IdGrad)
        //         .IsRequired();
        // }

    }
}