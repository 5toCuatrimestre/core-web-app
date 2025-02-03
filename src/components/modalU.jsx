import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Input,
    Select,
    SelectItem
  } from "@heroui/react";
  
  export function ModalU({ isOpen, onClose}) {
    return (
      <>
        <Modal isOpen={isOpen} placement="top-center" onOpenChange={onClose} backdrop={"blur"}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Registrar Usuario
                </ModalHeader>
                <ModalBody>
                  <Input
                    label="Nombre"
                    placeholder="Ingrese el nombre completo"
                    variant="bordered"
                  />
                  <Input
                    label="Correo Electrónico"
                    placeholder="Ingrese el correo"
                    variant="bordered"
                    type="email"
                  />
                  <Input
                    label="Número de Teléfono"
                    placeholder="Ingrese el teléfono"
                    variant="bordered"
                    type="tel"
                  />
                  <Select label="Rol">
                    <SelectItem key="administrador" value="administrador">
                      Administrador
                    </SelectItem>
                    <SelectItem key="líder" value="líder">
                      Líder
                    </SelectItem>
                    <SelectItem key="mesero" value="mesero">
                      Mesero
                    </SelectItem>
                  </Select>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cancelar
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Guardar Usuario
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
  