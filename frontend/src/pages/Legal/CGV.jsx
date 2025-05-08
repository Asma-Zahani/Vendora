const CGV = () => {
  const sections = [
    {
      titre: "1. Objet",
      contenu: `Les présentes conditions générales de vente (CGV) régissent les relations contractuelles entre la société Primacop International Business et tout client effectuant un achat via le site www.kdmarche.com.`
    },
    {
      titre: "2. Produits",
      contenu: `Les produits proposés à la vente sont ceux décrits sur le site www.kdmarche.com. La société apporte le plus grand soin à la présentation de ces produits. Toutefois, des erreurs ou omissions peuvent survenir.`
    },
    {
      titre: "3. Commandes",
      contenu: `Le client peut passer commande en ligne à partir du catalogue en ligne. Toute commande vaut acceptation des prix et descriptions des produits disponibles à la vente.`
    },
    {
      titre: "4. Prix",
      contenu: `Les prix sont indiqués en dinars tunisiens (TND), toutes taxes comprises (TTC). La société se réserve le droit de modifier ses prix à tout moment.`
    },
    {
      titre: "5. Paiement",
      contenu: `Le règlement des achats s'effectue en ligne par carte bancaire ou tout autre moyen proposé sur le site. Le paiement est exigible immédiatement.`
    },
    {
      titre: "6. Livraison",
      contenu: `Les livraisons sont assurées en Tunisie. Les délais de livraison sont donnés à titre indicatif. Un retard ne peut entraîner l'annulation de la commande.`
    },
    {
      titre: "7. Rétractation",
      contenu: `Conformément à la législation tunisienne, le client dispose d'un délai de 10 jours à compter de la réception de sa commande pour exercer son droit de rétractation.`
    },
    {
      titre: "8. Garanties et retours",
      contenu: `Les produits bénéficient des garanties légales de conformité. Tout retour devra être signalé au préalable à l’adresse contact@kdmarche.com.`
    },
    {
      titre: "9. Données personnelles",
      contenu: `Les données personnelles collectées sont nécessaires au traitement des commandes et à la gestion des relations commerciales. Voir la politique de confidentialité.`
    },
    {
      titre: "10. Loi applicable et litiges",
      contenu: `Les présentes CGV sont soumises à la loi tunisienne. En cas de litige, une solution amiable sera recherchée avant toute action judiciaire.`
    }
  ];

  return (
    <div className="my-8 p-4 max-w-5xl mx-auto text-sm text-gray-800">
      <h1 className="text-center text-3xl font-bold mb-6 text-purpleLight">Conditions Générales de Vente</h1>
      {sections.map((section, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-xl font-semibold text-purpleLight mb-2">{section.titre}</h2>
          <p>{section.contenu}</p>
        </div>
      ))}
    </div>
  );
};

export default CGV;