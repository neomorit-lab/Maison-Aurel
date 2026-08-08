# Maison Aurel Admin

Base PHP pour la future partie admin Maison Aurel.

## Modules prévus

- CRM : prospects, demandes, clients, suivi WhatsApp/email.
- Tracking : événements site, clics CTA, sources de campagne.
- Réseaux sociaux : liens, planning, contenus, statistiques manuelles.
- Stock : pierres, bijoux, statuts, disponibilité.
- Produits & collections : fiches, prix indicatifs, images, SEO.
- Ads : campagnes, landing pages, budgets, leads.
- KPI / data mining : conversion, demandes, sources, produits demandés.
- Blogs & articles : brouillons, publication, mots-clés, maillage.

## Prochaine étape technique

1. Copier `config/config.example.php` vers `config/config.php`.
2. Créer la base MySQL.
3. Importer `database/schema.sql`.
4. Ajouter authentification admin.
5. Brancher PHPMailer pour contact, sélection et newsletter.

Cette base est volontairement légère pour rester compatible avec un hébergement PHP classique.
