using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;

namespace ProvaTecnica.Domain
{
    public class Funcionalidade
    {
        [Key]
        public int IdFuncionalidade { get; set; }
        public string DescFuncionalidade { get; set; }
    }
}
