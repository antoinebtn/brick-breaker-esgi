## Aperçu
Brick Game est un jeu web de type casse-briques utilisant une architecture microservices avec un backend dockerisé, une base de données MariaDB, et un frontend en HTML, CSS et JavaScript.

## Prérequis
Avant de commencer, assurez-vous d'avoir installé Docker et Docker Compose sur votre machine. Vous pouvez télécharger Docker [ici](https://www.docker.com/products/docker-desktop).

## Installation
Clonez le dépôt du projet sur votre machine locale :
```bash
git clone https://github.com/antoinebtn/brick-breaker-esgi
cd brick-breaker-esgi
```

## Utilisation
Pour lancer l'application, exécutez la commande suivante dans le répertoire racine du projet :
```bash
docker-compose up -d --build
```

## Configuration
### Backend
Le backend est dockerisé et se lance automatiquement avec la commande ci-dessus. Il utilise Express.js pour gérer les requêtes API.

### BDD

Pour accéder à phpMyAdmin et gérer la base de données :
- Ouvrez votre navigateur à l'adresse : http://localhost:40001
- Les credentials pour phpMyAdmin sont disponibles dans le fichier docker-compose.yml.

### Frontend
Le site web est disponible à l'adresse suivante : http://localhost:8080
- Vous pouvez commencer à jouer directement depuis cette interface.

### Technologies utilisées
- Frontend : HTML, CSS, JavaScript
- Backend : Node.js, Express.js
- Base de données : MariaDB
- Outils : Docker, Docker Compose
