using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using OfficeOpenXml;
using api_protasker.Models;
using api_protasker.DTOs;

namespace api_protasker.Services
{
    /*
        Gère les exportations excels des taches
    */
    public class ExcelService
    {
        public async Task<byte[]> ExportTachesToExcel(List<TacheDto> taches)
        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            // Initialiser le package EPPlus
            using (var package = new ExcelPackage())
            {
                var worksheet = package.Workbook.Worksheets.Add("Taches");

                worksheet.Cells[1, 1].Value = "Libellé de la tâche";
                worksheet.Cells[1, 2].Value = "Attribution";
                worksheet.Cells[1, 3].Value = "Statut";

                int row = 2; // commencer après l'en-tête
                foreach (var tache in taches)
                {
                    worksheet.Cells[row, 1].Value = tache.Libelle;
                    worksheet.Cells[row, 2].Value = tache.Prenom + " " + tache.Nom;
                    worksheet.Cells[row, 3].Value = tache.GetStatutString();
                    row++;
                }

                // Ajuster la largeur des colonnes
                worksheet.Cells[worksheet.Dimension.Address].AutoFitColumns();

                // Fichier Excel sous forme de tableau de bytes
                return await package.GetAsByteArrayAsync();
            }
        }
    }
}
