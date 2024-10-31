# ProTasker
## Gestion collaborative de tâches

## Description :
ProTasker est une plateforme collaborative de gestion de tâches.

## Auteur
Tabi Zaccaria

## Technologies Front End : client_protasker
- HTML 5, CSS 3 & Bootstrap 5
- JavaScript
- React 18
- Axios
- Font Awesome 4

## Technologies Back End : api_protasker
- C#
- .NET Core 8
- SQL Server 19

## Configuration nécessaire
Voici la configuration de l'API :
```json
"ConnectionStrings": {
    "api_protaskerContext": "Server=(localdb)\\mssqllocaldb;Database=api_protaskerContext-d9e6e5fe-092d-42a8-8877-f26158b36b65;Trusted_Connection=True;MultipleActiveResultSets=true"
  }
```

L'API utilise SQL Server en local, il faut donc un SQL Server installé en local.

La configuration est déjà faite dans l'API pour SQL Server.

Ps : il existe dans le repertoire : 

```./db_protasker```

Des tables SQL de test Tache et Utilisateur.

## Lancement
Après SQL Server, il suffit de lancer dans la console:

```
cd ./client_protasker
npm install
cd ./../
```
Ensuite lancer le script run.bat depuis le répertoire racine.
```shell
run.bat
```

Les applications seront lancées. Les téléchargements nécessaires pour .NET et React seront effectués par le script.


## Ports

- Le client se lance sur le port 3000
- L'API se lance sur le port 5294
  

## Visionner les tâches
Lors de la sélection du menu "Tâches" dans la barre de navigation, la page des tâches s'affichera.

## Remarque
Les fichiers Docker sont bien présents dans le projet, mais l’application n’est pas configurée pour fonctionner avec Docker, car la connexion à la base de données de l'image n’a pas encore été mise en place pour l'API. Il est donc recommandé de ne pas utiliser Docker pour lancer l’application pour le moment.