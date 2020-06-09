using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;

namespace ProvaTecnica.Domain
{
    public class Usuario
    {
        [Key]
        public int IdUsuario { get; set; }
        public string Nome { get; set; }
        public string Login { get; set; }
        public string Email { get; set; }     
        public int IdPerfil { get; set; }
    }

    public static class DbFunctions
    {
        [DbFunction("JSON_VALUE", "")]
        public static string JsonValue(string source, string path) => throw new NotSupportedException();
    }
}
