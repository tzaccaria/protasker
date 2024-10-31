import { useState } from "react";
import ReactDOM from "react-dom";
import { StatusEnum } from "../../../utils/StatusEnum";
import TaskService from "../../../services/TaskService";
import './../Modals.css';
import { handleLibelle, handleAttribution, handleStatut } from "../../../utils/formHandlers";
import { validateForm } from "../../../utils/validateForm";

/*
Gére le Modal d'ajout de tâche et ajoute une tâche
*/
export default function AddTaskModal({ onClose, fetchTasks }) {
    const [libelle, setLibelle] = useState("");
    const [attribution, setAttribution] = useState("");
    const [statut, setStatut] = useState("");
    const [error, setError] = useState(null);

    // Ajout d'une tâche
    const handleAddTask = async () => {
        setError(null);
        if (!validateForm(libelle,statut,setError)) return;
        try {
            const newTask = {prenom : attribution, libelle : libelle, statutType : statut};
            await TaskService.addTask(newTask);
            console.log("Tâche ajoutée avec succès !");
            setLibelle("");
            setAttribution(null);
            setStatut(0);
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
                <h2 className="modal-title text-left">Nouvelle tâche</h2>
                <hr/>
                <div className="form-group">
                    <label htmlFor="input-libelle" className="text-left">Libellé de la tâche</label>
                    <input className="form-control" id="input-libelle" type="text" onChange={(e) => handleLibelle(e, setLibelle)} />
                </div>
                <div className="form-group">
                    <label htmlFor="input-utilisateur">Attribution</label>
                    <input className="form-control" id="input-utilisateur" type="text" onChange={(e) => handleAttribution(e, setAttribution)} />
                </div>
                <div className="form-group">
                    <label htmlFor="select-statut" className="text-left">Statut</label>
                    <select className="form-control select-form form-select-md" id="select-statut" value={statut} onChange={(e) => handleStatut(e, setStatut)}>
                        <option value={""}>-- Sélectionnez un statut --</option>
                        {Object.entries(StatusEnum).map(([key, value]) => (
                            <option key={key} value={key}>{value}</option>
                        ))}
                    </select>
                    {error && <div className="error-message">{error}</div>}
                </div>
                
                <hr/>
                <div className="row m-2">
                        <div className="col"></div>
                        <div className="col d-flex justify-content-end">
                        <button onClick={onClose} className="btn btn-light close-modal-btn">
                            Annuler
                        </button>
                        <button onClick={handleAddTask} className="btn btn-dark close-modal-btn">
                            Ajouter
                        </button>
                        </div>
                </div>
                
            </div>
        </div>,
        document.body
    );
}