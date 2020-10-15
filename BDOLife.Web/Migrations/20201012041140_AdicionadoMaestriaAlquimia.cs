using Microsoft.EntityFrameworkCore.Migrations;

namespace BDOLife.Web.Migrations
{
    public partial class AdicionadoMaestriaAlquimia : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MaestriasAlquimia",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Mastery = table.Column<int>(nullable: false),
                    MaxProcChance = table.Column<double>(nullable: false),
                    ChanceRegularItems = table.Column<double>(nullable: false),
                    ChanceSpecialItems = table.Column<double>(nullable: false),
                    ChanceRareItems = table.Column<double>(nullable: false),
                    ImperialBonus = table.Column<double>(nullable: false),
                    RegularProc = table.Column<double>(nullable: false),
                    RareProc = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaestriasAlquimia", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MaestriasAlquimia");
        }
    }
}
