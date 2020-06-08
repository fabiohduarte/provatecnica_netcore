using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;

namespace ProvaTecnica.Domain
{
    public class Perfil
    {
        [Key]
        public int IdPerfil { get; set; }
        public string DescPerfil { get; set; }    
    }

    //public static class DbFunctions
    //{
    //    [DbFunction("JSON_VALUE", "")]
    //    public static string JsonValue(string source, string path) => throw new NotSupportedException();
    //}
}
