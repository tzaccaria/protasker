using System.ComponentModel.DataAnnotations;

namespace api_protasker.Models
{
    public class MaxIntLengthAttribute : ValidationAttribute
    {
        private readonly int _maxIntLength;

        public MaxIntLengthAttribute(int maxTinyintLength)
        {
            _maxIntLength = maxTinyintLength;
        }

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value is byte bytevalue)
            {
                if (bytevalue.ToString().Length > _maxIntLength)
                {
                    return new ValidationResult($"L'attribut int doit avoir une taille maximum de {_maxIntLength}");
                }
            }
            return ValidationResult.Success;
        }
    }
}
