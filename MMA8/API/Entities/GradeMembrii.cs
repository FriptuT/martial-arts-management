using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API.Entities
{
    public class GradeMembrii
    {
        [Key]
        public int Id { get; set; }

        public int MembruId { get; set; } //required FK property - Membru

        public int IdGrad { get; set; }   // required FK property - Grade

        public DateTime DataObtinerii { get; set; }

        // Navigation properties
        [JsonIgnore]
        public Membru Membru { get; set; }

        [JsonIgnore]
        public Grade Grade { get; set; }
    }
}