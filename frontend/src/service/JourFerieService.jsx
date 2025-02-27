const getJoursFeries = async () => {
    const res = await fetch("/api/joursFeries");
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const getJourFerie = async (_id) => {
    const res = await fetch(`/api/joursFeries/${_id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const createJourFerie = async (formData) => {
    const res = await fetch("/api/joursFeries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const updateJourFerie = async (_id, formData) => {
    const res = await fetch(`/api/joursFeries/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const deleteJourFerie = async (_id) => {
    const res = await fetch(`/api/joursFeries/${_id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };

  export { getJoursFeries, getJourFerie, createJourFerie, updateJourFerie, deleteJourFerie };
  