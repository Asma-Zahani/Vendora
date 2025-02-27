const getFactureCommandes = async () => {
    const res = await fetch("/api/factures-commandes");
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const getFactureCommande = async (_id) => {
    const res = await fetch(`/api/factures-commandes/${_id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const createFactureCommande = async (formData) => {
    const res = await fetch("/api/factures-commandes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const updateFactureCommande = async (_id, formData) => {
    const res = await fetch(`/api/factures-commandes/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const deleteFactureCommande = async (_id) => {
    const res = await fetch(`/api/factures-commandes/${_id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };


  export {
    getFactureCommandes, getFactureCommande, createFactureCommande, updateFactureCommande, deleteFactureCommande
  };
  