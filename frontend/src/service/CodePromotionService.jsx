const getCodePromotions = async () => {
    const res = await fetch("/api/codePromotions");
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const getCodePromotion = async (_id) => {
    const res = await fetch(`/api/codePromotions/${_id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };

  const getCodePromotionByCode = async (code) => {
    const res = await fetch(`/api/codePromotions/code/${code}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || "Erreur inconnue");
    }
    return data;
  };

  
  const createCodePromotion = async (formData) => {
    const res = await fetch("/api/codePromotions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const updateCodePromotion = async (_id, formData) => {
    const res = await fetch(`/api/codePromotions/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };
  
  const deleteCodePromotion = async (_id) => {
    const res = await fetch(`/api/codePromotions/${_id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return res.ok ? res.json() : Promise.reject(res.json());
  };

  export { getCodePromotions, getCodePromotion, getCodePromotionByCode, createCodePromotion, updateCodePromotion, deleteCodePromotion };