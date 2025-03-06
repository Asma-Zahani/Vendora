
  
const updatePassword = async (_id, formData) => {
    const res = await fetch(`/api/updatePassword/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });
    console.log(res);
    
    return res.ok ? res.json() : Promise.reject(res.json());
};
  
export { updatePassword };