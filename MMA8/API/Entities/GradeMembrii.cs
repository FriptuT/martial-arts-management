using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace API.Entities
{
    public class GradeMembrii
    {
        [Key]
        public int Id { get; set; }

        public int MembruId { get; set; } //required FK  - Membru

        public int IdGrad { get; set; }   // required FK - Grade

        public DateTime DataObtinerii { get; set; }

        // Navigation properties
        [JsonIgnore]
        public Membru Membru { get; set; }

        [JsonIgnore]
        public Grade Grade { get; set; }
    }
}