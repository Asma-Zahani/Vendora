const getHoraires = async () => {
    const res = await fetch("/api/horaires");
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const getHoraire = async (_id) => {
    const res = await fetch(`/api/horaires/${_id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const createHoraire = async (formData) => {
    const res = await fetch("/api/horaires", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const updateHoraire = async (_id, formData) => {
    const res = await fetch(`/api/horaires/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const deleteHoraire = async (_id) => {
    const res = await fetch(`/api/horaires/${_id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };

  export { getHoraires, getHoraire, createHoraire, updateHoraire, deleteHoraire };
  