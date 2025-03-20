import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@heroui/react";
import { useUploadCompanyLogo, useUpdateCompanyLogo, useCompanyInfo } from "../hooks/useCompany";

export function ModalL({ isOpen, onClose, setProfilePhoto, companyId }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // Hook para obtener la información de la empresa y su logo
  const { data: companyInfo } = useCompanyInfo();

  const { mutate: uploadLogoMutate } = useUploadCompanyLogo();
  const { mutate: updateLogoMutate } = useUpdateCompanyLogo();

  // Cargar la imagen por primera vez cuando el modal se abre
  useEffect(() => {
    if (companyInfo) {
      console.log("Datos de la empresa recibidos:", companyInfo); // Log para verificar la respuesta completa

      if (companyInfo.result && companyInfo.result.url) {
        console.log("URL del logo recibida:", companyInfo.result.url); // Log para verificar la URL del logo
        setProfilePhoto(companyInfo.result.url); // Establecer la URL del logo
      }
    }
  }, [companyInfo, setProfilePhoto]); // Dependemos de companyInfo y de setProfilePhoto

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
    if (!file) {
      alert("Debe seleccionar una imagen antes de guardar.");
      return;
    }

    // 1. Subir la imagen y obtener la URL
    uploadLogoMutate(file, {
      onSuccess: (imageUrl) => {
        // 2. Actualizar la URL del logo en la empresa
        updateLogoMutate(
          { imageUrl }, // Ahora solo pasamos el objeto { imageUrl }
          {
            onSuccess: () => {
              setProfilePhoto(imageUrl); // Se actualiza en frontend
              onClose();
            },
            onError: () => alert("Error al actualizar la empresa."),
          }
        );
      },
      onError: () => alert("Error al subir la imagen."),
    });
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
              {preview && <img src={preview} alt="Vista previa" className="mt-4 w-full h-auto rounded-lg" />}
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
