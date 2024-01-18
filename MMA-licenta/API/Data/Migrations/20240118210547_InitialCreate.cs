﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Grade",
                columns: table => new
                {
                    IdGrad = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    NumeGrad = table.Column<string>(type: "TEXT", maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Grade", x => x.IdGrad);
                });

            migrationBuilder.CreateTable(
                name: "Membrii",
                columns: table => new
                {
                    MembruId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Email = table.Column<string>(type: "TEXT", maxLength: 255, nullable: false),
                    Parola = table.Column<string>(type: "TEXT", maxLength: 255, nullable: false),
                    Nume = table.Column<string>(type: "TEXT", maxLength: 255, nullable: false),
                    DataNasterii = table.Column<DateTime>(type: "Date", nullable: false),
                    Gen = table.Column<string>(type: "TEXT", maxLength: 10, nullable: true),
                    TipMembru = table.Column<string>(type: "TEXT", maxLength: 50, nullable: true),
                    NrLegitimatie = table.Column<int>(type: "INTEGER", nullable: false),
                    ActivInactiv = table.Column<string>(type: "TEXT", maxLength: 10, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Membrii", x => x.MembruId);
                });

            migrationBuilder.CreateTable(
                name: "GradeMembrii",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    MembruId = table.Column<int>(type: "INTEGER", nullable: false),
                    DataObtinerii = table.Column<DateTime>(type: "TEXT", nullable: false),
                    IdGrad = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GradeMembrii", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GradeMembrii_Grade_IdGrad",
                        column: x => x.IdGrad,
                        principalTable: "Grade",
                        principalColumn: "IdGrad",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GradeMembrii_Membrii_MembruId",
                        column: x => x.MembruId,
                        principalTable: "Membrii",
                        principalColumn: "MembruId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GradeMembrii_IdGrad",
                table: "GradeMembrii",
                column: "IdGrad");

            migrationBuilder.CreateIndex(
                name: "IX_GradeMembrii_MembruId",
                table: "GradeMembrii",
                column: "MembruId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GradeMembrii");

            migrationBuilder.DropTable(
                name: "Grade");

            migrationBuilder.DropTable(
                name: "Membrii");
        }
    }
}
