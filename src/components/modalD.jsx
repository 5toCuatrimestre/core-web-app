import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
} from "@heroui/react";
import { LoadDishesForModal } from "./loadDishesForModal";
import { useUpdateMenu } from "../hooks/useMenu";
import toast from 'react-hot-toast';

export function ModalD({ isOpen, onClose, menuProducts, setMenuProducts }) {
  const [addedDishes, setAddedDishes] = useState(menuProducts);  // Se mantiene la lista de platos seleccionados
  const [isSaving, setIsSaving] = useState(false);
  const { mutate: updateMenu } = useUpdateMenu();
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveMenu = () => {
    if (isSaving) return; // Prevenir múltiples clicks
    
    setIsSaving(true);
    const productIds = addedDishes.map((dish) => dish.productId);

    // Concatenar menuProducts con los nuevos productIds
    const combinedMenu = [...menuProducts, ...productIds];  // Usamos el operador spread para combinar los arreglos

    const menuData = { productIds: combinedMenu };  // Creamos el objeto para enviar

    updateMenu(menuData, {
      onSuccess: () => {
        toast.success('Menú actualizado correctamente', {
          position: 'top-center',
          duration: 3000,
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
        onClose();
      },
      onError: (error) => {
        console.error('Error al actualizar el menú:', error);
        toast.error('Error al actualizar el menú', {
          position: 'top-center',
          duration: 3000,
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      },
      onSettled: () => {
        setIsSaving(false);
      }
    });
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} backdrop="blur">
      <ModalContent size="full" className="h-5/6">
        <ModalHeader className="border-b pb-3">Registrar Menú</ModalHeader>
        <ModalBody className="p-0 overflow-hidden">
          <LoadDishesForModal
            menuProducts={menuProducts}
            addedDishes={addedDishes}
            setAddedDishes={setAddedDishes}
            setMenuProducts={setMenuProducts}
            setIsLoading={setIsLoading}
          />
        </ModalBody>
        <ModalFooter className="border-t pt-3">
          <Button 
            color="danger" 
            variant="flat" 
            onPress={onClose} 
            isDisabled={isSaving || isLoading}
          >
            Cancelar
          </Button>
          <Button 
            color="primary" 
            onPress={handleSaveMenu}
            isDisabled={isSaving || isLoading}
            startContent={isSaving ? <Spinner size="sm" color="white" /> : null}
          >
            {isSaving ? "Guardando..." : "Guardar Menú"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
