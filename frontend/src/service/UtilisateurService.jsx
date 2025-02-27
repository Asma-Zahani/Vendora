const getUtilisateurs = async () => {
    const res = await fetch("/api/utilisateurs");
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const getUtilisateur = async (_id) => {
    const res = await fetch(`/api/utilisateurs/${_id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const createUtilisateur = async (formData) => {
    const res = await fetch("/api/utilisateurs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const updateUtilisateur = async (_id, formData) => {
    const res = await fetch(`/api/utilisateurs/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const deleteUtilisateur = async (_id) => {
    const res = await fetch(`/api/utilisateurs/${_id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };

  export { getUtilisateurs, getUtilisateur, createUtilisateur, updateUtilisateur, deleteUtilisateur };
  