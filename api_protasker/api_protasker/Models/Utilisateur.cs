using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace api_protasker.Models
{
    public class Utilisateur
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [MaxIntLength(10, ErrorMessage = "L'id doit avoir au maximum une taille de 10")]
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Nom { get; set; }

        [Required]
        [MaxLength(255)]
        public string Prenom { get; set; }

        [JsonIgnore]
        public ICollection<Tache>? Taches { get; set; }
    }
}
