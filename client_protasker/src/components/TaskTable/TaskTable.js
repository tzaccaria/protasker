import './TaskTable.css';
import 'font-awesome/css/font-awesome.min.css';
import TaskItem from '../TaskItem/TaskItem.js';
import React, { useState } from 'react';
import Pagination from '../Pagination/Pagination.js';

export default function TaskTable({ tasks, fetchTasks, tasksPerPage, totalTasks, paginate, currentPage }){
    //const [currentPage, setCurrentPage] = useState(1);
    


    /*const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);*/

    //const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
        <div className="task-container container-fluid w-100">
		<table className="task-table text-center">
			<thead>
				<tr>
					<th scope="col">Libellé</th>
					<th scope="col">Attribution</th>
					<th scope="col">Statut</th>
					<th scope="col">Actions</th>
				</tr>
			</thead>
			<tbody>
				{
                    tasks.map((task) => <TaskItem key={task.id} fetchTasks={fetchTasks}  task={task} />)
                }
			</tbody>
		</table>
	    </div>
        <Pagination
            tasksPerPage={tasksPerPage}
            totalTasks={totalTasks}
            paginate={paginate}
            currentPage={currentPage}
        />
    </>
    );
}