using ProvaTecnica.Domain;
using ProvaTecnica.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace ProvaTecnica.Infrastructure
{
    public interface IEntitiesRepository
    {
        Task<SearchResults> GetUsuarios(SearchRequest request);

        Task<Usuario> GetUsuarioById(int id);

        Task<int> PutUsuario(Usuario usuario);

    }
}
