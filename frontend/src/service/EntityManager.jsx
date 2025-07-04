/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useContext, useEffect, useState } from "react";
import FilteredTable from "@/components/Tables/FilteredTable";
import { SuccessMessageContext } from "@/utils/SuccessMessageContext";
import { fetchData, handleEntity, handleCreate, handleEdit, handleDelete } from "@/service/EntityCRUD";

const EntityManager = ({filtres, columns, fields, label, identifiant, formData, setFormData, actionList, notAdd}) => {
  const CRUDLabel = identifiant === "id" ? "users" : label;
  const [entities, setEntities] = useState([]);
  
  const [errors, setErrors] = useState(null);
  const { setSuccessMessage } = useContext(SuccessMessageContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItemPerPage, setSelectedItemPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState(columns[0]?.key || "");

  const toggleSortOrder = useCallback((columnKey) => {
    setSortBy(prevKey => (prevKey === columnKey ? prevKey : columnKey));
    setSortOrder(prevOrder => (sortBy === columnKey && prevOrder === "asc") ? "desc" : "asc");
    setCurrentPage(1);
  }, [sortBy]);

  useEffect(() => {
    fetchData(label, currentPage, selectedItemPerPage, searchTerm, sortBy, sortOrder, setEntities, { [filtres?.field]: filtres?.selectedFilter } );    
  }, [currentPage, selectedItemPerPage, searchTerm, sortBy, sortOrder, filtres?.selectedFilter]);
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const handleConfigChange = useCallback((key, value) => {
    setCurrentPage(1);
    if (key === "itemsPerPage") setSelectedItemPerPage(value);
    if (key === "searchTerm") setSearchTerm(value);
  }, []);
  
  const flattenObject = (obj) => {
    return Object.keys(obj).reduce((acc, key) => {
      const value = obj[key];
  
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        const flattenedChild = flattenObject(value);
        Object.assign(acc, flattenedChild);
      } else {
        acc[key] = value;
      }
  
      return acc;
    }, {});
  };  

  const formattedData = {
    ...entities,
    data: (entities.data || []).map((item) => {
      const flattenedItem = flattenObject(item);
  
      const actions = {};
      actionList.map((action) => {
        if (["view", "edit", "switch", "facture"].includes(action)) {
          actions[action] = () =>
            handleEntity(CRUDLabel, item[identifiant], setErrors, (data) =>
              setFormData(flattenObject(data))
            );          
        }
        if (action === "delete") {
          actions[action] = () => handleDelete(CRUDLabel, item[identifiant], setSuccessMessage, () => fetchData(label, currentPage, selectedItemPerPage, searchTerm, sortBy, sortOrder, setEntities, { [filtres?.field]: filtres?.selectedFilter }));
        }
      });
  
      return { ...flattenedItem, actions };
    }),
  };
  

  const entityConfig = {label, formData, setFormData, fields, errors, setErrors, columns, identifiant,
    handleCreate: notAdd ? undefined : () => handleCreate(label, formData, setErrors, setSuccessMessage, () => fetchData(label, currentPage, selectedItemPerPage, searchTerm, sortBy, sortOrder, setEntities, { [filtres?.field]: filtres?.selectedFilter })), 
    handleEdit: () => handleEdit(CRUDLabel, identifiant, formData, setErrors, setSuccessMessage, () => fetchData(label, currentPage, selectedItemPerPage, searchTerm, sortBy, sortOrder, setEntities, { [filtres?.field]: filtres?.selectedFilter })) };
  const tableConfig = {selectedItemPerPage, handlePageChange, handleConfigChange, searchTerm, sortOrder, sortBy, toggleSortOrder};

  return (
    <FilteredTable filtres={filtres} entityConfig={entityConfig} tableConfig={tableConfig} data={formattedData} />
  );
};

export default EntityManager;