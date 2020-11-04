using Microsoft.EntityFrameworkCore.Migrations;

namespace BDOLife.Web.Migrations
{
    public partial class indexes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Colheitas_FrutaReferenciaId",
                table: "Colheitas");

            migrationBuilder.DropIndex(
              name: "IX_Colheitas_PlantaAltaQualidadeReferenciaId",
              table: "Colheitas");

            migrationBuilder.DropIndex(
               name: "IX_Colheitas_PlantaEspecialReferenciaId",
               table: "Colheitas");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Colheitas_FrutaReferenciaId",
                table: "Colheitas",
                column: "FrutaReferenciaId");

            migrationBuilder.CreateIndex(
                name: "IX_Colheitas_PlantaAltaQualidadeReferenciaId",
                table: "Colheitas",
                column: "PlantaAltaQualidadeReferenciaId");

            migrationBuilder.CreateIndex(
                name: "IX_Colheitas_PlantaEspecialReferenciaId",
                table: "Colheitas",
                column: "PlantaEspecialReferenciaId");

        }
    }
}
