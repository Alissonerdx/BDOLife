using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BDOLife.Web.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Agrupamentos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(nullable: true),
                    Ativo = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Agrupamentos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    UserName = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(maxLength: 256, nullable: true),
                    Email = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(nullable: false),
                    PasswordHash = table.Column<string>(nullable: true),
                    SecurityStamp = table.Column<string>(nullable: true),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(nullable: false),
                    TwoFactorEnabled = table.Column<bool>(nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(nullable: true),
                    LockoutEnabled = table.Column<bool>(nullable: false),
                    AccessFailedCount = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Configuracao",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AtualizarMarketAutomaticamente = table.Column<bool>(nullable: false),
                    UltimaAtualizacaoMarket = table.Column<DateTime>(nullable: false),
                    Manutencao = table.Column<bool>(nullable: false),
                    Versao = table.Column<string>(nullable: true),
                    Atualizando = table.Column<bool>(nullable: false),
                    ProximaAtualizacaoEm = table.Column<DateTime>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Configuracao", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Maestrias",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Valor = table.Column<int>(nullable: false),
                    ProcNormal = table.Column<decimal>(nullable: true),
                    ProcEspecial = table.Column<decimal>(nullable: true),
                    ProcRaro = table.Column<decimal>(nullable: true),
                    ImperialBonus = table.Column<decimal>(nullable: true),
                    ProducaoBonus = table.Column<decimal>(nullable: true),
                    ProcessadoPorVez = table.Column<int>(nullable: true),
                    AumentoNumItensBasico = table.Column<int>(nullable: true),
                    AumentoNumItensEspecial = table.Column<int>(nullable: true),
                    AumentoNumItensRaro = table.Column<int>(nullable: true),
                    AumentoChanceEspecial = table.Column<int>(nullable: true),
                    AumentoChanceRaro = table.Column<int>(nullable: true),
                    Tipo = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Maestrias", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Itens",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReferenciaId = table.Column<string>(nullable: false),
                    BdoId = table.Column<int>(nullable: false),
                    AgrupamentoId = table.Column<int>(nullable: true),
                    Experiencia = table.Column<int>(nullable: false),
                    Nome = table.Column<string>(nullable: true),
                    Valor = table.Column<long>(nullable: false),
                    Peso = table.Column<decimal>(nullable: false),
                    ImagemUrl = table.Column<string>(nullable: true),
                    QuantidadeDisponivel = table.Column<long>(nullable: false),
                    Grau = table.Column<int>(nullable: false),
                    DataAtualizacao = table.Column<DateTime>(nullable: false),
                    Tipo = table.Column<int>(nullable: false),
                    Categoria = table.Column<string>(nullable: true),
                    TipoReceita = table.Column<int>(nullable: true),
                    Excluido = table.Column<bool>(nullable: false, defaultValue: false),
                    ProcNormalExcessao = table.Column<decimal>(nullable: true),
                    ProcRaroExcessao = table.Column<decimal>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Itens", x => x.Id);
                    table.UniqueConstraint("AK_Itens_ReferenciaId", x => x.ReferenciaId);
                    table.ForeignKey(
                        name: "FK_Itens_Agrupamentos_AgrupamentoId",
                        column: x => x.AgrupamentoId,
                        principalTable: "Agrupamentos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(nullable: false),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(maxLength: 128, nullable: false),
                    ProviderKey = table.Column<string>(maxLength: 128, nullable: false),
                    ProviderDisplayName = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    RoleId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    LoginProvider = table.Column<string>(maxLength: 128, nullable: false),
                    Name = table.Column<string>(maxLength: 128, nullable: false),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AgrupamentosItens",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AgrupamentoId = table.Column<int>(nullable: false),
                    ItemReferenciaId = table.Column<string>(nullable: true),
                    Quantidade = table.Column<int>(nullable: false),
                    Principal = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AgrupamentosItens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AgrupamentosItens_Agrupamentos_AgrupamentoId",
                        column: x => x.AgrupamentoId,
                        principalTable: "Agrupamentos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_AgrupamentosItens_Itens_ItemReferenciaId",
                        column: x => x.ItemReferenciaId,
                        principalTable: "Itens",
                        principalColumn: "ReferenciaId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "HistoricosPrecos",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Data = table.Column<DateTime>(nullable: false),
                    ItemReferenciaId = table.Column<string>(nullable: true),
                    QuantidadeDisponivel = table.Column<long>(nullable: false),
                    Valor = table.Column<long>(nullable: false),
                    QuantidadeTotalVenda = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HistoricosPrecos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HistoricosPrecos_Itens_ItemReferenciaId",
                        column: x => x.ItemReferenciaId,
                        principalTable: "Itens",
                        principalColumn: "ReferenciaId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RankingsCulinaria",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Maestria = table.Column<int>(nullable: false),
                    ReceitaReferenciaId = table.Column<string>(nullable: true),
                    Custo = table.Column<long>(nullable: false),
                    LucroBruto = table.Column<long>(nullable: false),
                    LucroLiquido = table.Column<long>(nullable: false),
                    QuantidadeProcNormal = table.Column<long>(nullable: true),
                    QuantidadeProcRaro = table.Column<long>(nullable: true),
                    Data = table.Column<DateTime>(nullable: false),
                    CrescimentoProcura = table.Column<double>(nullable: false),
                    CrescimentoOferta = table.Column<double>(nullable: false),
                    CrescimentoPreco = table.Column<double>(nullable: false),
                    Resultado = table.Column<double>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RankingsCulinaria", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RankingsCulinaria_Itens_ReceitaReferenciaId",
                        column: x => x.ReceitaReferenciaId,
                        principalTable: "Itens",
                        principalColumn: "ReferenciaId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ReceitasItens",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReceitaReferenciaId = table.Column<string>(nullable: false),
                    ItemReferenciaId = table.Column<string>(nullable: false),
                    Quantidade = table.Column<long>(nullable: false),
                    Visivel = table.Column<bool>(nullable: false, defaultValue: true),
                    Agrupamento = table.Column<string>(maxLength: 50, nullable: true),
                    Excluido = table.Column<bool>(nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReceitasItens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ReceitasItens_Itens_ItemReferenciaId",
                        column: x => x.ItemReferenciaId,
                        principalTable: "Itens",
                        principalColumn: "ReferenciaId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ReceitasItens_Itens_ReceitaReferenciaId",
                        column: x => x.ReceitaReferenciaId,
                        principalTable: "Itens",
                        principalColumn: "ReferenciaId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ReceitasResultados",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReceitaReferenciaId = table.Column<string>(nullable: true),
                    ResultadoReferenciaId = table.Column<string>(nullable: true),
                    ProcRaro = table.Column<bool>(nullable: false),
                    Excluido = table.Column<bool>(nullable: false, defaultValue: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReceitasResultados", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ReceitasResultados_Itens_ReceitaReferenciaId",
                        column: x => x.ReceitaReferenciaId,
                        principalTable: "Itens",
                        principalColumn: "ReferenciaId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ReceitasResultados_Itens_ResultadoReferenciaId",
                        column: x => x.ResultadoReferenciaId,
                        principalTable: "Itens",
                        principalColumn: "ReferenciaId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AgrupamentosItens_AgrupamentoId",
                table: "AgrupamentosItens",
                column: "AgrupamentoId");

            migrationBuilder.CreateIndex(
                name: "IX_AgrupamentosItens_ItemReferenciaId",
                table: "AgrupamentosItens",
                column: "ItemReferenciaId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_HistoricosPrecos_ItemReferenciaId",
                table: "HistoricosPrecos",
                column: "ItemReferenciaId");

            migrationBuilder.CreateIndex(
                name: "IX_Itens_AgrupamentoId",
                table: "Itens",
                column: "AgrupamentoId");

            migrationBuilder.CreateIndex(
                name: "IX_Itens_ReferenciaId",
                table: "Itens",
                column: "ReferenciaId");

            migrationBuilder.CreateIndex(
                name: "IX_RankingsCulinaria_ReceitaReferenciaId",
                table: "RankingsCulinaria",
                column: "ReceitaReferenciaId");

            migrationBuilder.CreateIndex(
                name: "IX_ReceitasItens_ItemReferenciaId",
                table: "ReceitasItens",
                column: "ItemReferenciaId");

            migrationBuilder.CreateIndex(
                name: "IX_ReceitasItens_ReceitaReferenciaId",
                table: "ReceitasItens",
                column: "ReceitaReferenciaId");

            migrationBuilder.CreateIndex(
                name: "IX_ReceitasResultados_ReceitaReferenciaId",
                table: "ReceitasResultados",
                column: "ReceitaReferenciaId");

            migrationBuilder.CreateIndex(
                name: "IX_ReceitasResultados_ResultadoReferenciaId",
                table: "ReceitasResultados",
                column: "ResultadoReferenciaId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AgrupamentosItens");

            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "Configuracao");

            migrationBuilder.DropTable(
                name: "HistoricosPrecos");

            migrationBuilder.DropTable(
                name: "Maestrias");

            migrationBuilder.DropTable(
                name: "RankingsCulinaria");

            migrationBuilder.DropTable(
                name: "ReceitasItens");

            migrationBuilder.DropTable(
                name: "ReceitasResultados");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "Itens");

            migrationBuilder.DropTable(
                name: "Agrupamentos");
        }
    }
}
