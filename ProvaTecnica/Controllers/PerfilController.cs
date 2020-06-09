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
    public class PerfilController : ControllerBase
    {
        private readonly IEntitiesRepository _entitiesRepository;
     
        public PerfilController(IEntitiesRepository entitiesRepository)
        {
            _entitiesRepository = entitiesRepository; 
        }
    
        [HttpGet("list")]
        public async Task<ObjectResult> List([FromQuery] CriterioBusca req)
        {
            SearchResults result = new SearchResults();         
            result = await _entitiesRepository.GetPerfis(req);
            return Ok(result);
        }

        [HttpGet("get")]
        public async Task<ObjectResult> Get(int id)
        {           
            Perfil perf =  await _entitiesRepository.GetPerfilById(id);
            return Ok(perf);
        }

        [HttpPost("put")]
        public async Task<ObjectResult> Put(Perfil perfil)
        {
            var resp = await _entitiesRepository.PutPerfil(perfil);
            return Ok(resp);
        }
    }
}
