const getCommandes = async () => {
    const res = await fetch("/api/commandes");
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const getCommande = async (_id) => {
    const res = await fetch(`/api/commandes/${_id}`);
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const createCommande = async (formData) => {
    const res = await fetch("/api/commandes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const updateCommande = async (_id, formData) => {
    const res = await fetch(`/api/commandes/${_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const deleteCommande = async (_id) => {
    const res = await fetch(`/api/commandes/${_id}`, {
      method: "DELETE",
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  export {
    getCommandes, getCommande, createCommande, updateCommande, deleteCommande
  };