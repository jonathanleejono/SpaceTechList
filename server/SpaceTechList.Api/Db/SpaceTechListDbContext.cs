using Microsoft.EntityFrameworkCore;
using SpaceTechList.Api.Models;

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
                    entityEntry.Property("UpdatedDate").CurrentValue =  DateTimeOffset.UtcNow;
                }
                else if (entityEntry.State == EntityState.Added)
                {
                    entityEntry.Property("CreatedDate").CurrentValue =  DateTimeOffset.UtcNow;
                    entityEntry.Property("UpdatedDate").CurrentValue =  DateTimeOffset.UtcNow;
                }

            }

            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>().HasData(new User
            {
                Id = 1,
                FirstName = "Bob",
                LastName = "Builder",
                Email = "bob@gmail.com",
                Password = "hello123"

            });

            modelBuilder.Entity<User>().HasData(new User
            {
                Id = 2,
                FirstName = "Jim",
                LastName = "John",
                Email = "jim@gmail.com",
                Password = "hello123"

            });
        }

        public DbSet<User> Users { get; set; }
    }
}

