const getClients = async () => {
  const res = await fetch("/api/clients");
  return res.ok ? res.json() : Promise.reject(res.json());
};

const getClient = async (_id) => {
  const res = await fetch(`/api/clients/${_id}`);
  return res.ok ? res.json() : Promise.reject(res.json());
};

const createClient = async (formData) => {
  const res = await fetch("/api/clients", {
    method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    return res.ok ? res.json() : Promise.reject(res.json());
};

const updateClient = async (_id, formData) => {
  const res = await fetch(`/api/clients/${_id}`, {
    method: "PUT",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`, 
    },
    body: JSON.stringify(formData),
  });
  return res.ok ? res.json() : Promise.reject(res.json());
};

const deleteClient = async (_id) => {
  const res = await fetch(`/api/clients/${_id}`, {
    method: "DELETE",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`, 
    },
  });
  return res.ok ? res.json() : Promise.reject(res.json());
};

const addToPanier = async (formData) => {
  const res = await fetch(`/api/panier`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(formData),
  });
  return res.ok ? res.json() : Promise.reject(res.json());
};

const deleteFromPanier = async (formData) => {
  const res = await fetch(`/api/panier`, {
    method: "DELETE",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`, 
    },
    body: JSON.stringify(formData),
  });
  return res.ok ? res.json() : Promise.reject(res.json());
};

const addToWishlist = async (formData) => {
  const res = await fetch(`/api/souhait`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(formData),
  });
  return res.ok ? res.json() : Promise.reject(res.json());
};

const deleteFromWishlist = async (formData) => {
  const res = await fetch(`/api/souhait`, {
    method: "DELETE",
    headers: { 
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`, 
    },
    body: JSON.stringify(formData),
  });
  return res.ok ? res.json() : Promise.reject(res.json());
};
export { getClients, getClient, createClient, updateClient, deleteClient, addToPanier, addToWishlist, deleteFromPanier, deleteFromWishlist };