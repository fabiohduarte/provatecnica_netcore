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

        #region Usuario
        public async Task<SearchResults> GetUsuarios(CriterioBusca criterio)
        {
            SearchResults result = new SearchResults();

            try
            {
                result.Results = (from u in getContext().Usuario
                                  join p in getContext().Perfil on u.IdPerfil equals p.IdPerfil
                                  select new
                                  {
                                      IdUsuario = u.IdUsuario,
                                      Nome = u.Nome,
                                      Login = u.Login,
                                      Email = u.Email,
                                      IdPerfil = u.IdPerfil,
                                      DescPerfil = p.DescPerfil
                                  })

                       .Where(p => (String.IsNullOrEmpty(criterio.Nome) || p.Nome.Contains(criterio.Nome)) &&
                                                               (String.IsNullOrEmpty(criterio.Login) || p.Login.Contains(criterio.Login)) &&
                                                               (String.IsNullOrEmpty(criterio.Email) || p.Email.Contains(criterio.Email)) &&
                                                               (criterio.IdPerfil == 0 || p.IdPerfil == criterio.IdPerfil)).ToList();
            }
            catch (Exception ex)
            {

            }

            return result;
        }

        public async Task<Usuario> GetUsuarioById(int id)
        {

            return getContext().Usuario.FirstOrDefault<Usuario>(u => u.IdUsuario == id);

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
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public async Task DeleteUsuario(int id)
        {
            try
            {
                var context = getContext();

                var usu = context.Usuario.FirstOrDefault(u => u.IdUsuario == id);
                context.Remove(usu);
                context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        #endregion

        #region Perfil
        public async Task<SearchResults> GetPerfis(CriterioBusca criterio)
        {
            SearchResults result = new SearchResults();

            try
            {
                result.Results = getContext().Perfil.Where(p => (String.IsNullOrEmpty(criterio.DescPerfil) || p.DescPerfil.Contains(criterio.DescPerfil))).ToList();
            }
            catch (Exception ex)
            {

            }

            return result;
        }

        public async Task<Perfil> GetPerfilById(int id)
        {
            return getContext().Perfil.FirstOrDefault<Perfil>(u => u.IdPerfil == id);
        }

        public async Task<int> PutPerfil(Perfil obj)
        {
            try
            {
                var context = getContext();

                if (obj.IdPerfil == 0)
                    context.Perfil.Add(obj);
                else
                {
                    var perf = context.Perfil.FirstOrDefault(u => u.IdPerfil == obj.IdPerfil);
                    perf.DescPerfil = obj.DescPerfil;
                }

                return context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task DeletePerfil(int id)
        {
            try
            {
                var context = getContext();

                var perf = context.Perfil.FirstOrDefault(u => u.IdPerfil == id);
                context.Remove(perf);
                context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion

        #region Funcionalidade
        public async Task<SearchResults> GetFuncionalidades(CriterioBusca criterio)
        {
            SearchResults result = new SearchResults();

            try
            {
                result.Results = getContext().Funcionalidade.Where(p => (String.IsNullOrEmpty(criterio.DescFuncionalidade) || p.DescFuncionalidade.Contains(criterio.DescFuncionalidade))).ToList();
            }
            catch (Exception ex)
            {

            }

            return result;
        }

        public async Task<Funcionalidade> GetFuncionalidadeById(int id)
        {
            return getContext().Funcionalidade.FirstOrDefault<Funcionalidade>(u => u.IdFuncionalidade == id);
        }

        public async Task<int> PutFuncionalidade(Funcionalidade obj)
        {
            try
            {
                var context = getContext();

                if (obj.IdFuncionalidade == 0)
                    context.Funcionalidade.Add(obj);
                else
                {
                    var usu = context.Funcionalidade.FirstOrDefault(u => u.IdFuncionalidade == obj.IdFuncionalidade);
                    usu.DescFuncionalidade = obj.DescFuncionalidade;
                }

                return context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task DeleteFuncionalidade(int id)
        {
            try
            {
                var context = getContext();

                var usu = context.Funcionalidade.FirstOrDefault(u => u.IdFuncionalidade == id);
                context.Remove(usu);
                context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion
    }
}

