using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Membru
    {
        [Key]
        public int MembruId { get; set; }

        public string Email { get; set; }

        public string Parola { get; set; }

        public string Nume { get; set; }

        public DateTime DataNasterii { get; set; }

        public string Gen { get; set; }

        public string TipMembru { get; set; }

        public int NrLegitimatie { get; set; }

        public bool Activ { get; set; }

        public string Poza { get; set; }

        public int Varsta { get; set; }

        // nav prop for one-to-many
        [JsonIgnore]
        public ICollection<GradeMembrii> GradeMembrii {get; set;}

    }
}