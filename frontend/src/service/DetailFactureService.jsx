const getDetailFactures = async () => {
    const res = await fetch("/api/detail-factures");
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const getDetailFacture = async (_id) => {
    const res = await fetch(`/api/detail-factures/${_id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const createDetailFacture = async (formData) => {
    const res = await fetch("/api/detail-factures", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const updateDetailFacture = async (_id, formData) => {
    const res = await fetch(`/api/detail-factures/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const deleteDetailFacture = async (_id) => {
    const res = await fetch(`/api/detail-factures/${_id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };

  export { getDetailFactures, getDetailFacture, createDetailFacture, updateDetailFacture, deleteDetailFacture };
