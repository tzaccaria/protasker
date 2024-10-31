namespace api_protasker.DTOs
{
    /*
    * DTO des taches crées
    */
    public class CreateTacheDto
    {
        public string Prenom { get; set; }
        public string Libelle { get; set; }
        public int StatutType { get; set; }
    }
}
