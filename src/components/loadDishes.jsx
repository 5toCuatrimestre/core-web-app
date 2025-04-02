import React, { useState, useContext, useEffect } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Checkbox,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { StyleContext } from "../core/StyleContext";
import { useMenu } from "../hooks/useMenu"; // Importar el hook que obtiene el menú desde la API

export function LoadDishes({ isModal, menu }) {
  const [selectedDish, setSelectedDish] = useState(null); // Para el modal de platillo seleccionado
  const { style } = useContext(StyleContext);
  console.log("Menu en LoadDishes:", menu); // Log para verificar los datos

  // Agrupar los productos por categoría
  const groupedProducts = menu?.result?.products.reduce((acc, product) => {
    const mainCategory =
      product.productCategories && product.productCategories.length > 0
        ? product.productCategories[0].name
        : "Sin categoría";
    if (!acc[mainCategory]) {
      acc[mainCategory] = [];
    }
    acc[mainCategory].push(product);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {groupedProducts && Object.entries(groupedProducts).map(([category, items]) => (
        <div key={category}>
          <h2 className="text-lg font-bold mb-4" style={{ color: style.H3 }}>
            {category}
          </h2>
          <div className="gap-4 grid grid-cols-4 sm:grid-cols-8">
            {items.map((item) => (
              <Card
                key={item.productId}
                isPressable
                shadow="sm"
                onPress={() => setSelectedDish(item)}
                className="w-full flex flex-col relative"
              >
                <CardBody className="overflow-visible p-0 relative">
                  {/* Checkbox para seleccionar el platillo */}
                  {isModal && (
                    <Checkbox
                      className="absolute top-2 left-2 z-20"
                      style={{ color: style.BgButton }}
                      onChange={() => onAddDish(item)} // Llama a la función para agregar el platillo
                    />
                  )}
                  <Image
                    alt={item.name}
                    className="w-full object-cover h-[140px]"
                    radius="lg"
                    shadow="sm"
                    src={
                      item.multimedia?.[0]?.url ? `https://${item.multimedia[0].url}` :
                      `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtRZhIqCoy71EH-axL3QYcCDGKdKdttyXRNA&s`
                    }
                    width="100%"
                  />
                </CardBody>
                <CardFooter className="w-full flex flex-col items-start text-left">
                  <b className="break-words self-start">{item.name}</b>
                  <p className="text-default-500 self-start">
                    ${item.price.toFixed(2)}
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {/* Modal para mostrar el platillo en grande */}
      {selectedDish && (
        <Modal
          isOpen={Boolean(selectedDish)}
          onOpenChange={() => setSelectedDish(null)}
          backdrop="blur"
        >
          <ModalContent>
            <ModalHeader>{selectedDish.name}</ModalHeader>
            <ModalBody>
              {/* Carrusel de imágenes */}
              <div className="max-w-full overflow-x-auto overflow-y-hidden py-2 flex gap-2 -mt-2">
                <div className="flex gap-2 flex-nowrap">
                  {(selectedDish.multimedia || []).map((image) => (
                    <div
                      key={image.id}
                      className="relative flex-shrink-0 w-32 h-32"
                    >
                      <img
                        src={`https://${image.url}`}
                        alt={`${selectedDish.name} imagen ${image.id}`}
                        className="w-full h-full object-cover rounded-lg shadow-md"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Detalles del platillo */}
              <p className="text-lg">{selectedDish.description}</p>
              <p className="text-xl font-bold mt-2">
                Precio: ${selectedDish.price.toFixed(2)}
              </p>
              <p className="text-sm text-default-500 mt-2">
                Categorías:{" "}
                {selectedDish.productCategories.map((cat) => cat.name).join(", ")}
              </p>
            </ModalBody>
            <ModalFooter>
              <Button onPress={() => setSelectedDish(null)}>Cerrar</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}
