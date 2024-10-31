using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using api_protasker.Enums;

namespace api_protasker.Models
{

    public class Tache
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [MaxIntLength(10, ErrorMessage = "L'id doit avoir au maximum une taille de 10")]
        public int Id { get; set; }

        public int? UtilisateurId { get; set; }

        [JsonIgnore]
        [ForeignKey("UtilisateurId")]
        public Utilisateur? Utilisateur { get; set; }

        [Required]
        [MaxLength(255)]
        public string Libelle { get; set; } = "0";

        [Required]
        [MaxTinyintLength(3, ErrorMessage = "Le statut doit avoir au maximum une taille de 3")]
        public byte Statut { get; set; } = (byte)StatutType.EnCours; // = 0

        [NotMapped]
        [JsonIgnore]
        public StatutType StatutType
        {
            get => (StatutType)Statut;
            set => Statut = (byte)value;
        }
    }
}
