import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { LoadDishesForModal } from "./loadDishesForModal";
import { useUpdateMenu } from "../hooks/useMenu";
import toast from 'react-hot-toast';

export function ModalD({ isOpen, onClose, menuProducts, setMenuProducts }) {
  const [addedDishes, setAddedDishes] = useState(menuProducts);  // Se mantiene la lista de platos seleccionados
  const { mutate: updateMenu } = useUpdateMenu();

  const handleSaveMenu = () => {
    const productIds = addedDishes.map((dish) => dish.productId);

    // Concatenar menuProducts con los nuevos productIds
    const combinedMenu = [...menuProducts, ...productIds];  // Usamos el operador spread para combinar los arreglos

    const menuData = { productIds: combinedMenu };  // Creamos el objeto para enviar

    console.log("MenuDTO enviado:", menuData);
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
      }
    });
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} backdrop="blur">
      <ModalContent size="full" className="h-5/6">
        <ModalHeader>Registrar Menú</ModalHeader>
        <ModalBody className="overflow-y-auto">
          <LoadDishesForModal
            menuProducts={menuProducts}  // Se pasan los platos actuales como prop
            addedDishes={addedDishes}  // Se pasa el estado de platos seleccionados
            setAddedDishes={setAddedDishes}  // Se pasa la función para actualizar el estado
            setMenuProducts={setMenuProducts}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="flat" onPress={onClose}>
            Cancelar
          </Button>
          <Button color="primary" onPress={handleSaveMenu}>
            Guardar Menú
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
