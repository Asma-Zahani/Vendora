const getCategories = async () => {
    const res = await fetch("/api/categories");
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const getCategorie = async (_id) => {
    const res = await fetch(`/api/categories/${_id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const createCategorie = async (formData) => {
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const updateCategorie = async (_id, formData) => {
    const res = await fetch(`/api/categories/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const deleteCategorie = async (_id) => {
    const res = await fetch(`/api/categories/${_id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  export { getCategories, getCategorie, createCategorie, updateCategorie, deleteCategorie };