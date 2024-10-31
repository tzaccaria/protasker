import { useState, useEffect } from 'react';
import './TaskControl.css';
import 'font-awesome/css/font-awesome.min.css';
import AddTaskModal from '../modals/AddTaskModal/AddTaskModal';
import TaskTable from '../TaskTable/TaskTable';
import TaskService from '../../services/TaskService';
import SearchBar from '../SearchBar/SearchBar';
import Filter from '../Filter/Filter';
import { StatusEnum } from '../../utils/StatusEnum';
/*
Component principale : 
Gère l'affichage du modal ajouter tâche, du filtres et du tableau.
Récupère les tâches par un service.
Permet d'exporter les tâches
*/
export default function TaskControl() {

    // Liste des tâches et liste filtrée
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    
    // Permet de savoir si un component doit être affiché
    const [showTable, setShowTable] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showFilterModal, setShowFilterModal] = useState(false);

    // Terme dans les recherches, filtres
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');

    // Pour tout ce qui est en lien avec la pagination
    const [totalTasks, setTotalTasks] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 7;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Fonction ouverture de modal ajouter tâche
    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    // gère affichage du filtre
    const toggleFilterModal = () => setShowFilterModal(prev => !prev);

    /*
    Récupère les tâches selon la pagination
    */
    const fetchTasks = async (pageNumber = 1, pageSize = 7) => {
        try {
            const res = await TaskService.getTasks(currentPage,tasksPerPage);
            setTasks(res.data);
            setFilteredTasks(res.data);
            setTotalTasks(res.max);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchTasks(currentPage);
    }, [currentPage]);

    /*
    Récupère le fichier excel des taches selon les filtres
    */
    const exportTasks = async () => {
        try {
            await TaskService.exportTasks(filteredTasks);
        } catch (error){
            console.log(error.message);
        }
    }

    /*
    Filtrer les tâches
    */
    
    useEffect(() => {
        const filtered = tasks.filter(task =>
            task.libelle.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedUser === '' || task.prenom.toLowerCase().includes(selectedUser.toLowerCase())) &&
            (selectedStatus === '' || StatusEnum[task.statut].toLowerCase().includes(selectedStatus.toLowerCase()))
        );
        setFilteredTasks(filtered);
        
        if(filtered.length) {
            setShowTable(true);
        } else {
            setShowTable(false);
        }
    }, [searchTerm, selectedUser, selectedStatus, tasks]);



    return (
        <>
            <menu className="task-controls">
                <div className="container-fluid">
                    <div className="row w-100">
                        <div className="col-3">
                            <button type="button" className="add-task btn" onClick={openModal}>Ajouter une tâche</button>
                        </div>
                        <div className="col-3"></div>
                        <div className="col-4">
                            <SearchBar 
                                searchTerm={searchTerm}
                                onSearchChange={setSearchTerm}
                            />
                        </div>
                        <div className="col-2 text-end">
                            <button className='button-excel' onClick={exportTasks}>
                                <i className="fa fa-file-excel-o" aria-hidden="true"></i>
                            </button>
                            <button className='button-filter' onClick={toggleFilterModal} type='button'>
                                <i className="fa fa-filter" aria-hidden="true"></i>
                            </button>

                        </div>

                    </div>
                </div>
            </menu>
            {
                showFilterModal && (
                    <div className="filter-modal">
                    <Filter 
                        selectedUser={selectedUser}
                        selectedStatus={selectedStatus}
                        onUserChange={setSelectedUser}
                        onStatusChange={setSelectedStatus}
                    />
                </div>
                )
            }
            {
                showModal && (
                    <AddTaskModal fetchTasks={fetchTasks} onClose={closeModal} />
                )
            }
            {
                showTable && (
                    <TaskTable
                    tasks={filteredTasks}
                    fetchTasks={fetchTasks}
                    tasksPerPage={tasksPerPage}
                    totalTasks={totalTasks}
                    paginate={paginate}
                    currentPage={currentPage}
                    />
                )
            }
            {
                !showTable && (
                    <div className='container-fluid d-flex flex-column justify-content-center align-items-center' style={{ height: '60vh' }}>
                        <i className="fa fa-tasks fa-2x m-3"></i>
                        <h2 className='notask-text m-3'>Aucune tâche disponible</h2>
                    </div>

                )
            }
            
        </>
    );
}