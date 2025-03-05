const getEtatCommandes = async () => {
    const res = await fetch("/api/etatCommandes");
    return res.ok ? res.json() : Promise.reject(res.json());
};

const getStatusDrives = async () => {
    const res = await fetch("/api/statusDrives");
    return res.ok ? res.json() : Promise.reject(res.json());
};

const getStatusProduits = async () => {
    const res = await fetch("/api/statusProduits");
    return res.ok ? res.json() : Promise.reject(res.json());
};
export { getEtatCommandes, getStatusDrives, getStatusProduits };