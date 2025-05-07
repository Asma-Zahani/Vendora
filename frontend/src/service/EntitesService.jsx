const getEntities = async (label, currentPage, selectedItemPerPage, search, sortBy, sortOrder, filtreObj) => {
  const params = new URLSearchParams();

  if (currentPage) params.append("page", currentPage);
  if (selectedItemPerPage) params.append("per_page", selectedItemPerPage);
  if (search) params.append("search", search);
  if (sortBy) params.append("sort_by", sortBy);
  if (sortOrder) params.append("sort_order", sortOrder);
  
  if (filtreObj) {
    Object.entries(filtreObj).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((val) => params.append(`filtre[${key}][]`, val));
      } else {
        params.append(`filtre[${key}]`, value);
      }
    });
  }

  const url = `${import.meta.env.VITE_API_URL}/${label}${params.toString() ? "?" + params.toString() : ""}`;
  const response = await fetch(url);
  
  return await response.json();
};

const getAuthenticatedEntities = async (label) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/${label}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  });
  return await response.json();
};

const getEntity = async (label, _id) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/${label}/${_id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  });
  return await response.json();
};

const getEntityBy = async (label, by, _id) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/${label}/${by}/${_id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  });
  return await response.json();
};
  
const createEntity = async (label, formData) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/${label}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(formData)
  });

  return await response.json();
};

const updateEntity = async (label, _id, formData) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/${label}/${_id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(formData)
  });

  return await response.json();
};
  
const deleteEntity = async (label, _id, formData) => {
  const url = _id ? `${import.meta.env.VITE_API_URL}/${label}/${_id}` : `${import.meta.env.VITE_API_URL}/${label}`;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(formData)
  });

  return await response.json();
};

const handleLogout = async (setUser, setToken) => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/logout`, {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    console.log(res);
    
    if (res.ok) {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
    } else {
      console.error("Échec de la déconnexion");
    }
  } catch (error) {
    console.error("Erreur lors de la déconnexion:", error);
  }
};

const getRecommandations = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_RECOMMANDATION_API_URL}/recommander-produits`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(id ? { user_id: id }: {}),
  });

  return await response.json();
};

export { getEntities, getAuthenticatedEntities, getEntity, getEntityBy, createEntity, updateEntity, deleteEntity, handleLogout, getRecommandations };