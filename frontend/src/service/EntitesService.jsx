const getEntities = async (label, currentPage, selectedItemPerPage, search, sortBy, sortOrder, filtreObj) => {
  const params = new URLSearchParams();

  if (currentPage) params.append("page", currentPage);
  if (selectedItemPerPage) params.append("per_page", selectedItemPerPage);
  if (search) params.append("search", search);
  if (sortBy) params.append("sort_by", sortBy);
  if (sortOrder) params.append("sort_order", sortOrder);
  // if (filtre) params.append("filtre_column", filtre[0]);
  // if (filtre) params.append("filtre_text", filtre[1]);
  
  if (filtreObj) {
    Object.entries(filtreObj).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        // Si c'est un tableau, ajouter plusieurs fois la clé
        value.forEach((val) => params.append(`filtre[${key}][]`, val));
      } else {
        params.append(`filtre[${key}]`, value);
      }
    });
  }

  const url = `/api/${label}${params.toString() ? "?" + params.toString() : ""}`;
  const response = await fetch(url);
  
  return await response.json();
};

const getAuthenticatedEntities = async (label) => {
  const response = await fetch(`/api/${label}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  });
  return await response.json();
};

const getEntity = async (label, _id) => {
  const response = await fetch(`/api/${label}/${_id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  });
  return await response.json();
};

const getEntityBy = async (label, by, _id) => {
  const response = await fetch(`/api/${label}/${by}/${_id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  });
  return await response.json();
};
  
const createEntity = async (label, formData) => {
  const response = await fetch(`api/${label}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(formData)
  });

  return await response.json();
};

const updateEntity = async (label, _id, formData) => {
  const response = await fetch(`/api/${label}/${_id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(formData)
  });

  return await response.json();
};
  
const deleteEntity = async (label, _id) => {
  const response = await fetch(`/api/${label}/${_id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  });

  return await response.json();
};

export { getEntities, getAuthenticatedEntities, getEntity, getEntityBy, createEntity, updateEntity, deleteEntity };