const getProduits = async () => {
    const res = await fetch("/api/produits");
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const getProduit = async (_id) => {
    const res = await fetch(`/api/produits/${_id}`);
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const createProduit = async (formData) => {
    const res = await fetch("/api/produits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const updateProduit = async (_id, formData) => {
    const res = await fetch(`/api/produits/${_id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const deleteProduit = async (_id) => {
    const res = await fetch(`/api/produits/${_id}`, {
      method: "DELETE",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };

  export { getProduits, getProduit, createProduit, updateProduit, deleteProduit }; 