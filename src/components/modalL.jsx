import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input
} from "@heroui/react";

export function ModalL({ isOpen, onClose, setProfilePhoto }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && ["image/jpeg", "image/png", "image/jpg", "image/svg+xml"].includes(selectedFile.type)) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setFile(null);
      setPreview(null);
      alert("Por favor, seleccione un archivo válido (JPG, PNG, JPEG, SVG).");
    }
  };

  const handleSave = () => {
    if (preview) {
      setProfilePhoto(preview); // Se actualiza la foto en BaseLayout
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} placement="top-center" onOpenChange={onClose} backdrop="blur">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-2 text-lg font-semibold">
              Modificar Logo
            </ModalHeader>
            <ModalBody>
              <Input
                type="file"
                accept="image/jpeg, image/png, image/jpg, image/svg+xml"
                onChange={handleFileChange}
              />
              {preview && (
                <img src={preview} alt="Vista previa" className="mt-4 w-full h-auto rounded-lg" />
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Cancelar
              </Button>
              <Button color="primary" onPress={handleSave}>
                Guardar Cambios
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
