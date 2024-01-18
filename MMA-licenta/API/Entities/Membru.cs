using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Membru
    {
        [Key]
        public int MembruId { get; set; }

        [Required]
        [StringLength(255)]
        public string Email { get; set; }

        [Required]
        [StringLength(255)]
        public string Parola { get; set; }

        [Required]
        [StringLength(255)]
        public string Nume { get; set; }

        [Column(TypeName = "Date")]
        public DateTime DataNasterii { get; set; }

        [StringLength(10)]
        public string Gen { get; set; }

        [StringLength(50)]
        public string TipMembru { get; set; }

        public int NrLegitimatie { get; set; }

        [StringLength(10)]
        public string ActivInactiv { get; set; }

    }
}