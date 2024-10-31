using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using api_protasker.Models;

namespace api_protasker.Data
{
    public class api_protaskerContext : DbContext
    {
        public api_protaskerContext (DbContextOptions<api_protaskerContext> options)
            : base(options)
        {
        }

        public DbSet<api_protasker.Models.Utilisateur> Utilisateur { get; set; } = default!;
        public DbSet<api_protasker.Models.Tache> Tache { get; set; } = default!;
    }
}
