import Legal from './Legal';

const CGU = () => {
  const data = [
    { titre: "1. Objet",
      contenu: (
        <p>
          Les présentes Conditions Générales d’Utilisation (CGU) ont pour objet de définir les modalités de mise à disposition des services du site <strong>https://vendora-app.vercel.app</strong> et les conditions d’utilisation du site par l’utilisateur.
        </p>
      ),
    },
    { titre: "2. Acceptation des CGU",
      contenu: (
        <p>
          L’accès et l’utilisation du site impliquent l’acceptation sans réserve des présentes CGU par l’utilisateur. En cas de désaccord avec les CGU, l’utilisateur doit immédiatement cesser l’utilisation du site.
        </p>
      ),
    },
    { titre: "3. Accès au site",
      contenu: (
        <p>
          Le site est accessible gratuitement à tout utilisateur disposant d’un accès à internet. Tous les coûts relatifs à l’accès au site (matériel, logiciels, connexion internet) sont à la charge de l’utilisateur.
        </p>
      ),
    },
    { titre: "4. Compte utilisateur",
      contenu: (
        <p>
          La création d’un compte utilisateur peut être requise pour accéder à certains services. L’utilisateur s’engage à fournir des informations exactes lors de son inscription et à mettre à jour ses données personnelles.
        </p>
      ),
    },
    { titre: "5. Comportement de l’utilisateur",
      contenu: (
        <p>
          L’utilisateur s’engage à utiliser le site dans le respect des lois en vigueur, à ne pas porter atteinte à l’ordre public ou aux droits des tiers, et à ne pas tenter d’altérer le fonctionnement du site.
        </p>
      ),
    },
    { titre: "6. Propriété intellectuelle",
      contenu: (
        <p>
          Tous les éléments du site (textes, images, logos, etc.) sont protégés par le droit d’auteur et restent la propriété exclusive de Primacop International Business. Toute reproduction ou représentation sans autorisation est interdite.
        </p>
      ),
    },
    { titre: "7. Responsabilité",
      contenu: (
        <p>
          L’éditeur s’efforce de maintenir le site accessible en permanence, mais ne peut garantir une disponibilité absolue. L’éditeur ne peut être tenu responsable des dommages indirects liés à l’utilisation du site.
        </p>
      ),
    },
    { titre: "8. Modification des CGU",
      contenu: (
        <p>
          Vendora se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs sont invités à les consulter régulièrement.
        </p>
      ),
    },
    { titre: "9. Droit applicable",
      contenu: (
        <p>
          Les présentes CGU sont régies par la législation tunisienne. En cas de litige, les tribunaux tunisiens seront seuls compétents.
        </p>
      ),
    },
  ];

  return (
    <Legal titre={"Conditions Générales d'Utilisation"} data={data} />
  );
};

export default CGU;