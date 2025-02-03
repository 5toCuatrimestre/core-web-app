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
  
  export function ModalP({ isOpen, onClose }) {
    return (
      <>
        <Modal isOpen={isOpen} placement="top-center" onOpenChange={onClose} backdrop={"blur"}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Registrar Producto
                </ModalHeader>
                <ModalBody>
                  <Input
                    label="Nombre"
                    placeholder="Ingrese el nombre del producto"
                    variant="bordered"
                  />
                  <Input
                    label="Descripción"
                    placeholder="Ingrese la descripción del producto"
                    variant="bordered"
                  />
                  <Input
                    label="Precio"
                    placeholder="Ingrese el precio"
                    variant="bordered"
                    type="number"
                  />
                  <Select label="Estado">
                    <SelectItem key="true" value="true">
                      Activo
                    </SelectItem>
                    <SelectItem key="false" value="false">
                      Inactivo
                    </SelectItem>
                  </Select>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cancelar
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Guardar Producto
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
  