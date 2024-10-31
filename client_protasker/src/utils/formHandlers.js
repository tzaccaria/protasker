export function handleIdTache(e, setIdTache) {
    const idTache = e.target.value;
    setIdTache(idTache);
    console.log("libelle = " + idTache);
}

export function handleLibelle(e, setLibelle) {
    const newLibelle = e.target.value;
    setLibelle(newLibelle);
    console.log("libelle = " + newLibelle);
}

export function handleAttribution(e, setAttribution) {
    const newUtilisateur = e.target.value;
    setAttribution(newUtilisateur);
    console.log("Id utilisateur = " + newUtilisateur);
}

export function handleStatut(e, setStatut) {
    const newStatut = e.target.value;
    setStatut(newStatut);
    console.log(newStatut);
    console.log("Statut = " + newStatut);
}