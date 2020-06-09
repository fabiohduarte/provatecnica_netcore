using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProvaTecnica.Domain
{
    public class SearchResults
    {
        public Pagination Pagination { get; set; }
        public IEnumerable<object> Results { get; set; }
    }
}
