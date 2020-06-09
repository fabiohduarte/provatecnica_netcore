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
        Task<SearchResults> GetUsuarios(CriterioBusca request);

        Task<Usuario> GetUsuarioById(int id);

        Task<int> PutUsuario(Usuario usuario);

        Task DeleteUsuario(int id);

        Task<SearchResults> GetPerfis(CriterioBusca request);

    }
}
