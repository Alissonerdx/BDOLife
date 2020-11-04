using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BDOLife.Web.Migrations
{
    public partial class colheita : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Colheitas",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FrutaReferenciaId = table.Column<string>(nullable: true),
                    PlantaReferenciaId = table.Column<string>(nullable: false),
                    PlantaEspecialReferenciaId = table.Column<string>(nullable: true),
                    PlantaAltaQualidadeReferenciaId = table.Column<string>(nullable: true),
                    Baixa = table.Column<decimal>(nullable: false),
                    Perfeita = table.Column<decimal>(nullable: false),
                    Alta = table.Column<decimal>(nullable: false),
                    TempoPerfeito = table.Column<TimeSpan>(nullable: false),
                    TempoComFertilizante = table.Column<TimeSpan>(nullable: false),
                    RegiaoIndicada = table.Column<string>(nullable: true),
                    Slot = table.Column<int>(nullable: false),
                    ValorCaixa = table.Column<long>(nullable: true),
                    ValorSementeMagica = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Colheitas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Colheitas_Itens_FrutaReferenciaId",
                        column: x => x.FrutaReferenciaId,
                        principalTable: "Itens",
                        principalColumn: "ReferenciaId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Colheitas_Itens_PlantaAltaQualidadeReferenciaId",
                        column: x => x.PlantaAltaQualidadeReferenciaId,
                        principalTable: "Itens",
                        principalColumn: "ReferenciaId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Colheitas_Itens_PlantaEspecialReferenciaId",
                        column: x => x.PlantaEspecialReferenciaId,
                        principalTable: "Itens",
                        principalColumn: "ReferenciaId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Colheitas_Itens_PlantaReferenciaId",
                        column: x => x.PlantaReferenciaId,
                        principalTable: "Itens",
                        principalColumn: "ReferenciaId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Colheitas_FrutaReferenciaId",
                table: "Colheitas",
                column: "FrutaReferenciaId");

            migrationBuilder.CreateIndex(
                name: "IX_Colheitas_PlantaAltaQualidadeReferenciaId",
                table: "Colheitas",
                column: "PlantaAltaQualidadeReferenciaId",
                unique: true,
                filter: "[PlantaAltaQualidadeReferenciaId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Colheitas_PlantaEspecialReferenciaId",
                table: "Colheitas",
                column: "PlantaEspecialReferenciaId",
                unique: true,
                filter: "[PlantaEspecialReferenciaId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Colheitas_PlantaReferenciaId",
                table: "Colheitas",
                column: "PlantaReferenciaId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Colheitas");
        }
    }
}
