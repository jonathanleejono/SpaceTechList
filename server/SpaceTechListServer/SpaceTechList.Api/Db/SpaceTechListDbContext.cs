using System.Reflection.Metadata;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using SpaceTechList.Api.Models;
using SpaceTechList.Api.Utils;

namespace SpaceTechList.Api.Db
{
    public class SpaceTechListDbContext : DbContext
    {
        public SpaceTechListDbContext(DbContextOptions<SpaceTechListDbContext> options) : base(options)
        {

        }

        public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = default(CancellationToken))
        {

            var entries = ChangeTracker.Entries().Where(E => E.State == EntityState.Added || E.State == EntityState.Modified).ToList();

            foreach (var entityEntry in entries)
            {
                if (entityEntry.State == EntityState.Modified)
                {
                    entityEntry.Property("UpdatedDate").CurrentValue = DateTimeOffset.UtcNow;
                }
                else if (entityEntry.State == EntityState.Added)
                {
                    entityEntry.Property("CreatedDate").CurrentValue = DateTimeOffset.UtcNow;

                    entityEntry.Property("UpdatedDate").CurrentValue = DateTimeOffset.UtcNow;
                }

            }

            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>().HasIndex(user => user.Email).IsUnique();

            modelBuilder.Entity<SpaceTech>().HasIndex(spaceTech => spaceTech.IdCode).IsUnique();

            modelBuilder.Entity<User>().HasData(new User
            {
                Id = 1,
                FirstName = "Bob",
                LastName = "Builder",
                Email = "bob@gmail.com",
                Password = PasswordUtil.HashPassword("password123")

            });

            modelBuilder.Entity<User>().HasData(new User
            {
                Id = 2,
                FirstName = "Jim",
                LastName = "John",
                Email = "jim@gmail.com",
                Password = PasswordUtil.HashPassword("password123")

            });

            modelBuilder.Entity<SpaceTech>().HasData(new SpaceTech
            {
                Id = 1,
                IdCode = "59fa10809600022a4d1c7751",
                Title = "Turbofan Engine Acoustic Liner Design and Analysis Tools",
                Description = "NASA Langley Research Center has developed two tools for " +
                "turbofan engine acoustic liner design and analysis. The first is a statistical " +
                "approach for broadband liner design and assessment. The second is graphical " +
                "software to design and analyze resonant channels in acoustic liners.",
                Topic = "aerospace",
                MediaUrl = "https://technology.nasa.gov/t2media/tops/img/LAR-TOPS-185/Front.jpg",
                UserId = 1
            });

        }

        public DbSet<User> Users { get; set; }

        public DbSet<SpaceTech> SpaceTech { get; set; }
    }
}

