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
import { LoadingSpinner } from "./loadingSpinner";
import toast from 'react-hot-toast';

export function ModalL({ isOpen, onClose, setProfilePhoto, companyId }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Hook para obtener la información de la empresa y su logo
  const { data: companyInfo } = useCompanyInfo();

  const { mutate: uploadLogoMutate } = useUploadCompanyLogo();
  const { mutate: updateLogoMutate } = useUpdateCompanyLogo();

  // Cargar la imagen por primera vez cuando el modal se abre
  useEffect(() => {
    if (companyInfo) {
      console.log("Datos de la empresa recibidos:", companyInfo);

      if (companyInfo.result && companyInfo.result.url) {
        console.log("URL del logo recibida:", companyInfo.result.url);
        setProfilePhoto(companyInfo.result.url);
      }
    }
  }, [companyInfo, setProfilePhoto]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && ["image/jpeg", "image/png", "image/jpg", "image/svg+xml"].includes(selectedFile.type)) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setFile(null);
      setPreview(null);
      toast.error("Por favor, seleccione un archivo válido (JPG, PNG, JPEG, SVG).", {
        position: 'top-center',
        duration: 3000,
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    }
  };

  const handleSave = () => {
    if (!file) {
      toast.error("Debe seleccionar una imagen antes de guardar.", {
        position: 'top-center',
        duration: 3000,
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      return;
    }

    setIsUploading(true);

    // 1. Subir la imagen y obtener la URL
    uploadLogoMutate(file, {
      onSuccess: (imageUrl) => {
        // 2. Actualizar la URL del logo en la empresa
        updateLogoMutate(
          { imageUrl },
          {
            onSuccess: (response) => {
              if (response?.result) {
                setProfilePhoto(imageUrl);
                toast.success('Logo actualizado correctamente', {
                  position: 'top-center',
                  duration: 3000,
                  style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                  },
                });
                onClose();
              }
              setIsUploading(false);
            },
            onError: () => {
              setIsUploading(false);
              toast.error('Error al actualizar el logo', {
                position: 'top-center',
                duration: 3000,
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                },
              });
            },
          }
        );
      },
      onError: () => {
        setIsUploading(false);
        toast.error('Error al subir la imagen', {
          position: 'top-center',
          duration: 3000,
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      },
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
              {isUploading ? (
                <div className="flex justify-center items-center min-h-[200px]">
                  <LoadingSpinner />
                </div>
              ) : (
                <>
                  <Input
                    type="file"
                    accept="image/jpeg, image/png, image/jpg, image/svg+xml"
                    onChange={handleFileChange}
                  />
                  {preview && <img src={preview} alt="Vista previa" className="mt-4 w-full h-auto rounded-lg" />}
                </>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose} isDisabled={isUploading}>
                Cancelar
              </Button>
              <Button color="primary" onPress={handleSave} isDisabled={isUploading}>
                {isUploading ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
