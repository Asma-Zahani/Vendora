const getAdmins = async () => {
    const res = await fetch("/api/admins");
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const getAdmin = async (_id) => {
    const res = await fetch(`/api/admins/${_id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const createAdmin = async (formData) => {
    const res = await fetch("/api/admins", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const updateAdmin = async (_id, formData) => {
    const res = await fetch(`/api/admins/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const deleteAdmin = async (_id) => {
    const res = await fetch(`/api/admins/${_id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };

  export { getAdmins, getAdmin, createAdmin, updateAdmin, deleteAdmin };
  