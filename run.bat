@echo off
echo Lancement de Protasker...
:: Lancer React
cd ./client_protasker|| exit

start npm start
cd ./../


cd ./api_protasker/api_protasker || exit

:: Lancer .NET
dotnet restore


dotnet tool install --global dotnet-ef


dotnet ef database update


start dotnet run

cd ./../../
echo Lancement terminé.
pause
