using Microsoft.EntityFrameworkCore.Migrations;

namespace BDOLife.Web.Migrations
{
    public partial class AdicionadoTiposProcessos : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Tier",
                table: "ReceitasResultados",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "TiposProcessos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Descricao = table.Column<int>(nullable: false),
                    Excluido = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TiposProcessos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TiposProcessosExperiencia",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Descricao = table.Column<string>(nullable: true),
                    MediaXpPorCraft = table.Column<int>(nullable: false),
                    QtdMaterialAPorCraft = table.Column<decimal>(nullable: false),
                    QtdMaterialBPorCraft = table.Column<decimal>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TiposProcessosExperiencia", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TiposProcessos");

            migrationBuilder.DropTable(
                name: "TiposProcessosExperiencia");

            migrationBuilder.DropColumn(
                name: "Tier",
                table: "ReceitasResultados");
        }
    }
}
