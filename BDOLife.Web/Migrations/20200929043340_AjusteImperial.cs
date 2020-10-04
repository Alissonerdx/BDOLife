using Microsoft.EntityFrameworkCore.Migrations;

namespace BDOLife.Web.Migrations
{
    public partial class AjusteImperial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Excluido",
                table: "Imperiais",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "Tipo",
                table: "Imperiais",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Excluido",
                table: "Imperiais");

            migrationBuilder.DropColumn(
                name: "Tipo",
                table: "Imperiais");
        }
    }
}
