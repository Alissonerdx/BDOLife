using Microsoft.EntityFrameworkCore.Migrations;

namespace BDOLife.Web.Migrations
{
    public partial class AdicionadoValorNPC : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LocalizacaoNPC",
                table: "Itens",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "ValorNPC",
                table: "Itens",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LocalizacaoNPC",
                table: "Itens");

            migrationBuilder.DropColumn(
                name: "ValorNPC",
                table: "Itens");
        }
    }
}
