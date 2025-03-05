const getCommandesLivraisons = async () => {
    const res = await fetch("/api/commandeLivraisons");
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const getCommandeLivraison = async (_id) => {
    const res = await fetch(`/api/commandeLivraisons/${_id}`);
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const createCommandeLivraison = async (formData) => {
    const res = await fetch("/api/commandeLivraisons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const updateCommandeLivraison = async (_id, formData) => {
    const res = await fetch(`/api/commandeLivraisons/${_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const deleteCommandeLivraison = async (_id) => {
    const res = await fetch(`/api/commandeLivraisons/${_id}`, {
      method: "DELETE",
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  export { getCommandesLivraisons, getCommandeLivraison, createCommandeLivraison, updateCommandeLivraison, deleteCommandeLivraison };
  