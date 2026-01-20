# Galerie simple (iOS9 compatible)

1) Placer les fichiers : index.html, styles.css, script.js à la racine du dépôt.
2) Créer un dossier `assets/` et y téléverser :
   - miniatures (ex: photo1-thumb.jpg)
   - images grandes (ex: photo1-large.jpg)
   - vidéos encodées en mp4 (ex: video1.mp4) et miniatures/pôsters pour les vidéos.

Encodage recommandé (ffmpeg) pour iOS9 :
```
ffmpeg -i input.mov -c:v libx264 -profile:v baseline -level 3.0 -pix_fmt yuv420p -crf 23 -c:a aac -b:a 128k -movflags +faststart output.mp4
```

Activation du mot de passe (simple / côté client) :
- Ouvre `script.js` et mets `var SITE_PASSWORD = "tonMotDePasse";` puis enregistre.

Limiter l'accès correctement (option sûre) :
- GitHub Pages ne propose pas d'authentification HTTP Basic.
- Pour une protection réelle, il faut un serveur ou un service qui gère l'authentification (ex : hébergement personnel, Netlify + functions, Cloudflare Access, ou config Apache/Nginx). Dis‑moi ton environnement si tu veux que je te guide là-dessus.

Tester sur l'iPad :
- Si tu utilises GitHub Pages (hébergé par GitHub), après activation (voir étapes ci‑dessous), ouvre l'URL:
  https://<ton-nom-utilisateur>.github.io/<nom-du-repo>/
- iOS9 n'autorise généralement pas l'autoplay : il faudra cliquer pour lancer les vidéos.
