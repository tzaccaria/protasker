import React from 'react';
import "./Pagination.css";

/*
Gère la Pagination selon le nombre total de taches et le nombre de tâche que l'on veut afficher (ici 7)
*/
export default function Pagination({ tasksPerPage, totalTasks, paginate, currentPage }) {
    const pageNumbers = [];
    const maxPageButtons = 5;
    const totalPages = Math.ceil(totalTasks / tasksPerPage);
  
    // Calcul des numéros de page et item
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  
    const startPage = Math.max(1, Math.min(currentPage - Math.floor(maxPageButtons / 2), totalPages - maxPageButtons + 1));
    const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    
    return (
        <div className='container pagination-container'>
            <ul className="pagination">

                {/* Boutons de page */}
                {pageNumbers.slice(startPage - 1, endPage).map(number => (
                <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                    <a onClick={() => paginate(number)} href="#!" className="page-link">
                        {number}
                    </a>
                </li>
                ))}

            </ul>
        </div>
    );
}