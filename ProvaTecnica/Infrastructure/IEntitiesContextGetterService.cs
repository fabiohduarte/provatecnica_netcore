using ProvaTecnica.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProvaTecnica.Infrastructure
{
    public interface IEntitiesContextGetterService
    {
        EntitiesContext Get();
    }
}
