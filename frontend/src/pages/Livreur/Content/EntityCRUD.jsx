import { getEntities, getEntity, createEntity, updateEntity, deleteEntity } from "@/service/EntitesService";

export const fetchData = async (CRUDLabel, currentPage, selectedItemPerPage, searchTerm, sortBy, sortOrder, setEntities, filtre) => {
  const data = await getEntities(CRUDLabel, currentPage, selectedItemPerPage, searchTerm, sortBy, sortOrder, filtre);
  setEntities(data);
};

export const handleEntity = async (CRUDLabel, id, setErrors, setFormData) => {
  setErrors(null);
  const entityData = await getEntity(CRUDLabel, id);
  setFormData(entityData);
};

export const handleCreate = async (CRUDLabel, formData, setErrors, setSuccessMessage, fetchData) => {  
  const data = await createEntity(CRUDLabel, formData);
  if (data.errors) {
    setErrors(data.errors);
    return false;
  }
  if (data.message) {
    setErrors(null);
    setSuccessMessage(data.message);
    if (fetchData) {
      fetchData();
    }
    return true;
  }
};

export const handleEdit = async (CRUDLabel, identifiant, formData, setErrors, setSuccessMessage, fetchData) => {  
  const data = await updateEntity(CRUDLabel, formData[identifiant], formData);
  if (data.errors) {
    setErrors(data.errors);
    return false;
  }
  if (data.message) {
    setErrors(null);
    setSuccessMessage(data.message);
    if (fetchData) {
      fetchData();
    }
    return true;
  }
};

export const handleDelete = async (CRUDLabel, id, setSuccessMessage, fetchData) => {
  const data = await deleteEntity(CRUDLabel, id);
  if (data.message) {
    setSuccessMessage(data.message);
    if (fetchData) {
      fetchData();
    }
  }
};