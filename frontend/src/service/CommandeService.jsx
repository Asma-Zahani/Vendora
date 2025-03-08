async function getCommandes(token) {
  if (!token) return;
  const res = await fetch('/api/commande/user', {
      headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  if(res.ok){
      return(data);
  };
}

export { getCommandes };
  