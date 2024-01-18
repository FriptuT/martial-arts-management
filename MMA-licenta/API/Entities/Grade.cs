using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Grade
    {
        [Key]
        public int IdGrad { get; set; }

        [StringLength(50)]
        public string NumeGrad { get; set; }

    }
}