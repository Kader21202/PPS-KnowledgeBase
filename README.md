PPS-KnowledgeBase

PPS-KnowledgeBase est une base de connaissances expérimentale conçue pour organiser, structurer, fragmenter, indexer et sélectionner des informations documentaires destinées aux systèmes de la famille PPS.

Le projet constitue la couche de gestion et de préparation des connaissances de l'écosystème PPS. Il est développé séparément du moteur conversationnel et de l'interface utilisateur afin que les mécanismes de traitement documentaire puissent être étudiés et testés indépendamment.

Objectif

PPS-KnowledgeBase vise à transformer des documents sources en unités de connaissances structurées et exploitables par un système d'intelligence artificielle.

Le système travaille notamment sur :

\- l'analyse de documents ;

\- l'identification de leur structure ;

\- la décomposition en sections et fragments ;

\- l'extraction et la normalisation de métadonnées ;

\- la conservation de la provenance ;

\- l'indexation des fragments ;

\- l'évaluation de leur pertinence ;

\- le classement des connaissances ;

\- la construction de paquets de connaissances adaptés à une requête.

Architecture générale

Le traitement peut être représenté de manière simplifiée par :

Documents sources

&#x20;     

Chargement et analyse

&#x20;     

Identification de la structure

&#x20;     

Sections et fragments

&#x20;     

Métadonnées et provenance

&#x20;    

Indexation

&#x20;    

Évaluation de la pertinence

&#x20;    

Classement et sélection

&#x20;     

Paquet de connaissances

&#x20;     

Système PPS

L'objectif est de conserver une séparation claire entre la source documentaire, la transformation des connaissances et leur utilisation ultérieure par un système d'IA.

Structuration documentaire

PPS-KnowledgeBase comporte différents composants chargés de transformer les documents en structures exploitables.

Ils permettent notamment de travailler sur :

\- l'identité des documents ;

\- les sections documentaires ;

\- les fragments de connaissances ;

\- les métadonnées ;

\- les relations entre document source et fragments dérivés ;

\- la détection de documents ou contenus redondants.

Provenance

La provenance constitue un élément important de l'architecture.

Un fragment de connaissance ne doit pas être traité uniquement comme du texte isolé : le système cherche à conserver les informations permettant de retrouver son origine documentaire et son contexte.

Cette approche facilite notamment 

\- la traçabilité ;

\- l'analyse des résultats de recherche ;

\- la vérification des connaissances sélectionnées ;

\- la distinction entre fragments provenant de sources différentes.

Indexation et récupération

Le système comprend des mécanismes d'indexation destinés à retrouver les fragments pertinents pour une requête.

Le développement expérimental porte notamment sur :

\- les termes correspondant à la requête ;

\- la couverture informationnelle ;

\- la pertinence relative ;

\- la centralité du titre ;

\- le score de récupération ;

\- la distinction entre fragments apportant des informations différentes.

Construction des paquets de connaissances

Les fragments sélectionnés peuvent être assemblés dans un Knowledge Package.

Le processus cherche à éviter qu'une réponse soit alimentée uniquement par plusieurs fragments répétant la même information.

Les mécanismes expérimentaux prennent notamment en compte :

\- la pertinence ;

\- la complémentarité ;

\- la contribution à la couverture ;

\- la diversité informationnelle ;

\- la provenance.

Validation expérimentale

Le dépôt comprend des tests autonomes portant sur différents composants de la base de connaissances.

Les travaux récents comportent notamment des tests sur :

\- l'identité documentaire ;

\- la provenance des fragments ;

\- les sections vides ;

\- les termes correspondants ;

\- les scores de récupération ;

\- la couverture distincte ;

\- la centralité des titres ;

\- la pertinence relative ;

\- la complémentarité des connaissances ;

\- la contribution d'un fragment à la couverture globale.

Les nouveaux tests associés à cette évolution ont été exécutés indépendamment avant leur intégration au dépôt.

Séparation des responsabilités dans l'écosystème PPS

L'écosystème est conçu pour séparer plusieurs fonctions :

PPS-KnowledgeBase

\- structuration, provenance, indexation, classement et préparation des connaissances.

PPS-Maroc.ia-V2

\- traitement documentaire et cognitif, orchestration de l'exécution et intégration des modèles d'IA.

PPS-AI-Workspace

\- interface utilisateur et orchestration des conversations.

Cette séparation permet de tester et de faire évoluer chaque couche indépendamment.

Données documentaires

Le code public du projet est séparé d'une partie des corpus documentaires de travail.

Certains corpus utilisés pendant le développement et l'expérimentation peuvent rester hors du dépôt public. Le dépôt GitHub est principalement destiné à présenter l'architecture, les mécanismes de traitement et les tests associés.

Statut

PPS-KnowledgeBase est un projet expérimental en développement actif.

Il est utilisé pour étudier des mécanismes de structuration, de provenance, de récupération et de sélection des connaissances destinés à des systèmes d'intelligence artificielle.

Auteur

Abdelkader Azzouzi

Chercheur indépendant en intelligence artificielle - Maroc



