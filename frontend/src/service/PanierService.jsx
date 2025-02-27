const getPaniers = async () => {
    const res = await fetch("/api/paniers");
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const getPanier = async (_id) => {
    const res = await fetch(`/api/paniers/${_id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const createPanier = async (formData) => {
    const res = await fetch("/api/paniers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const updatePanier = async (_id, formData) => {
    const res = await fetch(`/api/paniers/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const deletePanier = async (_id) => {
    const res = await fetch(`/api/paniers/${_id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };

  export { getPaniers, getPanier, createPanier, updatePanier, deletePanier };
  