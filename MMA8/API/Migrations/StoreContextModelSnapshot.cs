﻿// <auto-generated />
using System;
using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace API.Migrations
{
    [DbContext(typeof(StoreContext))]
    partial class StoreContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("API.Entities.Grade", b =>
                {
                    b.Property<int>("IdGrad")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IdGrad"));

                    b.Property<string>("NumeGrad")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("IdGrad");

                    b.ToTable("Grade");
                });

            modelBuilder.Entity("API.Entities.GradeMembrii", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DataObtinerii")
                        .HasColumnType("datetime2");

                    b.Property<int>("IdGrad")
                        .HasColumnType("int");

                    b.Property<int>("MembruId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("IdGrad");

                    b.HasIndex("MembruId");

                    b.ToTable("GradeMembrii");
                });

            modelBuilder.Entity("API.Entities.Membru", b =>
                {
                    b.Property<int>("MembruId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("MembruId"));

                    b.Property<bool>("Activ")
                        .HasColumnType("bit");

                    b.Property<DateTime>("DataNasterii")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Gen")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("NrLegitimatie")
                        .HasColumnType("int");

                    b.Property<string>("Nume")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Parola")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Poza")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TipMembru")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Varsta")
                        .HasColumnType("int");

                    b.HasKey("MembruId");

                    b.ToTable("Membrii");
                });

            modelBuilder.Entity("API.Entities.GradeMembrii", b =>
                {
                    b.HasOne("API.Entities.Grade", "Grade")
                        .WithMany("GradeMembrii")
                        .HasForeignKey("IdGrad")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("API.Entities.Membru", "Membru")
                        .WithMany("GradeMembrii")
                        .HasForeignKey("MembruId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Grade");

                    b.Navigation("Membru");
                });

            modelBuilder.Entity("API.Entities.Grade", b =>
                {
                    b.Navigation("GradeMembrii");
                });

            modelBuilder.Entity("API.Entities.Membru", b =>
                {
                    b.Navigation("GradeMembrii");
                });
#pragma warning restore 612, 618
        }
    }
}
