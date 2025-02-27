const getMarques = async () => {
    const res = await fetch("/api/marques");
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const getMarque = async (_id) => {
    const res = await fetch(`/api/marques/${_id}`);
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const createMarque = async (formData) => {
    const res = await fetch("/api/marques", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
  };
  
  const updateMarque = async (_id, formData) => {
    const res = await fetch(`/api/marques/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const deleteMarque = async (_id) => {
    const res = await fetch(`/api/marques/${_id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  export {
    getMarques, getMarque, createMarque, updateMarque, deleteMarque
  };
  