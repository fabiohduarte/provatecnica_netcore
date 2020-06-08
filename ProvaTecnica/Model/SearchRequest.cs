namespace ProvaTecnica.Model
{
    public class SearchRequest
    {
        public string Env { get; set; }
        public string SessionId { get; set; }
        public string TransactionId { get; set; }
        public string TraceId { get; set; }
        public string RequestId { get; set; }
        public string AppNames { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public bool GroupTransactions { get; set; }
        public bool OnlyErrors { get; set; }
        public string Type { get; set; }
        public string ClientIp { get; set; }
    }
}
