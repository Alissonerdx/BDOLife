using Microsoft.EntityFrameworkCore.Migrations;

namespace BDOLife.Web.Migrations
{
    public partial class AdicionadoLevel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "NiveisProfissoes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Descricao = table.Column<string>(nullable: true),
                    Nivel = table.Column<int>(nullable: false),
                    ExperienciaProximoLevel = table.Column<decimal>(nullable: false),
                    ExperienciaTotal = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NiveisProfissoes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PedrasAlquimia",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(nullable: true),
                    Categoria = table.Column<int>(nullable: false),
                    Tipo = table.Column<int>(nullable: false),
                    BonusProcessamento = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PedrasAlquimia", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NiveisProfissoes");

            migrationBuilder.DropTable(
                name: "PedrasAlquimia");
        }
    }
}
