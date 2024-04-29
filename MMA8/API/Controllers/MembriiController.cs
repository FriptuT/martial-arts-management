using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
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
        public async Task<ActionResult<PagedList<Membru>>> GetMembrii(MemberParams memberParams)
        {
            var query = context.Membrii
            .Sort(memberParams.OrderBy)
            .Search(memberParams.SearchTerm)
            .AsQueryable();

            var members = await PagedList<Membru>.ToPagedList(query, memberParams.PageNumber, memberParams.PageSize);

            Response.Headers.Append("Pagination", JsonSerializer.Serialize(members.MetaData));

            return members;

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
            var existingMember = await context.Membrii.FindAsync(id);

            if(existingMember == null){
                return NotFound();
            }

            existingMember.Email = updatedMembru.Email;
            existingMember.Parola = updatedMembru.Parola;
            existingMember.Nume = updatedMembru.Nume;
            existingMember.DataNasterii = updatedMembru.DataNasterii;
            existingMember.Gen = updatedMembru.Gen;
            existingMember.TipMembru = updatedMembru.TipMembru;
            existingMember.NrLegitimatie = updatedMembru.NrLegitimatie;
            existingMember.Activ = updatedMembru.Activ;

            await context.SaveChangesAsync();

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