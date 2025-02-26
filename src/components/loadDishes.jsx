import React, { useState, useContext } from "react";
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
import { TiDelete } from "react-icons/ti";
import { products } from "../json/products";
import { StyleContext } from "../core/StyleContext";

export function LoadDishes({ isModal }) {
  const [selectedDish, setSelectedDish] = useState(null);
  const { style } = useContext(StyleContext);

  // Agrupar los productos por la primera categoría (o "Sin categoría" si no tiene)
  const groupedProducts = products.reduce((acc, product) => {
    const mainCategory =
      product.categories && product.categories.length > 0
        ? product.categories[0].name
        : "Sin categoría";
    if (!acc[mainCategory]) {
      acc[mainCategory] = [];
    }
    acc[mainCategory].push(product);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      {Object.entries(groupedProducts).map(([category, items]) => (
        <div key={category}>
          <h2 className="text-lg font-bold mb-4" style={{ color: style.H3 }}>
            {category}
          </h2>
          <div className="gap-4 grid grid-cols-4 sm:grid-cols-8">
            {items.map((item) => (
              <Card
                key={item.id}
                isPressable
                shadow="sm"
                onPress={() => setSelectedDish(item)}
                className="w-full flex flex-col relative"
              >
                <CardBody className="overflow-visible p-0 relative">
                  {/* Checkbox o icono de eliminar */}
                  {isModal ? (
                    <Checkbox
                      className="absolute top-2 left-2 z-20"
                      style={{ color: style.BgButton }}
                    />
                  ) : (
                    <TiDelete
                      className="absolute top-2 left-2 z-20 text-3xl cursor-pointer"
                      style={{ color: style.BgButton }}
                      onClick={(e) => {
                        e.stopPropagation(); // Evita abrir el modal al hacer clic
                        console.log(`Eliminar ${item.name}`);
                      }}
                    />
                  )}
                  <Image
                    alt={item.name}
                    className="w-full object-cover h-[140px]"
                    radius="lg"
                    shadow="sm"
                    src={
                      item.images?.[0]?.url || "https://via.placeholder.com/300"
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
              {/* Contenedor del carrusel */}
              <div className="max-w-full overflow-x-auto overflow-y-hidden py-2 flex gap-2 -mt-2">
                <div className="flex gap-2 flex-nowrap">
                  {(selectedDish.images || []).map((image) => (
                    <div
                      key={image.id}
                      className="relative flex-shrink-0 w-32 h-32"
                    >
                      <img
                        src={image.url}
                        alt={`${selectedDish.name} imagen ${image.id}`}
                        className="w-full h-full object-cover rounded-lg shadow-md"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Detalles del producto */}
              <p className="text-lg">{selectedDish.description}</p>
              <p className="text-xl font-bold mt-2">
                Precio: ${selectedDish.price.toFixed(2)}
              </p>
              <p className="text-sm text-default-500 mt-2">
                Categorías:{" "}
                {selectedDish.categories.map((cat) => cat.name).join(", ")}
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
