const getFactures = async () => {
    const res = await fetch("/api/factures");
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const getFacture = async (_id) => {
    const res = await fetch(`/api/factures/${_id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const createFacture = async (formData) => {
    const res = await fetch("/api/factures", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const updateFacture = async (_id, formData) => {
    const res = await fetch(`/api/factures/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const deleteFacture = async (_id) => {
    const res = await fetch(`/api/factures/${_id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };

  export { getFactures, getFacture, createFacture, updateFacture, deleteFacture };
  