using Microsoft.EntityFrameworkCore.Migrations;

namespace BDOLife.Web.Migrations
{
    public partial class AddPorcentagem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PorcentagemBonus",
                table: "Imperiais",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PorcentagemBonus",
                table: "Imperiais");
        }
    }
}
