using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MembriiController: ControllerBase
    {
        private readonly StoreContext context;

        public MembriiController(StoreContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Membru>>> GetMembrii()
        {
            return await context.Membrii.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Membru>> GetMembru(int id)
        {
            var membru = await context.Membrii.FindAsync(id);

            if(membru == null)
            {
                return NotFound();
            }

            return membru;
        }

        // POST: api/Membrii
        [HttpPost]
        public async Task<ActionResult<Membru>> PostMembru(Membru membru)
        {
            context.Membrii.Add(membru);
            await context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMembru), new { id = membru.MembruId }, membru);
        }

        //PUT: api/Membrii/3
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMembru(int id, Membru updatedMembru)
        {
            if(id != updatedMembru.MembruId)
            {
                return BadRequest();
            }

            context.Entry(updatedMembru).State = EntityState.Modified;

            try
            {
                await context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) 
            {
                if (!context.Membrii.Any(m => m.MembruId == id))
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMembru(int id)
        {
            var membru = await context.Membrii.FindAsync(id);

            if(membru == null)
            {
                return NotFound();
            }

            context.Membrii.Remove(membru);
            await context.SaveChangesAsync();

            return NoContent();
        }
    }
}