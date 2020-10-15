using Microsoft.EntityFrameworkCore.Migrations;

namespace BDOLife.Web.Migrations
{
    public partial class AdicionadoMaestriaCulinaria : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MaestriasCulinaria",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Mastery = table.Column<int>(nullable: false),
                    RegularMaxProcChance = table.Column<double>(nullable: false),
                    RareMaxProcChance = table.Column<double>(nullable: false),
                    RareAddChance = table.Column<double>(nullable: false),
                    MassProduceChance = table.Column<double>(nullable: false),
                    ImperialBonus = table.Column<double>(nullable: false),
                    RegularProc = table.Column<double>(nullable: false),
                    RareProc = table.Column<double>(nullable: false),
                    Crafts = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MaestriasCulinaria", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MaestriasCulinaria");
        }
    }
}
