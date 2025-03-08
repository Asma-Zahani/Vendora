const updatePassword = async (_id, formData, token) => {
  try {
    const res = await fetch(`/api/updatePassword/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw new Error("Erreur lors de la mise à jour du mot de passe");
    }

    return await res.json();
  } catch (error) {
    console.error("Erreur:", error);
    return Promise.reject(error);
  }
};

const handleLogout = async (token, setUser, setToken) => {
  try {
    const res = await fetch("/api/logout", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });

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

export { updatePassword, handleLogout };
