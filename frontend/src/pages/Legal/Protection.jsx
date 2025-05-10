import Legal from './Legal';

const Protection = () => {
  const data = [
    { titre: "1. Responsable du traitement",
      contenu: (
        <p>
          Le site <strong>https://vendora-app.vercel.app</strong> est édité par <strong>Primacop International Business</strong>, 
          entreprise individuelle, qui agit en tant que responsable du traitement des données personnelles collectées.
        </p>
      ),
    },
    { titre: "2. Données collectées",
      contenu: (
        <p>
          Lors de votre utilisation du site, nous pouvons collecter les données suivantes : nom, prénom, adresse email, 
          adresse IP, données de navigation, historique de commande, messages envoyés via les formulaires de contact, etc.
        </p>
      ),
    },
    { titre: "3. Finalités des traitements",
      contenu: (
        <p>
          Vos données sont collectées pour les finalités suivantes : gestion des commandes, amélioration du service, envoi 
          d’emails promotionnels, réponse aux demandes des utilisateurs, sécurité du site, et statistiques.
        </p>
      ),
    },
    { titre: "4. Base légale",
      contenu: (
        <p>
          Le traitement de vos données repose sur l’exécution du contrat, votre consentement, nos obligations légales ou 
          notre intérêt légitime à améliorer nos services.
        </p>
      ),
    },
    { titre: "5. Destinataires des données",
      contenu: (
        <p>
          Vos données peuvent être partagées avec nos prestataires techniques (hébergeurs, fournisseurs de paiement, etc.) 
          dans le strict respect de la législation applicable.
        </p>
      ),
    },
    { titre: "6. Durée de conservation",
      contenu: (
        <p>
          Les données sont conservées pour une durée strictement nécessaire aux finalités du traitement, augmentée des délais 
          légaux de prescription applicables.
        </p>
      ),
    },
    { titre: "7. Vos droits",
      contenu: (
        <p>
          Conformément à la loi tunisienne n°2004-63 relative à la protection des données, vous disposez d’un droit d’accès, 
          de rectification, d’opposition, d’effacement, et de portabilité de vos données. Vous pouvez exercer ces droits en 
          nous contactant à l’adresse suivante : <strong>vendora.shop.contact@gmail.com</strong>.
        </p>
      ),
    },
    { titre: "8. Sécurité",
      contenu: (
        <p>
          Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre 
          toute perte, altération ou accès non autorisé.
        </p>
      ),
    },
    { titre: "9. Cookies",
      contenu: (
        <p>
          Le site utilise des cookies à des fins de fonctionnement, de mesure d’audience, et de personnalisation. Vous pouvez 
          gérer vos préférences dans votre navigateur ou via le bandeau cookies du site.
        </p>
      ),
    },
  ];

  return (
    <Legal titre={"Protection des données personnelles"} data={data} />
  );
};

export default Protection;