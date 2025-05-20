const About = () => {
  return (
    <div className="my-8 p-4 max-w-6xl mx-auto text-sm text-gray-800 dark:text-gray-400">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-2 dark:text-white">NOTRE MISSION</h2>
          <p>
            Offrir à nos clients tunisiens une expérience d’achat en ligne simple, rapide et fiable. 
            <em> Nous croyons en la transparence, la qualité et la satisfaction client avant tout. </em> 
            Chaque produit que nous proposons est soigneusement sélectionné pour répondre à vos besoins quotidiens.
          </p>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2 dark:text-white">NOS HISTOIRES</h2>
          <p>
            Derrière chaque commande, il y a une histoire, une équipe dédiée et une passion pour le service. 
            Nous travaillons chaque jour pour vous garantir une livraison rapide, un service client réactif 
            et une plateforme toujours plus intuitive.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2 dark:text-white">NOTRE APPROCHE</h2>
          <p>
            Nous mettons l’accent sur l’écoute de nos clients et l’amélioration continue. 
            <em> Vos retours nous aident à évoluer, à adapter nos offres et à innover en permanence. </em> 
            Notre but est de créer une communauté fidèle et satisfaite.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2 dark:text-white">NOTRE PHILOSOPHIE</h2>
          <p>
            Chez nous, l’humain est au cœur de tout. Nous croyons qu’un service de qualité, 
            un produit fiable et une attention aux détails font toute la différence. 
            Notre philosophie repose sur l’honnêteté, le respect et l’engagement envers chaque client.
          </p>
        </div>

        <div className="flex col-span-1 md:col-span-2 bg-customLight px-6 py-4 mt-4 italic text-[#878787] dark:bg-customDark dark:text-white">
          <p className="text-4xl mr-2">“</p>
          <p className="mt-1">
            Nous ne sommes pas qu’un simple site e-commerce. Nous sommes un partenaire de confiance 
            pour tous vos achats en Tunisie. Grâce à votre soutien, nous grandissons chaque jour 
            pour mieux vous servir.
          </p>
        </div>
      </div>

      <section className="mt-16">
        <div className="px-6 py-8 mx-auto">
          <h2 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl dark:text-white">
            Notre Équipe
          </h2>

          <div className="grid gap-8 mt-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Ahmed Omer",
                title: "Directeur Général",
                image:
                  "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?ixlib=rb-1.2.1&auto=format&fit=crop&w=739&q=80",
              },
              {
                name: "Jane Doe",
                title: "Co-fondatrice",
                image:
                  "https://images.unsplash.com/photo-1516756587022-7891ad56a8cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
              },
              {
                name: "Steve Ben",
                title: "Designer UI/UX",
                image:
                  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-1.2.1&auto=format&fit=crop&w=731&q=80",
              },
            ].map((member, idx) => (
              <div key={idx} className="w-full max-w-xs text-center mx-auto">
                <img
                  className="object-cover object-center w-full h-48 mx-auto rounded-lg"
                  src={member.image}
                  alt={member.name}
                />
                <div className="mt-2">
                  <h3 className="text-lg font-medium text-gray-700 dark:text-white">{member.name}</h3>
                  <span className="mt-1 font-medium text-gray-600 dark:text-gray-400">{member.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
