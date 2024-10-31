using System.ComponentModel.DataAnnotations;

namespace api_protasker.Models
{
    public class MaxTinyintLengthAttribute : ValidationAttribute
    {
        private readonly int _maxTinyintLength;

        public MaxTinyintLengthAttribute(int maxTinyintLength)
        {
            _maxTinyintLength = maxTinyintLength;
        }

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value is byte bytevalue)
            {
                if(bytevalue.ToString().Length > _maxTinyintLength)
                {
                    return new ValidationResult($"L'attribut tinyint doit avoir une taille maximum de {_maxTinyintLength}");
                }
            }
            return ValidationResult.Success;
        }


    }
}
