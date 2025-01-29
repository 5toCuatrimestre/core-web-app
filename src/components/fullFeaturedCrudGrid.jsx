import * as React from "react";
import { useEffect, useState, useContext } from "react";
import { StyleContext } from "../core/StyleContext";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
} from "../services/usersApi"; // Importamos la API
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";

const roles = ["Administrador", "Líder", "Mesero"];
const estados = ["Activo", "Inactivo", "Suspendido"];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;
  const { style } = useContext(StyleContext);

  const handleClick = async () => {
    const newUser = {
      name: "",
      last_name: "",
      email: "",
      phone_number: "",
      role: "",
      status: "",
      created_at: new Date().toISOString().split("T")[0],
      updated_at: new Date().toISOString().split("T")[0],
      deleted_at: null,
      isNew: true,
    };

    try {
      const createdUser = await createUser(newUser);
      setRows((oldRows) => [...oldRows, createdUser]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [createdUser.id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
      }));
    } catch (error) {
      console.error("Error al agregar usuario:", error);
    }
  };

  return (
    <GridToolbarContainer>
      <Button
        startIcon={<AddIcon />}
        onClick={handleClick}
        sx={{ color: style.mediumBackgroundColor }}
      >
        Agregar Usuario
      </Button>
    </GridToolbarContainer>
  );
}

export default function UserTable() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowModesModel, setRowModesModel] = useState({});
  const { style } = useContext(StyleContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const users = await getAllUsers();
        setRows(users);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => async () => {
    const rowToUpdate = rows.find((row) => row.id === id);
    try {
      const updatedUser = await updateUser(id, rowToUpdate);
      setRows(rows.map((row) => (row.id === id ? updatedUser : row)));
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  const handleDeleteClick = (id) => async () => {
    try {
      await deleteUser(id);
      setRows(rows.filter((row) => row.id !== id));
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow) => {
    try {
      const updatedRow = await updateUser(newRow.id, newRow);
      return updatedRow;
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      return newRow;
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: "name", headerName: "Nombre", width: 150, editable: true },
    { field: "last_name", headerName: "Apellidos", width: 180, editable: true },
    {
      field: "email",
      headerName: "Correo Electrónico",
      width: 200,
      editable: true,
    },
    {
      field: "phone_number",
      headerName: "Teléfono",
      width: 150,
      editable: true,
    },
    {
      field: "role",
      headerName: "Rol",
      width: 150,
      editable: true,
      type: "singleSelect",
      valueOptions: roles,
    },
    {
      field: "status",
      headerName: "Estado",
      width: 120,
      editable: true,
      type: "singleSelect",
      valueOptions: estados,
    },
    {
      field: "created_at",
      headerName: "Fecha de Creación",
      width: 160,
      type: "Date",
    },
    {
      field: "updated_at",
      headerName: "Última Actualización",
      width: 160,
      type: "Date",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Guardar"
              sx={{ color: style.baseColor }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancelar"
              sx={{ color: style.baseColor }}
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Editar"
            sx={{ color: style.baseColor }}
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Eliminar"
            sx={{ color: style.baseColor }}
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .MuiDataGrid-columnHeaders": {
          color: style.darkBackgroundColor,
        },
        "& .actions": {
          color: style.darkBackgroundColor,
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{ toolbar: EditToolbar }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
