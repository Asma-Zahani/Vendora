const getPromotions = async () => {
    const res = await fetch("/api/promotions");
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const getPromotion = async (_id) => {
    const res = await fetch(`/api/promotions/${_id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const createPromotion = async (formData) => {
    const res = await fetch("/api/promotions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const updatePromotion = async (_id, formData) => {
    const res = await fetch(`/api/promotions/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const deletePromotion = async (_id) => {
    const res = await fetch(`/api/promotions/${_id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };

  export { getPromotions, getPromotion, createPromotion, updatePromotion, deletePromotion };
  