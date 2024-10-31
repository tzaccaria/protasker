@echo off
echo Lancement de Protasker...

:: Se déplacer dans le client React
cd ./client_protasker || exit

:: Installation des dépendances
echo Installation des dépendances pour le client React...
npm install || exit
echo Dépendances installées.

:: Lancer le serveur React en arrière-plan
echo Lancement du client React en arrière-plan...
start "" npm start
cd ./../

:: Se déplacer dans l'API .NET
cd ./api_protasker/api_protasker || exit

:: Restauration des dépendances .NET
echo Restauration des dépendances pour l'API .NET...
dotnet restore || exit

:: Installation de l'outil dotnet-ef
echo Installation de dotnet-ef...
dotnet tool install --global dotnet-ef || exit

:: Mise à jour de la base de données
echo Mise à jour de la base de données...
dotnet ef database update || exit

:: Lancer l'API .NET
echo Lancement de l'API .NET...
dotnet run

:: Revenir au dossier principal
cd ./../../
echo Lancement terminé.
pause
