const getUsers = async () => {
  const res = await fetch("/api/users");
  return res.ok ? res.json() : Promise.reject(res.json());
};

const getClients = async () => {
  const res = await fetch("/api/clients");
  return res.ok ? res.json() : Promise.reject(res.json());
};

const getLivreurs = async () => {
  const res = await fetch("/api/livreurs");
  return res.ok ? res.json() : Promise.reject(res.json());
};

const getUser = async (_id) => {
  const res = await fetch(`/api/users/${_id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return res.ok ? res.json() : Promise.reject(res.json());
};

const createClient = async (_id, formData) => {
  const response = await fetch("api/createClient", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(formData)
  });

  return await response.json();
};

const createLivreur = async (_id, formData) => {
  const response = await fetch("api/createLivreur", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(formData)
  });

  return await response.json();
};

const updateUser = async (_id, formData) => {
  const res = await fetch(`/api/users/${_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(formData),
  });
  return res.ok ? res.json() : Promise.reject(res.json());
};

const deleteUser = async (_id) => {
  const res = await fetch(`/api/users/${_id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return res.ok ? res.json() : Promise.reject(res.json());
};

export { getUsers, getClients, getLivreurs, getUser, createClient, createLivreur, updateUser, deleteUser };