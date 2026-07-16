# CognitiveAI Ecosystem Responsibility Matrix

**Version :** 1.0
**Statut :** Architecture de référence
**Date :** 16 juillet 2026

## 1. Objectif

Ce document définit les responsabilités officielles des trois projets de l’écosystème :

* **PPS-KnowledgeBase**
* **PPS-CognitiveAI-Core**
* **PPS-Maroc.ia**

Son objectif est d’empêcher :

* la duplication des capacités ;
* les dépendances circulaires ;
* les responsabilités ambiguës ;
* les traitements contradictoires ;
* la multiplication de plusieurs implémentations pour une même fonction.

## 2. Principe fondamental

> Une capacité possède un seul propriétaire officiel et une seule implémentation de référence.

Les autres projets peuvent utiliser cette capacité au moyen d’un contrat public ou d’un adaptateur, mais ils ne doivent pas la réimplémenter.

## 3. Missions officielles

### 3.1 PPS-KnowledgeBase

Mission :

> Transformer des fichiers et des sources documentaires en connaissances qualifiées, traçables, organisées et récupérables.

PPS-KnowledgeBase est responsable de :

* la gestion physique et logique du corpus ;
* l’audit documentaire ;
* les métadonnées ;
* les sources ;
* la traçabilité ;
* la classification documentaire ;
* l’indexation ;
* la récupération des connaissances ;
* la construction du `KnowledgePackage`.

PPS-KnowledgeBase ne doit pas :

* comprendre l’intention de l’utilisateur ;
* gérer une conversation ;
* produire un raisonnement ;
* générer une réponse finale ;
* réimplémenter les extracteurs cognitifs du Core.

### 3.2 PPS-CognitiveAI-Core

Mission :

> Comprendre une demande, planifier le traitement cognitif, exploiter les connaissances reçues, raisonner et produire un résultat cognitif structuré.

PPS-CognitiveAI-Core est responsable de :

* l’analyse cognitive de la demande ;
* la lecture cognitive des textes ;
* l’extraction des entités ;
* l’extraction des faits ;
* l’extraction des relations ;
* l’extraction des événements ;
* la construction des chronologies ;
* la planification cognitive ;
* le raisonnement ;
* la mémoire cognitive ;
* la gestion des objectifs ;
* la confiance ;
* les conclusions ;
* la production du résultat cognitif.

PPS-CognitiveAI-Core ne doit pas :

* parcourir directement les répertoires ;
* gérer les formats physiques du corpus ;
* déplacer ou renommer des documents ;
* administrer les sources ;
* gérer l’interface utilisateur ;
* contenir des règles propres au PPS.

### 3.3 PPS-Maroc.ia

Mission :

> Orchestrer les services de l’écosystème dans le domaine spécialisé du PPS et fournir l’expérience utilisateur finale.

PPS-Maroc.ia est responsable de :

* l’interface utilisateur ;
* les requêtes utilisateur ;
* la conversation ;
* l’orchestration des services ;
* le profil spécialisé PPS ;
* les règles éditoriales ;
* les politiques de réponse ;
* les questions stratégiques ;
* les tests réels ;
* la présentation des sources et des réponses ;
* la validation fonctionnelle de l’ensemble.

PPS-Maroc.ia ne doit pas :

* scanner directement le corpus ;
* reconstruire un `KnowledgePackage` ;
* réimplémenter les capacités cognitives du Core ;
* dupliquer les moteurs de recherche de la KnowledgeBase.

## 4. Matrice des responsabilités

| Capacité                               | Propriétaire officiel                | Entrée principale           | Sortie principale         | Interdit ailleurs           |
| -------------------------------------- | ------------------------------------ | --------------------------- | ------------------------- | --------------------------- |
| Scanner les fichiers                   | PPS-KnowledgeBase                    | Chemin du corpus            | Liste de fichiers         | Core, PPS-Maroc.ia          |
| Construire l’inventaire                | PPS-KnowledgeBase                    | Liste de fichiers           | `CorpusInventory`         | Core, PPS-Maroc.ia          |
| Analyser l’état technique              | PPS-KnowledgeBase                    | Fichier                     | `CorpusFileAnalysis`      | Core, PPS-Maroc.ia          |
| Produire le rapport d’audit            | PPS-KnowledgeBase                    | Analyses techniques         | `CorpusAuditReport`       | Core, PPS-Maroc.ia          |
| Créer l’identité documentaire          | PPS-KnowledgeBase                    | Analyse technique           | `CorpusDocument`          | Core, PPS-Maroc.ia          |
| Extraire les métadonnées déclarées     | PPS-KnowledgeBase                    | Document                    | Métadonnées documentaires | Core                        |
| Calculer une empreinte cryptographique | PPS-KnowledgeBase                    | Fichier                     | Hash                      | Core, PPS-Maroc.ia          |
| Détecter les doublons exacts           | PPS-KnowledgeBase                    | Hashs                       | Groupes de doublons       | Core, PPS-Maroc.ia          |
| Détecter les versions documentaires    | PPS-KnowledgeBase                    | Documents et métadonnées    | Relations de version      | Core                        |
| Gérer les URL et sources               | PPS-KnowledgeBase                    | Références documentaires    | Source qualifiée          | Core                        |
| Évaluer l’autorité d’une source        | PPS-KnowledgeBase avec profil PPS    | Source et règles du domaine | Niveau d’autorité         | Core seul                   |
| Classifier un document                 | PPS-KnowledgeBase avec taxonomie PPS | Document et métadonnées     | Catégorie documentaire    | Core                        |
| Indexer les documents                  | PPS-KnowledgeBase                    | Documents validés           | Index                     | Core, PPS-Maroc.ia          |
| Rechercher les fragments               | PPS-KnowledgeBase                    | `KnowledgeRequest`          | Fragments pertinents      | Core, PPS-Maroc.ia          |
| Construire le `KnowledgePackage`       | PPS-KnowledgeBase                    | Résultats de recherche      | `KnowledgePackage`        | PPS-Maroc.ia                |
| Lire cognitivement un texte            | PPS-CognitiveAI-Core                 | Texte qualifié              | Résultat de lecture       | KnowledgeBase               |
| Extraire les entités                   | PPS-CognitiveAI-Core                 | Texte                       | Entités                   | KnowledgeBase               |
| Extraire les faits                     | PPS-CognitiveAI-Core                 | Texte                       | Faits                     | KnowledgeBase               |
| Extraire les relations                 | PPS-CognitiveAI-Core                 | Texte                       | Relations                 | KnowledgeBase               |
| Extraire les événements                | PPS-CognitiveAI-Core                 | Texte                       | Événements                | KnowledgeBase               |
| Construire une chronologie             | PPS-CognitiveAI-Core                 | Événements                  | Timeline                  | KnowledgeBase               |
| Analyser l’intention                   | PPS-CognitiveAI-Core                 | Question                    | `ConversationIntent`      | KnowledgeBase               |
| Suivre l’objectif                      | PPS-CognitiveAI-Core                 | Intention et mémoire        | `ConversationGoal`        | KnowledgeBase               |
| Construire le plan de dialogue         | PPS-CognitiveAI-Core                 | Intention et contexte       | `DialoguePlan`            | KnowledgeBase               |
| Gérer la mémoire cognitive             | PPS-CognitiveAI-Core                 | Contexte et résultats       | `ConversationMemory`      | KnowledgeBase               |
| Planifier le raisonnement              | PPS-CognitiveAI-Core                 | Question et connaissances   | Plan cognitif             | KnowledgeBase               |
| Raisonner                              | PPS-CognitiveAI-Core                 | `CognitiveContext`          | `ReasoningResult`         | KnowledgeBase, PPS-Maroc.ia |
| Évaluer la confiance                   | PPS-CognitiveAI-Core                 | Preuves et raisonnement     | Score de confiance        | PPS-Maroc.ia                |
| Produire le résultat cognitif          | PPS-CognitiveAI-Core                 | Raisonnement validé         | Réponse structurée        | KnowledgeBase               |
| Gérer l’utilisateur                    | PPS-Maroc.ia                         | Session                     | Contexte utilisateur      | Core, KnowledgeBase         |
| Orchestrer les appels                  | PPS-Maroc.ia                         | Question utilisateur        | Flux complet              | Core, KnowledgeBase         |
| Définir le profil PPS                  | PPS-Maroc.ia                         | Domaine PPS                 | Configuration métier      | Core générique              |
| Définir les règles éditoriales         | PPS-Maroc.ia                         | Politique de réponse        | `ResponsePolicy`          | KnowledgeBase               |
| Présenter la réponse                   | PPS-Maroc.ia                         | Résultat cognitif           | Réponse utilisateur       | Core                        |
| Conduire les tests réels               | PPS-Maroc.ia                         | Scénarios utilisateurs      | Rapport fonctionnel       | Aucun autre propriétaire    |
| Collecter les retours                  | PPS-Maroc.ia                         | Utilisateurs et testeurs    | Données d’amélioration    | Core, KnowledgeBase         |

## 5. Métadonnées documentaires autorisées dans PPS-KnowledgeBase

PPS-KnowledgeBase peut extraire ou gérer les éléments suivants :

* identifiant documentaire ;
* nom du fichier ;
* chemin ;
* chemin relatif ;
* extension ;
* format ;
* taille ;
* encodage ;
* nombre de caractères ;
* nombre de mots ;
* nombre de lignes ;
* nombre de paragraphes ;
* titre explicitement déclaré ;
* auteur explicitement déclaré ;
* organisation explicitement déclarée ;
* date explicitement déclarée ;
* URL présentes ;
* source d’origine ;
* date d’importation ;
* version ;
* empreinte cryptographique ;
* statut documentaire ;
* catégorie documentaire ;
* langue technique probable.

Ces informations décrivent le document. Elles ne constituent pas encore une interprétation cognitive de son contenu.

## 6. Capacités interdites dans PPS-KnowledgeBase

PPS-KnowledgeBase ne doit pas réimplémenter :

* `EntityExtractor` ;
* `FactExtractor` ;
* `RelationExtractor` ;
* `EventExtractor` ;
* `TimelineExtractor` ;
* `ReadingEngine` ;
* les opérateurs de raisonnement ;
* le moteur de confiance cognitive ;
* l’analyse des intentions ;
* la mémoire conversationnelle ;
* les conclusions cognitives.

Lorsqu’un enrichissement cognitif est nécessaire, PPS-KnowledgeBase doit appeler PPS-CognitiveAI-Core au moyen d’un adaptateur officiel.

## 7. Contrats d’échange principaux

### 7.1 PPS-Maroc.ia vers PPS-KnowledgeBase

Contrat recommandé :

`KnowledgeRequest`

Il peut contenir :

* la question ;
* le sujet ;
* les entités recherchées ;
* la période ;
* les catégories documentaires ;
* les types de sources ;
* les contraintes de fiabilité ;
* la stratégie de récupération.

### 7.2 PPS-KnowledgeBase vers PPS-CognitiveAI-Core

Contrat officiel :

`KnowledgePackage`

Il doit contenir des connaissances récupérées, accompagnées de leurs preuves et de leur traçabilité.

### 7.3 PPS-CognitiveAI-Core vers PPS-Maroc.ia

Contrat recommandé :

`CognitiveResponse`

Il peut contenir :

* la réponse structurée ;
* le résultat du raisonnement ;
* les conclusions ;
* le niveau de confiance ;
* les preuves utilisées ;
* les limites ;
* les avertissements ;
* les traces nécessaires à l’explication.

### 7.4 PPS-KnowledgeBase vers PPS-CognitiveAI-Core pour la lecture

Contrat recommandé :

`CognitiveReadingRequest`

Il peut contenir :

* l’identifiant du document ;
* le texte ;
* les métadonnées documentaires ;
* la langue ;
* la source ;
* les capacités d’extraction demandées.

Réponse recommandée :

`KnowledgeExtractionResult`

## 8. Dépendances autorisées

PPS-Maroc.ia peut dépendre publiquement de :

* PPS-KnowledgeBase ;
* PPS-CognitiveAI-Core.

PPS-KnowledgeBase peut appeler certaines capacités publiques de PPS-CognitiveAI-Core au moyen d’un adaptateur dédié, uniquement pour l’enrichissement cognitif.

PPS-CognitiveAI-Core ne doit pas dépendre directement de PPS-Maroc.ia.

PPS-CognitiveAI-Core ne doit pas dépendre d’un corpus PPS particulier.

## 9. Dépendances interdites

Sont interdites :

* la lecture directe des dossiers PPS par le Core ;
* l’importation de classes internes du Core dans la KnowledgeBase ;
* la duplication des extracteurs cognitifs ;
* la duplication des retrievers documentaires dans PPS-Maroc.ia ;
* la construction manuelle du `KnowledgePackage` dans PPS-Maroc.ia ;
* l’ajout de règles PPS codées en dur dans le Core ;
* les dépendances circulaires entre les trois projets.

## 10. Procédure obligatoire avant chaque nouveau module

Avant de développer une nouvelle capacité, il faut répondre aux questions suivantes :

1. Quelle est sa responsabilité unique ?
2. Cette capacité existe-t-elle déjà ?
3. Quel projet en est le propriétaire naturel ?
4. Quelle est son entrée ?
5. Quelle est sa sortie ?
6. Quel composant utilisera cette sortie ?
7. Faut-il créer une capacité ou appeler une capacité existante ?
8. Existe-t-il un risque de dépendance circulaire ?
9. Le comportement est-il générique ou propre au PPS ?
10. Comment cette capacité sera-t-elle testée ?

La création du module est autorisée uniquement après cette vérification.

## 11. Décision concernant V1-006

La capacité suivante est provisoirement nommée :

`DocumentMetadataExtractor`

Elle appartient à PPS-KnowledgeBase uniquement si elle se limite aux métadonnées documentaires déterministes et explicitement observables.

Elle ne doit extraire ni entités, ni faits, ni relations, ni événements, ni chronologie, ni conclusion.

Avant son développement, ses champs exacts devront être validés un par un à partir de la présente matrice.

## 12. Devise d’architecture

> Une capacité, un propriétaire, une implémentation, un contrat.

> Doucement, mais sûrement.
