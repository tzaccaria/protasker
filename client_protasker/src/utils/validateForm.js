export const validateForm = (libelle,statut, setError) => {
    if (!libelle) {
        setError("Le libellé de la tâche est obligatoire.");
        return false;
    }
    if (!statut) {
        setError("Le statut est obligatoire.");
        return false;
    }
    setError(null); // Réinitialiser l'erreur si tout est valide
    return true;
};