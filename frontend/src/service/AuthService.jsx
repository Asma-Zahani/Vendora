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

export { handleLogout };
