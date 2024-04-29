using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Membru> Membrii { get; set; }
        public DbSet<Grade> Grade { get; set; }
        public DbSet<GradeMembrii> GradeMembrii { get; set; }


        

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