<h1>DOCUMENTATION AREA</h1>

<h3>INTRODUCTION:</h3>
<p>
AREA: signifie action/réaction, il s’agit d’un projet qui consiste a recréer un service qui utilise les applets pour faire intéragires divers services web. IFTT «If this then that» est un service qui utilise les applets, que chaines d’instructions, pour faire communiquer notamment Twitter et Gmail.
Cette documentation se divise en 3 grandes parties: Une application Android, un client web, ainsi qu’un serveur qui lie la base de donnée a ces deux plateformes.</p>


<h3>CHOIX DES TECHNOS/FRAMEWORKS/MODULES:</h3>

<h5>DOCKER:</h5> <p>Est un conteneur, il permet d’empaqueter une application et ses dépendances. Les deux intérêt principaux de Docker sont les performances et le déploiement, en effet un conteneur est portable et il est plus facile a utiliser plutot que d’envoyer une machine virtuelle a chaque importation de projet, docker remplace cette machine virtuelle pour ainsi dire.</p>

<h5>MONGODB :</h5> <p>Base de donnée.</p>

<h5>JAVASCRIPT & NODE JS:</h5> <p>Le Node-js permet d’exécuter du JavaScript coté server et interagir avec le système. L’intérêt du Node-js est qu’il est non-bloquant, c’est a dire que lorsqu’un client va faire une requête a la base de donnée il va envoyer ces requêtes dans un thread pool et les gérer de manière plus efficaces en déclenchant une queue d’évènement et il va les exécuter de manière asynchrone.</p>

<h5>KOTLIN:</h5> <p>Language de programmation orienté objet, avec un typage statique qui permet de compiler pour la machine virtuelle Java et Javascript. C’est le deuxieme langage de programmation supporté par Android Studio après Java.</p>

<h5>NPM: Est un gestionnaire de paquet de Node-js.</h5>
<ul>
<li>→ Express : Il s’agit d’une dépendance de NPM. Il permet de faciliter l’installation du server ainsi que la gestion des routes.</li>

<li>→ Ejs / Html : Permet de greffer du code Html sur le server. Ce qui permet notamment de lier un bouton, par exemple, a une requête.</li>

<li>→ Passport : Est un middleware, c’est a dire qu’il intérvient entre les requete utilisateur et les réponses server. Il gère la connexion Login/Sign-up</li>

<li>→ Cron : Un programme qui permet aux utilisateurs des systèmes Unix d’exécuter automatiquement des scripts, des commandes ou des logiciels à une date et une heure spécifiées à l’avance, ou selon un cycle défini à l’avance.</li>
</ul>

<h3>SERVICES :</h3>

<h5>Pour ce projet nous avons choisis d’utiliser les APIs des services suivantes :</h5>

<ul>
<li>Twitter :
→ Un tweet est généré quand l’utilisateur poste une nouvelle photo sur insta.
→ Mail Outlook généré pour chaque nouveau Tweet.
→ Partage sur yammer pour chaque noueau Tweet.
→ Pour chaque Tweet, Twillio emet un sms.
→ Follow Twitter génère un follow sur LinkedIn
→ Follow Twitter génère un follow sur Spotify.
→ Follow Twitter génère un follow sur Yammer.</li>

<li>Chrono :
→ Envoi d’un message de rappel tous les jours à 18h«Nourir les chats».
→ Envoi d’un message de rappel tous les jours à 20h «Appeler Maman».
→ Appel tous les jours à 9h pour le réveil.</li>

<li>Nodemailer :
</li>
<li>Twilio :
</li>
</ul>

<h3>API de notre serveur :</h3>

<p>/api/login :
Client : Envoie une requête POST au serveur via cette route. La requête doit contenir un JSON avec les informations suivantes: 
    • “email:” avec l’email de l’utilisateur
    • “password:” avec le mdp
Serveur: Le serveur répond avec:
    • un JSON contenant le token d’API contenu dans “token:” ainsi qu’un message de succès avec le code 200 dans le cas où l’authentification a réussie.
    • Dans le cas où l’email ou le mot de passe sont invalides et/ou n’ont pas été trouvés, un message d’erreur avec le code 401 est renvoyé.</p>
<p>/api/signup:
Client: Envoie une requête POST au server via cette route. Le client envoie une string formatée en JSON avec les informations               "Email" "Password" ainsi que "Phone".
Serveur: Le serveur répond avec un message de succès, le code HTTP 201 en cas de réussite de la création de compte.

<ul>
<li>Équipe :</li>
<li>Lucas Pierru</li>
<li>Matthieu André</li>
<li>Hugo Varloud</li>
</ul>