using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GradeMembriiController: ControllerBase
    {
        private readonly StoreContext context;

        public GradeMembriiController(StoreContext context)
        {
            this.context = context;
        }

        // GET: api/GradeMembrii
        [HttpGet]
        public async Task<ActionResult<IEnumerable<GradeMembrii>>> GetGradeMembrii()
        {
            return await context.GradeMembrii.ToListAsync();
        }

        // GET: api/GradeMembrii/3
        [HttpGet("{id}")]
        public async Task<ActionResult<GradeMembrii>> GetGradMembrii(int id)
        {
            var grade = await context.GradeMembrii.FindAsync(id);

            if (grade == null)
            {
                return NotFound();
            }

            return grade;
        }

        [HttpGet("table/{membruId}")]
        public async Task<ActionResult<GradeMembrii>> GetTableData(int membruId)
        {
            var grades = await (from gm in context.GradeMembrii 
                               join g in context.Grade on gm.IdGrad equals g.IdGrad
                               where gm.MembruId == membruId
                                select new GradeDto
                                {
                                    NumeGrad = g.NumeGrad,
                                    DataObtinerii = gm.DataObtinerii
                                }).ToListAsync();

            return Ok(grades);
        }

        // POST: api/GradeMembrii
        [HttpPost]
        public async Task<ActionResult<GradeMembrii>> PostGradeMembrii(GradeMembrii gradeM)
        {
            context.GradeMembrii.Add(gradeM);
            await context.SaveChangesAsync();

            var result = await (from gm in context.GradeMembrii
                            join g in context.Grade on gm.IdGrad equals g.IdGrad
                            where gm.Id == gradeM.Id
                            select new
                            {  
                                g.NumeGrad,
                                gm.DataObtinerii
                            }).FirstOrDefaultAsync();
            
            if (result == null)
            {
                return NotFound();
            }

            return CreatedAtAction(nameof(GetGradMembrii), new { id = gradeM.Id }, result);
        }

        // PUT: api/GradeMembrii/3
        [HttpPut("{id}")]
        public async Task<IActionResult> PutGradeMembrii(int id, GradeMembrii gradeM)
        {
            if (id != gradeM.Id)
            {
                return BadRequest();
            }

            context.Entry(gradeM).State = EntityState.Modified;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GradeMExists(id))
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

        // DELETE: api/GradeMembrii/3
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteGradeM(int id)
        {
            var grade = await context.GradeMembrii.FindAsync(id);

            if (grade == null)
            {
                return NotFound();
            }

            context.GradeMembrii.Remove(grade);
            await context.SaveChangesAsync();

            return NoContent();
        }

        private bool GradeMExists(int id)
        {
            return context.GradeMembrii.Any(e => e.Id == id);
        }
    }
}