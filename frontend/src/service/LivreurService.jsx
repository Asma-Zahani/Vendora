const getLivreurs = async () => {
    const res = await fetch("/api/livreurs");
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const getLivreur = async (_id) => {
    const res = await fetch(`/api/livreurs/${_id}`);
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const createLivreur = async (formData) => {
    const res = await fetch("/api/livreurs", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const updateLivreur = async (_id, formData) => {
    const res = await fetch(`/api/livreurs/${_id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const deleteLivreur = async (_id) => {
    const res = await fetch(`/api/livreurs/${_id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  // Exportation des fonctions
  export {
    getLivreurs,
    getLivreur,
    createLivreur,
    updateLivreur,
    deleteLivreur,
  };