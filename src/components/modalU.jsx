import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import { useUpdateUser, useCreateUser } from "../hooks/useUsers";
import toast from 'react-hot-toast';

export function ModalU({ isOpen, onClose, user }) {
  // Estados para los campos del formulario
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    rol: "",
    status: "",
  });

  // Hooks de TanStack Query para actualizar y crear usuario
  const { mutate: updateUserMutate, isPending: isUpdating, isError: isUpdateError } = useUpdateUser();
  const { mutate: createUserMutate, isPending: isCreating, isError: isCreateError } = useCreateUser();

  // Efecto para cargar los datos del usuario cuando se abre el modal para editar
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        rol: user.rol || "",
        status: user.status || "",
      });
    } else {
      // Si no hay usuario, limpiar el formulario (para añadir nuevo)
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        rol: "",
        status: "",
      });
    }
  }, [user, isOpen]);

  // Función para manejar cambios en los inputs
  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Función para manejar el cierre del modal y limpiar datos
  const handleClose = () => {
    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
      rol: "",
      status: "",
    });
    onClose();
  };

  // Función para guardar (crear o actualizar) el usuario
  const handleSave = () => {
    if (user) {
      // Modo edición
      const userId = Number(user.userId);
      if (!isNaN(userId) && userId > 0) {
        updateUserMutate(
          { id: userId, userData: formData },
          {
            onSuccess: () => {
              toast.success('Usuario actualizado correctamente', {
                position: 'top-center',
                duration: 3000,
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                },
              });
              handleClose();
            },
            onError: (error) => {
              console.error('Error al actualizar:', error);
              toast.error('Error al actualizar el usuario', {
                position: 'top-center',
                duration: 3000,
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                },
              });
            }
          }
        );
      } else {
        console.error("ID del usuario inválido, no se envió la actualización.");
      }
    } else {
      createUserMutate(formData, {
        onSuccess: () => {
          toast.success('Usuario creado correctamente', {
            position: 'top-center',
            duration: 3000,
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          });
          handleClose();
        },
        onError: (error) => {
          console.error('Error al crear:', error);
          toast.error('Error al crear el usuario', {
            position: 'top-center',
            duration: 3000,
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          });
        }
      });
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        placement="top-center"
        onOpenChange={handleClose}
        backdrop={"blur"}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {user ? "Editar Usuario" : "Registrar Usuario"}
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Nombre"
                  placeholder="Ingrese el nombre completo"
                  variant="bordered"
                  value={formData.name}
                  onValueChange={(value) => handleChange("name", value)}
                />
                <Input
                  label="Correo Electrónico"
                  placeholder="Ingrese el correo"
                  variant="bordered"
                  type="email"
                  value={formData.email}
                  onValueChange={(value) => handleChange("email", value)}
                />
                <Input
                  label="Número de Teléfono"
                  placeholder="Ingrese el teléfono"
                  variant="bordered"
                  type="tel"
                  value={formData.phoneNumber}
                  onValueChange={(value) => handleChange("phoneNumber", value)}
                />
                <Select
                  label="Rol"
                  selectedKeys={formData.rol ? [formData.rol] : []}
                  onSelectionChange={(keys) =>
                    handleChange("rol", Array.from(keys)[0])
                  }
                >
                  <SelectItem key="ADMIN" value="ADMIN">
                    Administrador
                  </SelectItem>
                  <SelectItem key="LEADER" value="LEADER">
                    Líder
                  </SelectItem>
                  <SelectItem key="WAITER" value="WAITER">
                    Mesero
                  </SelectItem>
                </Select>
                <Select
                  label="Estado"
                  selectedKeys={formData.status ? [formData.status] : []}
                  onSelectionChange={(keys) =>
                    handleChange("status", Array.from(keys)[0])
                  }
                >
                  <SelectItem key="ACTIVE" value="ACTIVE">
                    Activo
                  </SelectItem>
                  <SelectItem key="INACTIVE" value="INACTIVE">
                    Inactivo
                  </SelectItem>
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={handleClose}>
                  Cancelar
                </Button>
                <Button 
                  color="primary" 
                  onPress={handleSave}
                  isLoading={isCreating || isUpdating}
                >
                  {user ? "Actualizar Usuario" : "Guardar Usuario"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
