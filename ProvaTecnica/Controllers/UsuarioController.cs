using ProvaTecnica.Domain;
using ProvaTecnica.Infrastructure;
using ProvaTecnica.Model;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace ProvaTecnica.Controllers
{
    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly IEntitiesRepository _entitiesRepository;
     
        public UsuarioController(IEntitiesRepository entitiesRepository)
        {
            _entitiesRepository = entitiesRepository; 
        }
    
        [HttpGet("list")]
        public async Task<ObjectResult> List([FromQuery] CriterioBusca req)
        {
            SearchResults result = new SearchResults();
       
            result = await _entitiesRepository.GetUsuarios(req);
                         
            return Ok(result);
        }

        [HttpGet("get")]
        public async Task<ObjectResult> Get(int id)
        {           
            Usuario usu =  await _entitiesRepository.GetUsuarioById(id);
            return Ok(usu);
        }

        [HttpPost("put")]
        public async Task<ObjectResult> Put(Usuario usuario)
        {
            var resp = await _entitiesRepository.PutUsuario(usuario);
            return Ok(resp);
        }

        [HttpPost("delete")]
        public async Task<ObjectResult> Delete(int id)
        {
            await _entitiesRepository.DeleteUsuario(id);
            return Ok("");
        }
    }
}
