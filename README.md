# Configuration
## Backend
- Lancer le backend dockerisé :
```
docker compose up -d --build
```
## BDD 
- Ouvrir l'adresse suivante dans un navigateur "http://localhost:40001"
- Se connecter à phpmyadmin avec les credentials présent dans le docker compose


## Frontend 
Aller dans le dossier frontend et installer les dépendances :
```
npm i
```
Lancer le frontend : 
```
npm run watch 
```
Ouvrir le fichier index.html du dossier frontend dans un navigateur et commencer à jouer 
