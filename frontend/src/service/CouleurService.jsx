const getCouleurs = async () => {
    const res = await fetch("/api/couleurs");
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const getCouleur = async (_id) => {
    const res = await fetch(`/api/couleurs/${_id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const createCouleur = async (formData) => {
    const res = await fetch("/api/couleurs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const updateCouleur = async (_id, formData) => {
    const res = await fetch(`/api/couleurs/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const deleteCouleur = async (_id) => {
    const res = await fetch(`/api/couleurs/${_id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  export { getCouleurs, getCouleur, createCouleur, updateCouleur, deleteCouleur };