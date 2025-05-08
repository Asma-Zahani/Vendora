const Confidentialite = () => {
  const sections = [
    {
      titre: "Introduction",
      contenu: (
        <>
          <p>
            Les informations suivantes vous sont communiquées afin que vous puissiez prendre connaissance des engagements en matière de protection des données à caractère personnel de la société <strong>Primacop International Business</strong> - chemin Symphart Lampecinado, Morne-Bourg, 97170 PETIT-BOURG qui agit en tant que responsable du traitement.
          </p>
          <p>
            L&apos;enseigne <strong>Kdmarche</strong> s&apos;engage à respecter des normes élevées en matière de déontologie et de protection des données à caractère personnel.
          </p>
          <p>
            Sur le site <strong>https://kdmarche.com/</strong>, Kdmarche traite des données à caractère personnel en tant que responsable du traitement. Son identité est précisée dans la rubrique « mentions légales ».
          </p>
          <p>
            Cette politique a pour objectif de vous informer sur la manière dont vos données sont traitées et sur vos droits.
          </p>
        </>
      )
    },
    {
      titre: "1. Bases légales et finalités des traitements",
      contenu: (
        <>
          <p>L&apos;enseigne Kdmarche fonde ses traitements sur : l&apos;exécution contractuelle, le consentement, les obligations légales et son intérêt légitime.</p>
          <p>Finalités basées sur l&apos;intérêt légitime :</p>
          <ul className="list-disc list-inside ml-4">
            <li>gestion des demandes et réclamations</li>
            <li>constitution de preuves</li>
            <li>gestion des cookies non soumis à consentement</li>
            <li>lutte contre la fraude</li>
            <li>détection préventive des incidents de sécurité</li>
          </ul>
          <p>Tout nouveau traitement fera l&apos;objet d&apos;une information complémentaire.</p>
        </>
      )
    },
    {
      titre: "2. Collecte de données",
      contenu: (
        <>
          <p>Les données collectées incluent :</p>
          <ul className="list-disc list-inside ml-4">
            <li>cookies de session et mesure d&apos;audience</li>
            <li>adresse IP</li>
            <li>date et heure de connexion</li>
            <li>données des formulaires de contact</li>
          </ul>
        </>
      )
    },
    {
      titre: "3. Personnes concernées",
      contenu: (
        <ul className="list-disc list-inside ml-4">
          <li>investisseurs et actionnaires via formulaire</li>
          <li>tous les utilisateurs du site</li>
        </ul>
      )
    },
    {
      titre: "4. Destinataires des données",
      contenu: (
        <>
          <p>Les destinataires peuvent être :</p>
          <ul className="list-disc list-inside ml-4">
            <li>services internes de Kdmarche</li>
            <li>partenaires et sous-traitants</li>
            <li>avocats, autorités judiciaires</li>
            <li>services de contrôle (auditeurs)</li>
          </ul>
        </>
      )
    },
    {
      titre: "5. Durées de conservation des données",
      contenu: (
        <p>
          Les données sont conservées pour la durée nécessaire aux finalités définies, augmentée des délais de prescription légale. Voir aussi la politique de cookies.
        </p>
      )
    },
    {
      titre: "6. Sécurité des données",
      contenu: (
        <>
          <p>
            Kdmarche met en œuvre des mesures adaptées pour assurer l&apos;intégrité, la confidentialité et la sécurité de vos données : audits, sélection rigoureuse des prestataires, clauses contractuelles de sécurité.
          </p>
          <p>
            Des engagements précis sont imposés aux sous-traitants concernant la protection des données.
          </p>
        </>
      )
    },
    {
      titre: "7. Transfert hors UE",
      contenu: (
        <p>
          Certaines données peuvent être transférées hors de l&apos;Union européenne, notamment aux États-Unis, dans le respect des clauses contractuelles types de la Commission européenne.
        </p>
      )
    },
    {
      titre: "8. Vos droits",
      contenu: (
        <>
          <p>Vous disposez des droits suivants :</p>
          <ul className="list-disc list-inside ml-4">
            <li>accès, rectification, effacement</li>
            <li>limitation, portabilité, opposition</li>
            <li>retrait du consentement à tout moment</li>
            <li>définir le sort de vos données après votre décès</li>
          </ul>
          <p>En cas de non-respect, vous pouvez adresser une réclamation à la CNIL.</p>
        </>
      )
    }
  ];

  return (
    <div className="my-8 p-4 max-w-5xl mx-auto text-sm text-gray-800">
      <h1 className="flex justify-center text-3xl font-bold mb-4 text-purpleLight">Politique de confidentialité</h1>
      {sections.map((section, index) => (
        <div key={index} className="mb-6">
          <h2 className="font-semibold my-4 text-purpleLight text-xl">{section.titre}</h2>
          <div className="space-y-2">{section.contenu}</div>
        </div>
      ))}
    </div>
  );
};

export default Confidentialite;
