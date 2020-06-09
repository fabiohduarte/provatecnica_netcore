using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;

namespace ProvaTecnica.Domain
{
    public class EntitiesContext : DbContext
    {
        public readonly string ConnectionString;

        public EntitiesContext(string connectionString)
        {
            ConnectionString = connectionString;
        }

        public EntitiesContext(DbContextOptions<EntitiesContext> optionsBuilder) : base() { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connection = ConnectionString;
            optionsBuilder.UseSqlServer
                        (
                            connection,
                            x => x.MigrationsHistoryTable
                                (
                                    HistoryRepository.DefaultTableName,
                                    "dbo"
                                ).CommandTimeout(60 * 2) //seconds
                         );            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("dbo");
            modelBuilder.HasDbFunction(() => DbFunctions.JsonValue(default(string), default(string)))
                .HasTranslation(args => SqlFunctionExpression.Create("JSON_VALUE", args, typeof(string), null));
        }

        
        public virtual DbSet<Usuario> Usuario { get; set; }

        public virtual DbSet<Perfil> Perfil { get; set; }

        public virtual DbSet<Funcionalidade> Funcionalidade { get; set; }
    }
}
