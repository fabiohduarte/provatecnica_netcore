namespace ProvaTecnica.Model
{
    public class CriterioBusca
    {
        public string Nome { get; set; }
        public string Login { get; set; }
        public string Email { get; set; }
        public int IdPerfil { get; set; }
        public int PageIndex { get; set; }
        public int PageSize { get; set; }      
    }
}
