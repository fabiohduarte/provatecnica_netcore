using ProvaTecnica.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProvaTecnica.Infrastructure
{
    public class EntitiesContextGetterService : IEntitiesContextGetterService
    {
        private readonly string _connectionString;      

        public EntitiesContextGetterService(string connectionString)
        {
            _connectionString = connectionString;        
        }

        public EntitiesContext Get() => new EntitiesContext(_connectionString);

    }
}
