using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api_protasker.Data;
using api_protasker.Models;
using api_protasker.Services;
using api_protasker.DTOs;


namespace api_protasker.Controllers
{
    /*
     * Controller de gestions des tâches 
     */
    [Route("api/[controller]")]
    [ApiController]
    public class TachesController : ControllerBase
    {
        private readonly api_protaskerContext _context;
        private readonly ExcelService _excelService;

        public TachesController(api_protaskerContext context, ExcelService excelService)
        {
            _context = context;
            _excelService = excelService;
        }

        /*
         * Requete GET récupère les tâches selon la pagination
        */
        // GET: api/Taches
        [HttpGet]
        public async Task<ActionResult<object>> GetTache(int pageNumber = 1, int pageSize = 7)
        {
            var taches  = await _context.Tache
                .Include(t => t.Utilisateur)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            var max = await _context.Tache.CountAsync();

            if (taches == null)
            {
                return new List<TacheDto>();
            }

            var tachesDto = taches.Select(t => new TacheDto
            {
                Id = t.Id,
                Nom = t.Utilisateur?.Nom ?? "Inconnu",
                Prenom = t.Utilisateur?.Prenom ?? "Inconnu",
                Libelle = t.Libelle,
                Statut = (int)t.Statut 
            }).ToList();
            return Ok(new { max = max, data = tachesDto });
        }

        // GET: api/Taches/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tache>> GetTache(int id)
        {
            var tache = await _context.Tache.FindAsync(id);

            if (tache == null)
            {
                return NotFound();
            }

            return tache;
        }

        /*
        * Requete POST récupére l'exportation des tâches en excel
        */
        // POST : api/export-taches
        [HttpPost("export-taches")]
        public async Task<ActionResult> ExportTaches([FromBody] List<TacheDto> tachesDto)
        {
            try
            {
                
                var fileContent = await _excelService.ExportTachesToExcel(tachesDto);

                var base64File = Convert.ToBase64String(fileContent);

                //return File(fileContent, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Taches.xlsx");
                return Ok(new {FileContent = base64File, FileName = "Taches.xlsx" });
            }
            catch (Exception ex)
            {
                return BadRequest("Une erreur interne s'est produite lors de l'exportation");
            }
            
        }

        /*
        *    Requete PUT Modifier une tâche
        */
        // PUT: api/Taches/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTache(int id, TacheDto tacheDto)
        {
            if (id != tacheDto.Id)
            {
                return BadRequest("L'ID de la tâche ne correspond pas.");
            }

            var utilisateur = await _context.Utilisateur
                .FirstOrDefaultAsync(u => u.Prenom == tacheDto.Prenom);

            var tache = await _context.Tache.FindAsync(id);
            if (tache == null)
            {
                return NotFound();
            }

            //tache.UtilisateurId = utilisateur.Id; 
            tache.Libelle = tacheDto.Libelle; 
            tache.Statut = (byte)tacheDto.Statut; 

 
            _context.Entry(tache).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TacheExists(id))
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

        /*
        *    Requete POST Ajouter une tâche
        */
        // POST: api/Taches
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Tache>> PostTache(CreateTacheDto createTacheDto)
        {
            var utilisateur = await _context.Utilisateur
                .FirstOrDefaultAsync(u => u.Prenom == createTacheDto.Prenom);

            var tache = new Tache
            {
                UtilisateurId = utilisateur?.Id,
                Libelle = createTacheDto.Libelle,
                Statut = (byte)createTacheDto.StatutType
            };

            _context.Tache.Add(tache);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTache", new { id = tache.Id }, tache);
        }

        /*
        *    Requete DELETE Supprimer une tâche
        */
        // DELETE: api/Taches/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTache(int id)
        {
            var tache = await _context.Tache.FindAsync(id);
            if (tache == null)
            {
                return NotFound();
            }

            _context.Tache.Remove(tache);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TacheExists(int id)
        {
            return _context.Tache.Any(e => e.Id == id);
        }
    }
}
