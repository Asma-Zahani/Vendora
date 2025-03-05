const getEtatCommandes = async () => {
    const res = await fetch("/api/etatCommandes");
    return res.ok ? res.json() : Promise.reject(res.json());
};

export { getEtatCommandes };