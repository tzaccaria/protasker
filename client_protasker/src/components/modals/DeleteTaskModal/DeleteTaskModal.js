import { useState } from "react";
import ReactDOM from "react-dom";
import TaskService from "../../../services/TaskService";
import './../Modals.css';
import './DeleteTaskModal.css';
import 'font-awesome/css/font-awesome.min.css';

/*
Gére le Modal de suppression de tâche et appelle le service de suppression de la tâche
*/
export default function DeleteTaskModal({ onClose, task, fetchTasks }) {
    const [idTache] = useState(task.id);
    const [error, setError] = useState(null);


    // Suppression de la tâche
    const handleDeleteTask = async () => {
        setError(null);
        try {
            await TaskService.deleteTask(idTache);
            console.log(`Tâche supprimée (id=${idTache}) avec succès !`);
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
                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <div className="triangle">
                            <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
                        </div>
                    </div>
                </div>
                <h2 className="modal-title text-center mb-3">Suppression d'une tâche</h2>
                <p className="text-center">Vous êtes sur le point de supprimer une tâche.</p>
                <p className="text-center">Êtes-vous sûr de vouloir procéder à la suppression ?</p>
                {error && <div className="error-message">{error}</div>}

                <div className="row m-2">
                    <div className="col d-flex justify-content-end">
                    <button onClick={onClose} className="btn btn-secondary close-modal-btn">
                            Annuler
                    </button>
                    </div>
                    <div className="col-1"></div>
                    <div className="col d-flex justify-content-start">
                        <button onClick={handleDeleteTask} className="btn btn-danger close-modal-btn">
                            Supprimer
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}