import Legal from "./Legal";

const Mentions = () => {
  const data = [
    { titre: "1. Éditeur du site",
      contenu: (
        <>
          <p>
            Le site <strong>https://vendora-app.vercel.app</strong> est édité par <strong>Primacop International Business</strong>, 
            entreprise individuelle immatriculée au Registre National des Entreprises (RNE) en Tunisie.
          </p>
          <p>
            Siège social : chemin Symphart Lampecinado, Morne-Bourg, 97170 PETIT-BOURG<br />
            Matricule fiscal : [À compléter]<br />
            Téléphone : +59 0 60 79 46 (prix d&apos;un appel local)<br />
            Email : vendora.shop.contact@gmail.com
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
          Ce droit peut être exercé par email à : vendora.shop.contact@gmail.com.
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
    <Legal titre={"Mentions légales"} data={data} />
  );
};

export default Mentions;