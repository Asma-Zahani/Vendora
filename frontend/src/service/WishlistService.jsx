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
export { addToWishlist, deleteFromWishlist };