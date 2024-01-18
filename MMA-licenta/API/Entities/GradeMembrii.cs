using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class GradeMembrii
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Membru")]
        public int MembruId { get; set; }

        public DateTime DataObtinerii { get; set; }

        [ForeignKey("Grade")]
        public int IdGrad { get; set; }

        // Navigation properties
        public Membru Membru { get; set; }
        public Grade Grade { get; set; }
    }
}