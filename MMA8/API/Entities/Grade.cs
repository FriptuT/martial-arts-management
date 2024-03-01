using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Grade
    {
        [Key]
        public int IdGrad { get; set; }
        public string NumeGrad {get; set;}
        [JsonIgnore]
        public ICollection<GradeMembrii> GradeMembrii { get; set; }

    }
}