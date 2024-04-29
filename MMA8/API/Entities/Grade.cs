using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

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