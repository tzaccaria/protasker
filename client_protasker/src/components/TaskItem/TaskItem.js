import React, { useState } from 'react';
import { StatusEnum } from '../../utils/StatusEnum';
import './TaskItem.css';
import UpdateTaskModal from '../modals/UpdateTaskModal/UpdateTaskModal';
import DeleteTaskModal from '../modals/DeleteTaskModal/DeleteTaskModal';

/*
Component d'une entrée de la table
Gère l'affichage de la modification et suppression d'une tâche
*/
export default function TaskItem({ task, fetchTasks }) {
    const [showModalUpdate, setshowModalUpdate] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);

    const openModalUpdate = () => {
        setshowModalUpdate(true);
    };

    const closeModalUpdate = () => {
        setshowModalUpdate(false);
    };

    const openModalDelete = () => {
        setShowModalDelete(true);
    };

    const closeModalDelete = () => {
        setShowModalDelete(false);
    };


    const getBadge = (statut) => {
        switch (statut) {
            case 0:
                return "badge encours";
            case 1:
                return "badge bloque";
            case 2:
                return "badge termine";
            default:
                return "badge";
        }
    }

    return (
        <>
            <tr className="task-item">
                <td>{task.libelle}</td>
                <td>{task.prenom}</td>
                <td>
                    <span className={getBadge(task.statut)}>
                        {StatusEnum[task.statut]}
                    </span>
                </td>
                <td>
                    <button className='p-1' type='button' onClick={openModalUpdate}>
                        <i className="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                    <button className='p-1' type='button' onClick={openModalDelete}>
                        <i className="fa fa-trash" aria-hidden="true"></i>
                    </button>
                </td>
            </tr>
            {
                showModalUpdate && (
                    <UpdateTaskModal
                        task={task}
                        onClose={closeModalUpdate}
                        fetchTasks={fetchTasks}
                    />
                )
            }
            {
                showModalDelete && (
                    <DeleteTaskModal
                        task={task}
                        onClose={closeModalDelete}
                        fetchTasks={fetchTasks}
                    />
                )
            }
        </>
    );
}