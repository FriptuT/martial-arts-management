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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // one-to-many relationship between Member and GradeMember
            modelBuilder.Entity<Membru>()
                .HasMany(m => m.GradeMembrii)
                .WithOne(gm => gm.Membru)
                .HasForeignKey(gm => gm.MembruId)
                .IsRequired();

            //  one-to-many relationship between Grade and GradeMember
            modelBuilder.Entity<Grade>()
                .HasMany(g => g.GradeMembrii)
                .WithOne(gm => gm.Grade)
                .HasForeignKey(gm => gm.IdGrad)
                .IsRequired();
        }

    }
}