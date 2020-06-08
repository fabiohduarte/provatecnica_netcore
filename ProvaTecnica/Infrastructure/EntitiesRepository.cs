using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using ProvaTecnica.Domain;
using Newtonsoft.Json.Linq;
using ProvaTecnica.Model;
using TimeZoneConverter;
using Microsoft.EntityFrameworkCore.Internal;
using ProvaTecnica.Infrastructure;

namespace ProvaTecnica.Infrastructure
{
    public class EntitiesRepository : IEntitiesRepository
    {
        private EntitiesContext _context;
        private readonly IEntitiesContextGetterService _entitiesContextGetterService;

        public EntitiesRepository(IEntitiesContextGetterService entitiesContextGetterService)
        {
            _entitiesContextGetterService = entitiesContextGetterService;
        }

        private EntitiesContext getContext()
        {
            if (_context == null)
                _context = _entitiesContextGetterService.Get();
            return _context;
        }

        public async Task<SearchResults> GetUsuarios(CriterioBusca criterio)
        {
            SearchResults result = new SearchResults();

            try
            {
                result.Results = getContext().Usuario.Where(p => (String.IsNullOrEmpty(criterio.Nome) || p.Nome.Contains(criterio.Nome)) &&
                                                                 (String.IsNullOrEmpty(criterio.Login) || p.Login.Contains(criterio.Login)) &&
                                                                 (String.IsNullOrEmpty(criterio.Email) || p.Email.Contains(criterio.Email))).ToList();
            }
            catch (Exception ex)
            {

            }

            return result;
        }

        public async Task<Usuario> GetUsuarioById(int id)
        {
          
             return  getContext().Usuario.FirstOrDefault<Usuario>(u => u.IdUsuario == id);
           
           /// return result;
        }

        public async Task<int> PutUsuario(Usuario obj)
        {
            try
            {
                var context = getContext();

                if (obj.IdUsuario == 0)
                    context.Usuario.Add(obj);
                else
                {
                    var usu = context.Usuario.FirstOrDefault(u => u.IdUsuario == obj.IdUsuario);
                    usu.Nome = obj.Nome;
                    usu.Login = obj.Login;
                    usu.Email = obj.Email;

                }

               return context.SaveChanges();
            }
            catch(Exception ex)
            {
                throw ex;
            }
          
        }
    }
}
