const getFournisseurs = async () => {
    const res = await fetch("/api/fournisseurs");
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const getFournisseur = async (_id) => {
    const res = await fetch(`/api/fournisseurs/${_id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const createFournisseur = async (formData) => {
    const res = await fetch("/api/fournisseurs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const updateFournisseur = async (_id, formData) => {
    const res = await fetch(`/api/fournisseurs/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const deleteFournisseur = async (_id) => {
    const res = await fetch(`/api/fournisseurs/${_id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };

  export { getFournisseurs, getFournisseur, createFournisseur, updateFournisseur, deleteFournisseur };
  