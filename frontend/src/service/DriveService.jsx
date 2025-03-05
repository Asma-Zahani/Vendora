const getDrives = async () => {
    const res = await fetch("/api/drives");
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const getDrive = async (_id) => {
    const res = await fetch(`/api/drives/${_id}`);
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const createDrive = async (formData) => {
    const res = await fetch("/api/drives", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const updateDrive = async (_id, formData) => {
    const res = await fetch(`/api/drives/${_id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const deleteDrive = async (_id) => {
    const res = await fetch(`/api/drives/${_id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  // Exportation des fonctions
  export {
    getDrives,
    getDrive,
    createDrive,
    updateDrive,
    deleteDrive,
  };