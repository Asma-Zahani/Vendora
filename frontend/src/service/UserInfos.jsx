const regions = [
    "Ariana", "Béja", "Ben Arous", "Bizerte", "Gabès", "Gafsa", "Jendouba", "Kairouan", 
    "Kasserine", "Kébili", "Le Kef", "Mahdia", "Manouba", "Médenine", "Monastir", "Nabeul", 
    "Sfax", "Sidi Bouzid", "Siliana", "Sousse", "Tataouine", "Tozeur", "Tunis", "Zaghouan"
];

const villes = {
    "Ariana": ["Ariana Ville", "Ettadhamen", "Kalâat el-Andalous", "La Soukra", "Mnihla", "Raoued", "Sidi Thabet"],
    "Béja": ["Béja Ville", "Amdoun", "Goubellat", "Medjez el-Bab", "Nefza", "Téboursouk", "Testour"],
    "Ben Arous": ["Ben Arous", "Bou Mhel el-Bassatine", "El Mourouj", "Ezzahra", "Fouchana", "Hammam Chott", "Hammam Lif", "Mohamedia", "Mornag", "Radès"],
    "Bizerte": ["Bizerte", "Mateur", "Ras Jebel", "Menzel Bourguiba", "Ghar El Melh", "Joumine", "Sejnane"],
    "Gabès": ["Gabès Ville", "Mareth", "Matmata", "Métouia", "El Hamma", "Ghannouch", "Nouvelle Matmata"],
    "Gafsa": ["Gafsa Ville", "Métlaoui", "Mdhilla", "Redeyef", "El Guettar", "Sned"],
    "Jendouba": ["Jendouba Ville", "Aïn Draham", "Bou Salem", "Fernana", "Tabarka"],
    "Kairouan": ["Kairouan Ville", "Sbikha", "Haffouz", "Nasrallah", "Hajeb El Ayoun"],
    "Kasserine": ["Kasserine Ville", "Fériana", "Thala", "Sbiba", "Sbeitla"],
    "Kébili": ["Kébili Ville", "Douz", "Souk Lahad", "El Faouar"],
    "Le Kef": ["Le Kef Ville", "Dahmani", "Jérissa", "Sakiet Sidi Youssef"],
    "Mahdia": ["Mahdia Ville", "Chebba", "Rejiche", "Ksour Essef", "El Jem"],
    "Manouba": ["Manouba", "Douar Hicher", "Oued Ellil", "Tebourba"],
    "Médenine": ["Médenine Ville", "Zarzis", "Djerba Midoun", "Djerba Houmt Souk", "Ben Guerdane"],
    "Monastir": ["Monastir Ville", "Jemmal", "Ksibet el-Médiouni", "Moknine", "Téboulba", "Sahline"],
    "Nabeul": ["Nabeul Ville", "Hammamet", "Korba", "Kelibia", "Soliman", "Menzel Temime"],
    "Sfax": ["Sfax Ville", "El Amra", "Agareb", "Bir Ali Ben Khalifa", "Mahrès", "Skhira"],
    "Sidi Bouzid": ["Sidi Bouzid Ville", "Regueb", "Jilma", "Meknassy", "Mezzouna"],
    "Siliana": ["Siliana Ville", "Bargou", "Gaâfour", "Makthar", "El Krib"],
    "Sousse": ["Sousse Ville", "Msaken", "Akouda", "Hammam Sousse", "Kalaa Kebira", "Kalaa Sghira"],
    "Tataouine": ["Tataouine Ville", "Bir Lahmar", "Ghomrassen", "Remada"],
    "Tozeur": ["Tozeur Ville", "Degache", "Nefta", "Tamerza"],
    "Tunis": ["Tunis Ville", "Le Bardo", "La Marsa", "Carthage", "El Menzah", "El Omrane", "Le Kram"],
    "Zaghouan": ["Zaghouan Ville", "El Fahs", "Bir Mcherga", "Nadhour"]
};

const emplois = ["Employé", "Sans emploi", "Retraité", "Indépendant"];

const housingTypes = ["Appartement", "Maison individuelle", "Hébergement"];

const occupancyStatuses = ["Propriétaire", "Locataire", "Hébergé à titre gratuit"];

export { regions, villes, emplois, housingTypes, occupancyStatuses };
