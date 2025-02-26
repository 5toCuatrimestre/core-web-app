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

export function ModalU({ isOpen, onClose, user }) {
  // Estados para los campos del formulario
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    rol: "",
  });

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
    });
    onClose();
  };

  // Función para guardar el usuario
  const handleSave = () => {
    // Aquí podrías agregar la lógica para guardar los datos
    console.log("Datos a guardar:", formData);
    handleClose();
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
                  <SelectItem key="ADMIN" value="administrador">
                    Administrador
                  </SelectItem>
                  <SelectItem key="LEADER" value="líder">
                    Líder
                  </SelectItem>
                  <SelectItem key="WAITER" value="mesero">
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
                  <SelectItem key="ACTIVE" value="true">
                    Activo
                  </SelectItem>
                  <SelectItem key="INACTIVE" value="false">
                    Inactivo
                  </SelectItem>
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={handleClose}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={handleSave}>
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
