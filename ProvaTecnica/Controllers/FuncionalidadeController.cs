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
    public class FuncionalidadeController : ControllerBase
    {
        private readonly IEntitiesRepository _entitiesRepository;
     
        public FuncionalidadeController(IEntitiesRepository entitiesRepository)
        {
            _entitiesRepository = entitiesRepository; 
        }
    
        [HttpGet("list")]
        public async Task<ObjectResult> List([FromQuery] CriterioBusca req)
        {
            SearchResults result = new SearchResults();
       
            result = await _entitiesRepository.GetFuncionalidades(req);
                         
            return Ok(result);
        }

        [HttpGet("get")]
        public async Task<ObjectResult> Get(int id)
        {           
            Funcionalidade obj =  await _entitiesRepository.GetFuncionalidadeById(id);
            return Ok(obj);
        }

        [HttpPost("put")]
        public async Task<ObjectResult> Put(Funcionalidade funcionalidade)
        {
            var resp = await _entitiesRepository.PutFuncionalidade(funcionalidade);
            return Ok(resp);
        }

        [HttpPost("delete")]
        public async Task<ObjectResult> Delete(int id)
        {
            await _entitiesRepository.DeleteFuncionalidade(id);
            return Ok("");
        }
    }
}
