const getLivraisons = async () => {
    const res = await fetch("/api/livraisons");
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const getLivraison = async (_id) => {
    const res = await fetch(`/api/livraisons/${_id}`);
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const createLivraison = async (formData) => {
    const res = await fetch("/api/livraisons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const updateLivraison = async (_id, formData) => {
    const res = await fetch(`/api/livraisons/${_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const deleteLivraison = async (_id) => {
    const res = await fetch(`/api/livraisons/${_id}`, {
      method: "DELETE",
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  export { getLivraisons, getLivraison, createLivraison, updateLivraison, deleteLivraison };
  