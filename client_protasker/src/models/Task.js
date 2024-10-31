class Task {
    constructor(id,libelle, utilisateurId, statut) {
        this.id = id;
        this.libelle = libelle;
        this.utilisateurId = utilisateurId;
        this.statut = statut;
    }

    isValid() {
        return (
            typeof this.libelle === 'string' && this.libelle.trim() !== '' &&
            this.utilisateurId !== null &&
            this.statut !== null
        );
    }
}

export default Task;
