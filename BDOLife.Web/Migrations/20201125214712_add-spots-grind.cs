using Microsoft.EntityFrameworkCore.Migrations;

namespace BDOLife.Web.Migrations
{
    public partial class addspotsgrind : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Spots",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BdoId = table.Column<int>(nullable: false),
                    Nome = table.Column<string>(nullable: true),
                    Nivel = table.Column<string>(nullable: true),
                    PARecomendando = table.Column<string>(nullable: true),
                    Regiao = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Spots", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SpotsDrops",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SpotId = table.Column<int>(nullable: false),
                    ItemReferenciaId = table.Column<string>(nullable: true),
                    ChanceDropAprimorado = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SpotsDrops", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SpotsDrops_Itens_ItemReferenciaId",
                        column: x => x.ItemReferenciaId,
                        principalTable: "Itens",
                        principalColumn: "ReferenciaId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SpotsDrops_Spots_SpotId",
                        column: x => x.SpotId,
                        principalTable: "Spots",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SpotsDrops_ItemReferenciaId",
                table: "SpotsDrops",
                column: "ItemReferenciaId",
                unique: true,
                filter: "[ItemReferenciaId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_SpotsDrops_SpotId",
                table: "SpotsDrops",
                column: "SpotId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SpotsDrops");

            migrationBuilder.DropTable(
                name: "Spots");
        }
    }
}
