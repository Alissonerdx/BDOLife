using BDOLife.Core.Entities;
using BDOLife.Core.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace BDOLife.Infra.Data
{
    public class BDOLifeContext : IdentityDbContext<IdentityUser>
    {
        public BDOLifeContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Item> Itens { get; set; }
        public DbSet<ReceitaItem> ReceitasItens { get; set; }
        public DbSet<HistoricoPreco> HistoricosPrecos { get; set; }
        public DbSet<Maestria> Maestrias { get; set; }
        public DbSet<ReceitaResultado> ReceitasResultados { get; set; }
        public DbSet<Configuracao> Configuracao { get; set; }
        public DbSet<Agrupamento> Agrupamentos { get; set; }
        public DbSet<AgrupamentoItem> AgrupamentosItens { get; set; }
        public DbSet<RankingCulinaria> RankingsCulinaria { get; set; }
        public DbSet<Imperial> Imperiais { get; set; }
        public DbSet<ImperialReceita> ImperiaisReceitas { get; set; }
        public DbSet<TipoProcesso> TiposProcessos { get; set; }
        public DbSet<TipoProcessoExperiencia> TiposProcessosExperiencia { get; set; }
        public DbSet<PedraAlquimia> PedrasAlquimia { get; set; }
        public DbSet<NivelProfissao> NiveisProfissoes { get; set; }
        public DbSet<MaestriaCulinaria> MaestriasCulinaria { get; set; }
        public DbSet<MaestriaAlquimia> MaestriasAlquimia { get; set; }
        public DbSet<Colheita> Colheitas { get; set; }
        public DbSet<Node> Nodes { get; set; }
        public DbSet<Spot> Spots { get; set; }
        public DbSet<SpotDrop> SpotsDrops { get; set; }
        public DbSet<MaestriaProcesso> MaestriasProcesso { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Item>(ConfigureItem);
            builder.Entity<Maestria>(ConfigureMaestria);
            builder.Entity<ReceitaItem>(ConfigureReceitaItem);
            builder.Entity<ReceitaResultado>(ConfigureReceitaResultado);
            builder.Entity<HistoricoPreco>(ConfigureHistoricoPreco);
            builder.Entity<Agrupamento>(ConfigureAgrupamento);
            builder.Entity<AgrupamentoItem>(ConfigureAgrupamentoItem);
            builder.Entity<RankingCulinaria>(ConfigureRankingCulinaria);
            builder.Entity<Imperial>(ConfigureImperial);
            builder.Entity<ImperialReceita>(ConfigureImperialReceita);
            builder.Entity<Colheita>(ConfigureColheita);
            builder.Entity<SpotDrop>(ConfigureSpotsDrops);
        }

        private static void ConfigureItem(EntityTypeBuilder<Item> builder)
        {

            builder.HasMany(m => m.Itens)
                      .WithOne(t => t.Receita)
                      .HasPrincipalKey(t => t.ReferenciaId)
                      .HasForeignKey(m => m.ReceitaReferenciaId)
                      .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(m => m.Receitas)
                      .WithOne(t => t.Item)
                      .HasPrincipalKey(t => t.ReferenciaId)
                      .HasForeignKey(m => m.ItemReferenciaId)
                      .OnDelete(DeleteBehavior.Restrict);

            builder.HasMany(m => m.Resultados)
                    .WithOne(t => t.Receita)
                    .HasPrincipalKey(t => t.ReferenciaId)
                    .HasForeignKey(m => m.ReceitaReferenciaId)
                    .OnDelete(DeleteBehavior.Restrict);

            builder.HasIndex(m => m.ReferenciaId);

            builder.Property(e => e.Excluido).HasDefaultValue(false);

            builder.Property(e => e.Adquirido).HasDefaultValue(AdquiridoEnum.Mercado);

        }
        private static void ConfigureMaestria(EntityTypeBuilder<Maestria> builder)
        {
            builder.Property(e => e.Tipo).IsRequired();
            builder.Property(e => e.Valor).IsRequired();
            builder.Property(e => e.ProcEspecial).IsRequired(false);
            builder.Property(e => e.ProcNormal).IsRequired(false);
            builder.Property(e => e.ProcRaro).IsRequired(false);
            builder.Property(e => e.ImperialBonus).IsRequired(false);
            builder.Property(e => e.ProducaoBonus).IsRequired(false);
            builder.Property(e => e.ProcessadoPorVez).IsRequired(false);
            builder.Property(e => e.AumentoNumItensBasico).IsRequired(false);
            builder.Property(e => e.AumentoNumItensEspecial).IsRequired(false);
            builder.Property(e => e.AumentoNumItensRaro).IsRequired(false);
            builder.Property(e => e.AumentoChanceEspecial).IsRequired(false);
            builder.Property(e => e.AumentoChanceRaro).IsRequired(false);
        }

        private static void ConfigureReceitaResultado(EntityTypeBuilder<ReceitaResultado> builder)
        {
            builder.HasOne(m => m.Resultado)
                     .WithMany(t => t.ResultadosEm)
                     .HasPrincipalKey(t => t.ReferenciaId)
                     .HasForeignKey(t => t.ResultadoReferenciaId)
                     .OnDelete(DeleteBehavior.Restrict);

            builder.Property(e => e.Excluido).HasDefaultValue(false);
        }
        private static void ConfigureReceitaItem(EntityTypeBuilder<ReceitaItem> builder)
        {
            builder.Property(e => e.Quantidade).IsRequired();
            builder.Property(e => e.ItemReferenciaId).IsRequired();
            builder.Property(e => e.ReceitaReferenciaId).IsRequired();
            builder.Property(e => e.Agrupamento).HasMaxLength(50).IsRequired(false);
            builder.Property(e => e.Visivel).IsRequired().HasDefaultValue(true);
            builder.Property(e => e.Excluido).HasDefaultValue(false);
        }
        private static void ConfigureHistoricoPreco(EntityTypeBuilder<HistoricoPreco> builder)
        {
            builder.HasOne(m => m.Item)
                     .WithMany(t => t.HistoricoPrecos)
                     .HasPrincipalKey(t => t.ReferenciaId)
                     .HasForeignKey(t => t.ItemReferenciaId)
                     .OnDelete(DeleteBehavior.Restrict);
        }
        private static void ConfigureAgrupamento(EntityTypeBuilder<Agrupamento> builder)
        {
            builder.HasMany(m => m.Itens)
                     .WithOne(t => t.Agrupamento)
                     .HasPrincipalKey(t => t.Id)
                     .HasForeignKey(t => t.AgrupamentoId)
                     .OnDelete(DeleteBehavior.Restrict);
        }
        private static void ConfigureAgrupamentoItem(EntityTypeBuilder<AgrupamentoItem> builder)
        {
            builder.HasOne(m => m.Item)
                      .WithMany(t => t.AgrupadoEm)
                      .HasPrincipalKey(t => t.ReferenciaId)
                      .HasForeignKey(t => t.ItemReferenciaId)
                      .OnDelete(DeleteBehavior.Restrict);
        }
        private static void ConfigureRankingCulinaria(EntityTypeBuilder<RankingCulinaria> builder)
        {
            builder.HasOne(r => r.Receita)
                 .WithMany(r => r.RankingsCulinaria)
                 .HasPrincipalKey(r => r.ReferenciaId)
                 .HasForeignKey(r => r.ReceitaReferenciaId)
                 .OnDelete(DeleteBehavior.Restrict);
        }

        private static void ConfigureImperial(EntityTypeBuilder<Imperial> builder)
        {
            //builder.HasMany(m => m.Receitas)
            //          .WithOne(t => t.Imperial)
            //          .HasPrincipalKey(t => t.Id)
            //          .HasForeignKey(m => m.ImperialId)
            //          .OnDelete(DeleteBehavior.Restrict);
        }

        private static void ConfigureImperialReceita(EntityTypeBuilder<ImperialReceita> builder)
        {
            builder.Property(e => e.ItemReferenciaId).IsRequired();

            builder.HasOne(m => m.Item)
                      .WithMany(t => t.ImperiaisReceitas)
                      .HasPrincipalKey(t => t.ReferenciaId)
                      .HasForeignKey(m => m.ItemReferenciaId)
                      .OnDelete(DeleteBehavior.Restrict);
        }

        private static void ConfigureColheita(EntityTypeBuilder<Colheita> builder)
        {
            builder.Property(e => e.PlantaReferenciaId).IsRequired();
            builder.Property(e => e.FrutaReferenciaId).IsRequired();
            builder.Property(e => e.Baixa).IsRequired();
            builder.Property(e => e.Perfeita).IsRequired();
            builder.Property(e => e.Alta);

            builder.HasOne(m => m.Fruta)
                   .WithOne()
                   .HasPrincipalKey<Item>(i => i.ReferenciaId)
                   .HasForeignKey<Colheita>(c => c.FrutaReferenciaId)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(m => m.Planta)
                    .WithOne()
                    .HasPrincipalKey<Item>(i => i.ReferenciaId)
                    .HasForeignKey<Colheita>(c => c.PlantaReferenciaId)
                    .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(m => m.PlantaEspecial)
                  .WithOne()
                  .HasPrincipalKey<Item>(i => i.ReferenciaId)
                  .HasForeignKey<Colheita>(c => c.PlantaEspecialReferenciaId)
                  .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(m => m.PlantaAltaQualidade)
                  .WithOne()
                  .HasPrincipalKey<Item>(i => i.ReferenciaId)
                  .HasForeignKey<Colheita>(c => c.PlantaAltaQualidadeReferenciaId)
                  .OnDelete(DeleteBehavior.Restrict);

            var index1 = builder.HasIndex(u => u.FrutaReferenciaId).Metadata;
            builder.Metadata.RemoveIndex(index1.Properties);

            //var index2 = builder.HasIndex(u => u.Planta).Metadata;
            //builder.Metadata.RemoveIndex(index2.Properties);

            var index3 = builder.HasIndex(u => u.PlantaEspecialReferenciaId).Metadata;
            builder.Metadata.RemoveIndex(index3.Properties);

            var index4 = builder.HasIndex(u => u.PlantaAltaQualidadeReferenciaId).Metadata;
            builder.Metadata.RemoveIndex(index4.Properties);
        }

        private static void ConfigureSpotsDrops(EntityTypeBuilder<SpotDrop> builder)
        {
            builder.HasOne(m => m.Item)
                   .WithOne()
                   .HasPrincipalKey<Item>(i => i.ReferenciaId)
                   .HasForeignKey<SpotDrop>(c => c.ItemReferenciaId)
                   .OnDelete(DeleteBehavior.Restrict);

            var index1 = builder.HasIndex(u => u.ItemReferenciaId).Metadata;
            builder.Metadata.RemoveIndex(index1.Properties);

            var index2 = builder.HasIndex(u => u.SpotId).Metadata;
            builder.Metadata.RemoveIndex(index2.Properties);
        }

    }

}
