async function getCommandes() {
  const res = await fetch('/api/commande/user', {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  });
  const data = await res.json();
  if(res.ok){
      return(data);
  };
}

export { getCommandes };