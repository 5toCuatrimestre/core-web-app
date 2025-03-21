import apiClient from "./apiClient";

export const getAllStyles = async () => {
  const { data } = await apiClient.get("/style/all");
  return data;
};

// Función para convertir las claves de un objeto a minúsculas, excepto algunas específicas
const toCustomLowerCaseKeys = (obj) => {
  const newObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      // Convertimos a minúsculas, pero mantenemos las claves específicas en mayúsculas
      if (key === "bgCard" || key === "bgInterface" || key === "bgButton") {
        newObj[key] = obj[key]; // Mantenemos estas claves igual
      } else {
        newObj[key.toLowerCase()] = obj[key]; // Convertimos las demás claves a minúsculas
      }
    }
  }
  return newObj;
};

export const updateStyle = async (id, styleData) => {
  console.log("styleData (original):", styleData);
  
  // Creamos un nuevo objeto con los valores correctos y convertimos los colores a mayúsculas
  const styleDataCustom = {
    status: styleData.status,
    bgCard: styleData.BgCard,
    bgInterface: styleData.BgInterface,
    bgButton: styleData.BgButton,
    p: styleData.P,
    h2: styleData.H2,
    h3: styleData.H3,
    h1: styleData.H1,
  };

  console.log("styleData (custom converted):", styleDataCustom);
  
  // Enviamos los datos convertidos a la API
  const { data } = await apiClient.put(`/style/${id}`, styleDataCustom);
  return data;
};

