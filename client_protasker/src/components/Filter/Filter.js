import React from 'react';
import './Filter.css';

export default function Filter({ selectedUser, onUserChange, selectedStatus, onStatusChange}){
    const init = () => {
        onUserChange('');
        onStatusChange('');
    }
    
    return (
        <div className="filter-container">
            <form className="form">
                <label className='filter-label' htmlFor='input-attribution'>Attribution</label>
                <div className="input-group">
                    <input
                        type="text"
                        id="input-attribution"
                        className="form-control form-input"
                        placeholder="Rechercher par utilisateur"
                        value={selectedUser}
                        onChange={(e) => onUserChange(e.target.value)}
                    />
                </div>
                <label className='filter-label' htmlFor='input-statut'>Statut</label>
                <div className="input-group">
                    <input
                        type="text"
                        id="input-statut"
                        className="form-control form-input"
                        placeholder="Rechercher par statut"
                        value={selectedStatus}
                        onChange={(e) => onStatusChange(e.target.value)}
                    />
                </div>
                <button className='btn btn-primary mt-2' onClick={init} type='button'>Réinitialiser</button>
            </form>
        </div>
    );
}