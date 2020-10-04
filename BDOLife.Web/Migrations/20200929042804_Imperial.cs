using Microsoft.EntityFrameworkCore.Migrations;

namespace BDOLife.Web.Migrations
{
    public partial class Imperial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Imperiais",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(nullable: true),
                    Habilidade = table.Column<int>(nullable: false),
                    NivelHabilidade = table.Column<int>(nullable: false),
                    Valor = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Imperiais", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ImperiaisReceitas",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImperialId = table.Column<int>(nullable: false),
                    Quantidade = table.Column<int>(nullable: false),
                    ItemReferenciaId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ImperiaisReceitas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ImperiaisReceitas_Imperiais_ImperialId",
                        column: x => x.ImperialId,
                        principalTable: "Imperiais",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ImperiaisReceitas_Itens_ItemReferenciaId",
                        column: x => x.ItemReferenciaId,
                        principalTable: "Itens",
                        principalColumn: "ReferenciaId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ImperiaisReceitas_ImperialId",
                table: "ImperiaisReceitas",
                column: "ImperialId");

            migrationBuilder.CreateIndex(
                name: "IX_ImperiaisReceitas_ItemReferenciaId",
                table: "ImperiaisReceitas",
                column: "ItemReferenciaId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ImperiaisReceitas");

            migrationBuilder.DropTable(
                name: "Imperiais");
        }
    }
}
