const getFactureFournisseurs = async () => {
    const res = await fetch("/api/factures-fournisseurs");
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const getFactureFournisseur = async (_id) => {
    const res = await fetch(`/api/factures-fournisseurs/${_id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const createFactureFournisseur = async (formData) => {
    const res = await fetch("/api/factures-fournisseurs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const updateFactureFournisseur = async (_id, formData) => {
    const res = await fetch(`/api/factures-fournisseurs/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const deleteFactureFournisseur = async (_id) => {
    const res = await fetch(`/api/factures-fournisseurs/${_id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  export {
    getFactureFournisseurs,
    getFactureFournisseur,
    createFactureFournisseur,
    updateFactureFournisseur,
    deleteFactureFournisseur,
  };