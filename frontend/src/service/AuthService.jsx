const handleRegister = async (formData) => {
  const response = await fetch(`api/register`, {
    method: "POST",
    body: JSON.stringify(formData),
  });

  return await response.json();
};

const resendVerificationEmail = async (formData) => {
  const response = await fetch(`api/email/resend`, {
    method: "POST",
    body: JSON.stringify(formData),
  });

  return await response.json();
};

const forgotPassword = async (formData) => {
  const response = await fetch(`api/forgot-password`, {
    method: "POST",
    body: JSON.stringify(formData),
  });

  return await response.json();
};

const resendForgotPasswordEmail = async (formData) => {
  const response = await fetch(`api/forgot-password/resend`, {
    method: "POST",
    body: JSON.stringify(formData),
  });

  return await response.json();
};

const resetPassword = async (formData) => {
  const response = await fetch(`api/reset-password`, {
    method: "POST",
    body: JSON.stringify(formData),
  });

  return await response.json();
};

const updatePassword = async (_id, formData) => {
  const response = await fetch(`api/updatePassword/${_id}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(formData),
  });

  return await response.json();
};

const updateProfile = async (_id, formData) => {
  const response = await fetch(`api/users/${_id}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(formData),
  });

  return await response.json();
};

const handleLogout = async (setUser, setToken) => {
  try {
    const res = await fetch("/api/logout", {
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
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

export { handleRegister, resendVerificationEmail, forgotPassword, resendForgotPasswordEmail, resetPassword, updatePassword, updateProfile, handleLogout };
