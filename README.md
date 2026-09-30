# Ahla Keswa Chez Rim — site web

## Contenu du dossier

```
ahla-keswa/
├── index.html      la page d'accueil
├── css/styles.css  toutes les couleurs, polices et mises en page
├── js/main.js      menu mobile, formulaire WhatsApp, etc.
└── images/         vos photos (galerie « Nos mariées »)
```

## Voir le site
Double-cliquez sur `index.html` : il s'ouvre dans votre navigateur. Aucune installation n'est nécessaire.

## À compléter
1. **Photos** : les vraies photos sont dans `images/` (hero, robes, Cap Bon, atelier et 13 photos de galerie `galerie-01…13`). Pour en changer une, remplacez le fichier en gardant le même nom. Un clic sur une photo de la galerie l'agrandit.
2. **Vidéos** : le reel Facebook est déjà intégré. Pour en ajouter d'autres, collez leurs liens dans `FACEBOOK_VIDEOS`, en haut de `js/main.js`.
3. **Horaires** : cherchez `[Jours et heures d'ouverture]` dans `index.html`.

## Photo du hammam
Seule la photo du hammam vient encore du site Lovable. Pour la remplacer, ajoutez `images/hammam.jpg` et changez le lien dans `index.html`.

## Vidéos Facebook
Les vidéos et le fil Facebook ne s'affichent que lorsque le site est en ligne (pas en ouvrant le fichier en double-clic), et seulement si les publications sont publiques.

## Vidéos et publications Facebook
La section « Nos mariées en vidéo » affiche automatiquement les dernières publications de la page Facebook (colonne de droite).

Pour ajouter vos meilleures vidéos :
1. Sur Facebook, ouvrez la vidéo ou le reel > « Partager » > « Copier le lien ».
2. Ouvrez `js/main.js` et collez le lien dans `FACEBOOK_VIDEOS`, par exemple :
   `{ url: "https://www.facebook.com/reel/1234567890" },`
3. Pour une vidéo enregistrée sur l'ordinateur : créez un dossier `videos/`, mettez-y le fichier MP4 et ajoutez `{ file: "videos/mariage-1.mp4" },`.

Remarque : les intégrations Facebook s'affichent une fois le site en ligne (ou ouvert depuis un navigateur connecté à Internet).

## Formulaire
Le formulaire n'a pas besoin de serveur : il ouvre WhatsApp avec un message pré-rempli (nom, téléphone, prestation, date) vers le +216 23 879 058. Pour changer de numéro, modifiez `WHATSAPP_NUMBER` en haut de `js/main.js`.

## Couleurs
Toutes les couleurs sont regroupées en haut de `css/styles.css` (bloc `:root`). Changez par exemple `--deep` pour une autre teinte des sections sombres.

## Mise en ligne
Le dossier peut être publié tel quel sur n'importe quel hébergeur statique : Netlify (glisser-déposer le dossier), GitHub Pages, Vercel ou un hébergement tunisien classique.
