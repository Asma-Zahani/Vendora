const getPeriodesHoraires = async () => {
    const res = await fetch("/api/PeriodesHoraires");
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const getPeriodeHoraire = async (_id) => {
    const res = await fetch(`/api/PeriodesHoraires/${_id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const createPeriodeHoraire = async (formData) => {
    const res = await fetch("/api/PeriodesHoraires", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const updatePeriodeHoraire = async (_id, formData) => {
    const res = await fetch(`/api/PeriodesHoraires/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const deletePeriodeHoraire = async (_id) => {
    const res = await fetch(`/api/PeriodesHoraires/${_id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };

  export { getPeriodesHoraires, getPeriodeHoraire, createPeriodeHoraire, updatePeriodeHoraire, deletePeriodeHoraire };
  