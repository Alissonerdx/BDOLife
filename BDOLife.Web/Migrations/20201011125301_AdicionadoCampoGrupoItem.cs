using Microsoft.EntityFrameworkCore.Migrations;

namespace BDOLife.Web.Migrations
{
    public partial class AdicionadoCampoGrupoItem : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Itens_Agrupamentos_AgrupamentoId",
                table: "Itens");

            migrationBuilder.DropIndex(
                name: "IX_Itens_AgrupamentoId",
                table: "Itens");

            migrationBuilder.AddColumn<string>(
                name: "Grupo",
                table: "Itens",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Grupo",
                table: "Itens");

            migrationBuilder.CreateIndex(
                name: "IX_Itens_AgrupamentoId",
                table: "Itens",
                column: "AgrupamentoId");

            migrationBuilder.AddForeignKey(
                name: "FK_Itens_Agrupamentos_AgrupamentoId",
                table: "Itens",
                column: "AgrupamentoId",
                principalTable: "Agrupamentos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
