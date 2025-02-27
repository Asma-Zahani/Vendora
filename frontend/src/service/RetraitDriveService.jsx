const getRetraitDrives = async () => {
    const res = await fetch("/api/retraits-drive");
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const getRetraitDrive = async (_id) => {
    const res = await fetch(`/api/retraits-drive/${_id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const createRetraitDrive = async (formData) => {
    const res = await fetch("/api/retraits-drive", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const updateRetraitDrive = async (_id, formData) => {
    const res = await fetch(`/api/retraits-drive/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const deleteRetraitDrive = async (_id) => {
    const res = await fetch(`/api/retraits-drive/${_id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };

  export { getRetraitDrives, getRetraitDrive, createRetraitDrive, updateRetraitDrive, deleteRetraitDrive };
  