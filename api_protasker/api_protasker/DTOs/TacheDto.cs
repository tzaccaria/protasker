using api_protasker.Enums;

namespace api_protasker.DTOs
{
    /*
     * DTO des taches
    */
    public class TacheDto
    {
        public int Id { get; set; }
        public string? Nom { get; set; }
        public string Prenom { get; set; }
        public string Libelle { get; set; }
        public int Statut { get; set; }

        public string GetStatutString()
        {
            // Vérifiez si le statut est une valeur valide
            if (Enum.IsDefined(typeof(StatutType), Statut))
            {
                var statutType = (StatutType)Statut;

                return statutType switch
                {
                    StatutType.EnCours => "En cours",
                    StatutType.Termine => "Terminé",
                    StatutType.Bloque => "Bloqué",
                    _ => "Statut inconnu" 
                };
            }
            else
            {
                return "Statut inconnu";
            }
        }
    }
}
