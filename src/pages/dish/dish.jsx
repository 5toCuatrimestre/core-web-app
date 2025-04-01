import React, { useState, useContext, useEffect } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "@heroui/card";
import { Button } from "@heroui/react";
import { StyleContext } from "../../core/StyleContext";
import { LoadDishes } from "../../components/loadDishes"; // Cuadrícula de tarjetas
import { ModalD } from "../../components/modalD"; // Modal existente
import { useMenu } from "../../hooks/useMenu"; // Para obtener el menú
import { LoadingSpinner } from "../../components/loadingSpinner"; // Spinner de carga

export function Dish() {
  const { style } = useContext(StyleContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuProducts, setMenuProducts] = useState([]); // Estado para almacenar los productos del menú
  const { data: menu, isLoading, error } = useMenu(); // Usamos el hook para obtener el menú
  
  // Al cargar los productos del menú, actualizamos el estado
  useEffect(() => {
    if (menu && menu.result) {
      const productIds = menu.result.products.map(product => product.productId); // Extraemos los IDs de los productos
      setMenuProducts(productIds); // Establecemos los IDs de los productos del menú en el estado
      console.log("IDs de los productos del menú cargados:", productIds); // Verificamos los IDs cargados
    }
  }, [menu]);
  
  const handleAddDish = (dish) => {
    if (!menuProducts.includes(dish.productId)) {
      setMenuProducts([...menuProducts, dish.productId]); // Agregar el ID del platillo seleccionado
      console.log("Platillo agregado:", dish); // Log cuando se agrega un platillo
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <div>Error al cargar platillos</div>
      ) : (
        <div className="w-full">
          <Card
            className="w-full shadow-lg"
            style={{
              background: style.BgCard,
              color: style.P
            }}
          >
            <CardHeader>
              <h1 className="text-xl font-bold" style={{ color: style.H1 }}>
                Carta del Día
              </h1>
            </CardHeader>

            <CardBody>
              <LoadDishes isModal={false} menuId={1} menu={menu}/>
            </CardBody>

            <CardFooter className="flex justify-end">
              <Button
                style={{ background: style.BgButton, color: style.P }}
                onPress={() => setIsModalOpen(true)} // Abre el modal
              >
                Agregar Platillo
              </Button>
            </CardFooter>
          </Card>

          {/* ModalD se abre/cierra según isModalOpen */}
          <ModalD
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)} // Cierra el modal
            menuId={1} // Aquí pasamos el ID del menú
            menuProducts={menuProducts} // Los productos ya asignados al menú
            allProducts={[]} // Aquí debes pasar todos los productos disponibles
            handleAddDish={handleAddDish} // Pasamos la función handleAddDish al modal
          />
        </div>
      )}
    </>
  );
}
