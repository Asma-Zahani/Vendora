import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Truck } from "lucide-react";
import Header from "@/components/Header/DashboardSubHeader";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { getEntities } from "@/service/EntitesService";

// Configuration de l'icône de marqueur
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

// 🔍 Fonction pour géocoder une adresse
const geocodeAdresse = async (adresse) => {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(adresse)}&format=json&limit=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
      };
    }
  } catch (error) {
    console.error("Erreur lors du géocodage :", error);
  }

  return null;
};

const AdressesLivraison = () => {
  const [adresses, setAdresses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const enCours = await getEntities("livraisonsEnCours");

        const promises = enCours.map(async (item) => {
          const client = item.client;
          let adresseComplete = client.adresse?.trim();
          console.log("Adresse complete:", adresseComplete);
          let ville = client.region?.trim();
          console.log("region:", ville);
          let fallbackAdresse = null;

          let adresseAvecPays = "Tunisie"; // Valeur par défaut

          if (adresseComplete) {
            adresseAvecPays = `${adresseComplete}, Tunisie`;
          } else if (client.ville && client.region) {
            fallbackAdresse = `${client.ville}, ${client.region}, Tunisie`;
          } else if (client.ville) {
            fallbackAdresse = `${client.ville}, Tunisie`;
          } else if (client.region) {
            fallbackAdresse = `${client.region}, Tunisie`;
          } else {
            return null; // Aucun moyen de géolocaliser
          }

          // Tentative de géocodage de l'adresse complète
          let coords = await geocodeAdresse(adresseAvecPays);
          console.log("Coords après géocodage de l'adresse complète:", coords);

          // 🔁 Si pas trouvé, tenter avec fallbackAdresse (ville ou région)
          let adresseFinale = adresseAvecPays;
          if (!coords && fallbackAdresse) {
            console.log("🌍 Utilisation de l'adresse de fallback :", fallbackAdresse);
            coords = await geocodeAdresse(fallbackAdresse);
            adresseFinale = fallbackAdresse;
          }

          // Si les coordonnées ne sont toujours pas trouvées, retourne des coordonnées par défaut (Tunis)
          if (!coords) {
            console.log("❌ Aucune correspondance trouvée, utilisation des coordonnées par défaut (Tunis)");
            coords = { lat: 36.8065, lng: 10.1815 }; // Coordonnées par défaut de Tunis
            adresseFinale = "Tunis, Tunisie"; // Adresse par défaut
          }

          return {
            id: item.id, // Ajout de l'ID de la livraison pour rendre la clé unique
            nom: `${client.nom} ${client.prenom}`,
            adresse: adresseFinale,
            lat: coords.lat,
            lng: coords.lng,
          };
        });

        const resultats = await Promise.all(promises);
        console.log("resultats:", resultats);
        setAdresses(resultats.filter(Boolean));
      } catch (error) {
        console.error("❌ Erreur lors de la récupération :", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header title="Adresses de Livraison" icon={Truck} parent="adresses" />
      <div className="h-[500px] w-full rounded-xl shadow-md overflow-hidden">
        <MapContainer center={[36.8065, 10.1815]} zoom={12} scrollWheelZoom={true} className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
          />
          {adresses.map((adresse, index) => (
            <Marker key={`${adresse.lat}-${adresse.lng}-${index}`} position={[adresse.lat, adresse.lng]}>
              <Popup>
                <strong>{adresse.nom}</strong><br />
                📍 {adresse.adresse}
              </Popup>
            </Marker>
          ))}

        </MapContainer>
      </div>
    </>
  );
};

export default AdressesLivraison;
