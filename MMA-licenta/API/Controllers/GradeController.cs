
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GradeController : ControllerBase
    {
        private readonly StoreContext context;

        public GradeController(StoreContext context)
        {
            this.context = context;
        }

        // GET: api/Grade
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Grade>>> GetGrades()
        {
            return await context.Grade.ToListAsync();
        }

        // GET: api/Grade/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Grade>> GetGrade(int id)
        {
            var grade = await context.Grade.FindAsync(id);

            if (grade == null)
            {
                return NotFound();
            }

            return grade;
        }

        // POST: api/Grade
        [HttpPost]
        public async Task<ActionResult<Grade>> PostGrade(Grade grade)
        {
            context.Grade.Add(grade);
            await context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetGrade), new { id = grade.IdGrad }, grade);
        }


        // PUT: api/Grade/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGrade(int id, Grade grade)
        {
            if (id != grade.IdGrad)
            {
                return BadRequest();
            }

            context.Entry(grade).State = EntityState.Modified;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GradeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Grade/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGrade(int id)
        {
            var grade = await context.Grade.FindAsync(id);
            if (grade == null)
            {
                return NotFound();
            }

            context.Grade.Remove(grade);
            await context.SaveChangesAsync();

            return NoContent();
        }


        private bool GradeExists(int id)
        {
            return context.Grade.Any(e => e.IdGrad == id);
        }
    }
}