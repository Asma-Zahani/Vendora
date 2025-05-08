const Mentions = () => {
  const data = [
    { titre: "1. Éditeur du site",
      contenu: (
        <>
          <p>
            Le site <strong>www.kdmarche.com</strong> est édité par <strong>Primacop International Business</strong>, 
            entreprise individuelle immatriculée au Registre National des Entreprises (RNE) en Tunisie.
          </p>
          <p>
            Siège social : chemin Symphart Lampecinado, Morne-Bourg, 97170 PETIT-BOURG<br />
            Matricule fiscal : [À compléter]<br />
            Téléphone : +59 0 60 79 46 (prix d&apos;un appel local)<br />
            Email : contact@kdmarche.com
          </p>
        </>
      ),
    },
    { titre: "2. Directeur de la publication",
      contenu: (
        <p>
          La directrice de la publication est <strong>Félixia PIPEROL</strong>, en qualité de gérante de Primacop International Business.
        </p>
      ),
    },
    { titre: "3. Hébergement",
      contenu: (
        <p>
          Le site est actuellement en cours de test d&apos;hébergement sur les plateformes <strong>Vercel</strong> et <strong>Railway</strong>. 
          Aucun hébergeur définitif n&apos;est désigné à ce jour.
        </p>
      ),
    },
    { titre: "4. Données personnelles",
      contenu: (
        <p>
          Conformément à la <strong>loi n°2004-63 du 27 juillet 2004</strong> relative à la protection des données personnelles en Tunisie, 
          l&apos;utilisateur dispose d&apos;un droit d&apos;accès, de modification, de rectification et de suppression des données qui le concernent. 
          Ce droit peut être exercé par email à : contact@kdmarche.com.
        </p>
      ),
    },
    { titre: "5. Propriété intellectuelle",
      contenu: (
        <p>
          L&apos;ensemble des contenus du site (textes, images, logos, éléments graphiques, etc.) sont la propriété exclusive de 
          Primacop International Business, sauf mentions contraires, et sont protégés par la législation tunisienne et 
          internationale sur la propriété intellectuelle.
        </p>
      ),
    },
  ];

  return (
    <div className="my-8 p-4 max-w-7xl mx-auto text-sm text-gray-800">
      <h1 className="flex justify-center text-3xl font-bold mb-4 text-purpleLight">Mentions légales</h1>
      {data.map((item, index) => (
        <div key={index} className="mb-6">
          <h2 className="font-semibold my-4 text-purpleLight text-xl">{item.titre}</h2>
          <div className="space-y-2">{item.contenu}</div>
        </div>
      ))}
    </div>
  );
};

export default Mentions;