import Legal from "./Legal";

const CGV = () => {  
  const data = [
    { titre: "1. Objet",
      contenu: (
        <p>
          Les présentes conditions générales de vente (CGV) régissent les relations contractuelles entre la société Primacop International Business et tout client effectuant un achat via le site <strong>https://vendora-app.vercel.app</strong>.
        </p>
      ),
    },
    {
      titre: "2. Produits",
      contenu: (
        <p>
          Les produits proposés à la vente sont ceux décrits sur le site{" "}
          <strong>https://vendora-app.vercel.app</strong>. La société apporte le plus grand soin à la présentation de ces produits. Toutefois, des erreurs ou omissions peuvent survenir.
        </p>
      ),
    },
    {
      titre: "3. Commandes",
      contenu: (
        <p>
          Le client peut passer commande en ligne à partir du catalogue en ligne. Toute commande vaut acceptation des prix et descriptions des produits disponibles à la vente.
        </p>
      ),
    },
    {
      titre: "4. Prix",
      contenu: (
        <p>
          Les prix sont indiqués en dinars tunisiens (TND), toutes taxes comprises (TTC). La société se réserve le droit de modifier ses prix à tout moment.
        </p>
      ),
    },
    {
      titre: "5. Paiement",
      contenu: (
        <p>
          Le règlement des achats s&apos;effectue en ligne par carte bancaire ou tout autre moyen proposé sur le site. Le paiement est exigible immédiatement.
        </p>
      ),
    },
    {
      titre: "6. Livraison",
      contenu: (
        <p>
          Les livraisons sont assurées en Tunisie. Les délais de livraison sont donnés à titre indicatif. Un retard ne peut entraîner l&apos;annulation de la commande.
        </p>
      ),
    },
    {
      titre: "7. Rétractation",
      contenu: (
        <p>
          Conformément à la législation tunisienne, le client dispose d&apos;un délai de 10 jours à compter de la réception de sa commande pour exercer son droit de rétractation.
        </p>
      ),
    },
    {
      titre: "8. Garanties et retours",
      contenu: (
        <p>
          Les produits bénéficient des garanties légales de conformité. Tout retour devra être signalé au préalable à l’adresse{" "}
          <strong>vendora.shop.contact@gmail.com</strong>.
        </p>
      ),
    },
    {
      titre: "9. Données personnelles",
      contenu: (
        <p>
          Les données personnelles collectées sont nécessaires au traitement des commandes et à la gestion des relations commerciales. Voir la politique de confidentialité.
        </p>
      ),
    },
    {
      titre: "10. Loi applicable et litiges",
      contenu: (
        <p>
          Les présentes CGV sont soumises à la loi tunisienne. En cas de litige, une solution amiable sera recherchée avant toute action judiciaire.
        </p>
      ),
    },
  ];

  return (
    <Legal titre={"Conditions Générales de Vente"} data={data} />
  );
};

export default CGV;