import { useState } from "react";
import ReactDOM from "react-dom";
import { StatusEnum } from "../../../utils/StatusEnum";
import TaskService from "../../../services/TaskService";
import { handleIdTache, handleLibelle, handleAttribution, handleStatut } from "../../../utils/formHandlers";
import Task from "../../../models/Task";
import './../Modals.css';
import { validateForm } from "../../../utils/validateForm";

/*
Gére le Modal de modification de tâche et appelle le service de modification de la tâche
*/

export default function UpdateTaskModal({ onClose, task, fetchTasks }) {
    const [idTache, setIdTache] = useState(task.id);
    const [libelle, setLibelle] = useState(task.libelle);
    const [attribution, setAttribution] = useState(task.prenom);
    const [statut, setStatut] = useState(task.statut);
    const [error, setError] = useState(null);

    // Modification d'une tâche
    const handleUpdateTask = async () => {
        setError(null);
        if (!validateForm(libelle,statut,setError)) return;
        try {
            const updateTask = {
                id: idTache,
                prenom: attribution, // Assurez-vous d'utiliser le bon champ
                libelle: libelle,
                statut: statut,
            };
            console.log("Attribution (Prenom):", attribution);
            console.log("Données de la tâche à envoyer : ", updateTask); // Ajout de la journalisation
            await TaskService.updateTask(idTache, updateTask);
            console.log("Tâche modifiée avec succès !");
            fetchTasks();
            onClose();
        } catch (error) {
            console.error(error);
            setError(error.message);
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target.className === 'modal-overlay') {
            onClose();
        }
    };

    return ReactDOM.createPortal(
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="container modal-content">
                <h2 className="modal-title text-left">Modification d'une tâche</h2>
                <hr />
                <div className="form-group">
                    <label htmlFor="input-libelle" className="text-left">Libelle</label>
                    <input className="form-control" id="input-libelle" value={libelle} type="text" onChange={(e) => handleLibelle(e, setLibelle)} />
                </div>
                <div className="form-group">
                    <label htmlFor="input-utilisateur" className="text-left">Attribution</label>
                    <input className="form-control" id="input-utilisateur" value={attribution} type="text" onChange={(e) => handleAttribution(e, setAttribution)} />
                </div>
                <div className="form-group">
                    <label htmlFor="select-statut" className="text-left">Statut</label>
                    <select className="form-control select-form form-select-md" id="select-statut" value={statut} onChange={(e) => handleStatut(e, setStatut)}>
                        {Object.entries(StatusEnum).map(([key, value]) => (
                            <option key={key} value={key}>{value}</option>
                        ))}
                    </select>
                    {error && <div className="error-message">{error}</div>}
                </div>
                <hr />
                <div className="row m-2">
                    <div className="col"></div>
                    <div className="col d-flex justify-content-end">
                        <button onClick={onClose} className="btn btn-light close-modal-btn">
                            Annuler
                        </button>
                        <button onClick={handleUpdateTask} className="btn btn-dark close-modal-btn">
                            Modifier
                        </button>
                    </div>
                </div>

            </div>
        </div>,
        document.body
    );
}