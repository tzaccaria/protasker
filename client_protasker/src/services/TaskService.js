import axios from 'axios';

const API_URL = 'http://localhost:5294/api/Taches';
let downloadInProgress = false;

/*
    Services des tâches
    Gère toutes les requètes concernant les tâches
*/
const TaskService = {
    /*
    Requete GET : récupère les tâches selon la pagination
    */
    getTasks: async (pageNumber, pageSize) => {
        try {
            const response = await axios.get(`${API_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
            return response.data;
        } catch(error) {
            throw new Error('Erreur lors de la récupération des tâches : ' + error.message);
        }
    },
    getTask: async (idTache) => {
        try {
            const response = await axios.get(API_URL, {
                idTache
            });
            return response.data;
        } catch (error) {
            throw new Error('Erreur lors de l\'ajout de la tâche : ' + error.message);
        }
    },
    /*
    Requete POST : télécharge l'exportation des tâches en excel
    */
    exportTasks: async (tasks) => {
        try {
            const response = await axios.post(`${API_URL}/export-taches`, tasks);
            console.log(response.data);
            if(!response == null){
                throw new Error('Erreur lors du téléchargement du fichier');
            }


            if (!response.data || !response.data.fileContent) {
                throw new Error('Erreur lors du téléchargement du fichier : Données manquantes dans la réponse');
            }

            const data = response.data;

            // Decode du base64
            if (typeof data.fileContent !== 'string' || !data.fileContent.trim()) {
                throw new Error('Erreur : fileContent n\'est pas une chaîne Base64 valide');
            }

            
            const byteCharacters = atob(data.fileContent); 
            const byteNumbers = new Array(byteCharacters.length);

            
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers); 
            const blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }); // Créer un Blob avec le type MIME Excel
            
           // Créer un lien pour télécharger le fichier
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = data.fileName || 'Taches.xlsx';
            document.body.appendChild(link);

            downloadInProgress = true; 
            link.click(); 

           
            setTimeout(() => {
                URL.revokeObjectURL(link.href);
                document.body.removeChild(link);
                downloadInProgress = false; 
            }, 100);
        } catch(error) {
            throw new Error('Erreur lors de l\'exportation des tâches : ' + error.message);
        }
    },
    /*
    Requete POST : Ajoute une tâche
    */
    addTask: async (task) => {
        try {
            const response = await axios.post(API_URL, task);
            return response.data;
        } catch (error) {
            throw new Error('Erreur lors de l\'ajout de la tâche : ' + error.message);
        }
    },
    /*
    Requete PUT : Modifie une tâche
    */
    updateTask: async (idTache, task) => {
        try {
            const response = await axios.put(`${API_URL}/${idTache}`, task);
            return response.data;
        } catch (error) {
            console.error("Erreur complète de la requête : ", error.response.data); // Ajout du logging
        throw new Error('Erreur lors de la modification de la tâche : ' + error.message);
        }
    },
    /*
    Requete DELETE : Supprime une tâche
    */
    deleteTask: async (idTache) => {
        try {
            const response = await axios.delete(`${API_URL}/${idTache}`, {
                idTache
            });
            return response.data;
        } catch (error) {
            throw new Error('Erreur lors de la suppression de la tâche : ' + error.message);
        }
    }
};

export default TaskService;