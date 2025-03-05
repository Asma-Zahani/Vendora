const getCommandesRetraitDrives = async () => {
    const res = await fetch("/api/commandeRetraitDrives");
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const getCommandeRetraitDrive = async (_id) => {
    const res = await fetch(`/api/commandeRetraitDrives/${_id}`);
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const createCommandeRetraitDrive = async (formData) => {
    const res = await fetch("/api/commandeRetraitDrives", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}` 
      },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const updateCommandeRetraitDrive = async (_id, formData) => {
    const res = await fetch(`/api/commandeRetraitDrives/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}` 
      },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const deleteCommandeRetraitDrive = async (_id) => {
    const res = await fetch(`/api/commandeRetraitDrives/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}` 
      },
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  export {
    getCommandesRetraitDrives, getCommandeRetraitDrive, createCommandeRetraitDrive, updateCommandeRetraitDrive, deleteCommandeRetraitDrive
  };