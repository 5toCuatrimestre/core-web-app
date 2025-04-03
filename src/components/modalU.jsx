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

  const [originalData, setOriginalData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});

  // Hooks de TanStack Query para actualizar y crear usuario
  const { mutate: updateUserMutate } = useUpdateUser();
  const { mutate: createUserMutate } = useCreateUser();

  // Efecto para cargar los datos del usuario cuando se abre el modal para editar
  useEffect(() => {
    if (user) {
      const initialData = {
        name: user.name || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        rol: user.rol || "",
        status: user.status || "",
      };
      setFormData(initialData);
      setOriginalData(initialData);
    } else {
      // Si no hay usuario, limpiar el formulario (para añadir nuevo)
      const emptyData = {
        name: "",
        email: "",
        phoneNumber: "",
        rol: "",
        status: "",
      };
      setFormData(emptyData);
      setOriginalData(emptyData);
    }
    setErrors({});
  }, [user, isOpen]);

  const getValidationErrors = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d+$/;

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    } else if (formData.name.length > 30) {
      newErrors.name = "El nombre no puede exceder 30 caracteres";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El correo es requerido";
    } else if (formData.email.length > 30) {
      newErrors.email = "El correo no puede exceder 30 caracteres";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Ingrese un correo válido";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "El teléfono es requerido";
    } else if (formData.phoneNumber.length > 10) {
      newErrors.phoneNumber = "El teléfono no puede exceder 10 dígitos";
    } else if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Solo se permiten números";
    }

    if (!formData.rol) {
      newErrors.rol = "El rol es requerido";
    }

    if (!formData.status) {
      newErrors.status = "El estado es requerido";
    }

    return newErrors;
  };

  // Función para manejar cambios en los inputs
  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Limpiar el error cuando el usuario comienza a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: "",
      }));
    }
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
    setOriginalData(null);
    setIsSaving(false);
    setErrors({});
    onClose();
  };

  const hasRealChanges = () => {
    if (!originalData) return false;
    return Object.keys(formData).some(key => {
      const currentValue = formData[key]?.toString().trim() || "";
      const originalValue = originalData[key]?.toString().trim() || "";
      return currentValue !== originalValue;
    });
  };

  const isFormValid = () => {
    const validationErrors = getValidationErrors();
    const hasErrors = Object.keys(validationErrors).length > 0;

    if (user) {
      // En modo edición, solo se valida si hay cambios reales y no hay errores
      return hasRealChanges() && !hasErrors;
    } else {
      // En modo creación, se valida que todos los campos estén llenos y no haya errores
      const allFieldsFilled = Object.values(formData).every(value => 
        value && value.toString().trim() !== ""
      );
      return allFieldsFilled && !hasErrors;
    }
  };

  // Función para guardar (crear o actualizar) el usuario
  const handleSave = () => {
    const validationErrors = getValidationErrors();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSaving(true);

    if (user) {
      const userId = Number(user.userId);
      if (!isNaN(userId) && userId > 0) {
        updateUserMutate(
          { id: userId, userData: formData },
          {
            onSuccess: (response) => {
              if (response?.result) {
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
              }
              setIsSaving(false);
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
              setIsSaving(false);
            }
          }
        );
      } else {
        console.error("ID del usuario inválido, no se envió la actualización.");
        setIsSaving(false);
      }
    } else {
      createUserMutate(formData, {
        onSuccess: (response) => {
          if (response?.result) {
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
          }
          setIsSaving(false);
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
          setIsSaving(false);
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
                  isDisabled={isSaving}
                  maxLength={30}
                  errorMessage={errors.name}
                  isInvalid={!!errors.name}
                />
                <Input
                  label="Correo Electrónico"
                  placeholder="Ingrese el correo"
                  variant="bordered"
                  type="email"
                  value={formData.email}
                  onValueChange={(value) => handleChange("email", value)}
                  isDisabled={isSaving}
                  maxLength={30}
                  errorMessage={errors.email}
                  isInvalid={!!errors.email}
                />
                <Input
                  label="Número de Teléfono"
                  placeholder="Ingrese el teléfono"
                  variant="bordered"
                  type="tel"
                  value={formData.phoneNumber}
                  onValueChange={(value) => handleChange("phoneNumber", value)}
                  isDisabled={isSaving}
                  maxLength={10}
                  errorMessage={errors.phoneNumber}
                  isInvalid={!!errors.phoneNumber}
                />
                <Select
                  label="Rol"
                  selectedKeys={formData.rol ? [formData.rol] : []}
                  onSelectionChange={(keys) =>
                    handleChange("rol", Array.from(keys)[0])
                  }
                  isDisabled={isSaving}
                  errorMessage={errors.rol}
                  isInvalid={!!errors.rol}
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
                  isDisabled={isSaving}
                  errorMessage={errors.status}
                  isInvalid={!!errors.status}
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
                <Button 
                  color="danger" 
                  variant="flat" 
                  onPress={handleClose}
                  isDisabled={isSaving}
                >
                  Cancelar
                </Button>
                <Button 
                  color="primary" 
                  onPress={handleSave}
                  isDisabled={isSaving || !isFormValid()}
                >
                  {isSaving ? "Guardando..." : (user ? "Actualizar Usuario" : "Guardar Usuario")}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
