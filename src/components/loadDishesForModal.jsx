import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Checkbox,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
} from "@heroui/react";
import { StyleContext } from "../core/StyleContext";
import { getAllProducts } from "../api/productApi";
import { toast } from "react-hot-toast";
import { LoadingSpinner } from "./loadingSpinner";

export function LoadDishesForModal({
  menuProducts,
  setMenuProducts,
  addedDishes,
  setAddedDishes,
  setIsLoading,
}) {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setLocalLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { style } = useContext(StyleContext);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLocalLoading(true);
        if (setIsLoading) setIsLoading(true);
        const response = await getAllProducts();
        setAllProducts(response.result);
      } catch (err) {
        setError("Error loading products");
      } finally {
        setLocalLoading(false);
        if (setIsLoading) setIsLoading(false);
      }
    };
    fetchProducts();
  }, [setIsLoading]);

  useEffect(() => {
    if (allProducts.length && menuProducts.length) {
      const productsToAdd = allProducts.filter(
        (product) =>
          menuProducts.includes(product.productId) &&
          !addedDishes.some((added) => added.productId === product.productId)
      );

      if (productsToAdd.length) {
        setAddedDishes((prev) => [...prev, ...productsToAdd]);
      }
    }
  }, [allProducts, menuProducts]);

  const toggleProductSelection = (product) => {
    const isSelected = addedDishes.some(
      (p) => p.productId === product.productId
    );
    if (isSelected) {
      setAddedDishes((prev) =>
        prev.filter((p) => p.productId !== product.productId)
      );
    } else {
      setAddedDishes((prev) => [...prev, product]);
    }
  };

  const handleCardClick = (e, product) => {
    // Prevenir que el click en el checkbox propague y cause doble selección
    if (e.target.closest('.checkbox-container')) return;
    toggleProductSelection(product);
  };

  useEffect(() => {
    if (addedDishes && addedDishes.length > 0) {
      const updatedMenuDTO = addedDishes.map((dish) => dish.productId);
      setMenuProducts(updatedMenuDTO);
    }
  }, [addedDishes]);

  const handleSaveMenu = () => {
    if (isSaving) return; // Prevenir múltiples clicks
    
    setIsSaving(true);
    const productIds = addedDishes.map((dish) => dish.productId);

    // Concatenar menuProducts con los nuevos productIds
    const combinedMenu = [...menuProducts, ...productIds];

    const menuData = { productIds: combinedMenu };
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

  if (isLoading) return <LoadingSpinner />;
  if (error) return <p>{error}</p>;

  // Filtramos para mostrar solo productos que no están en el menú actual
  const filteredProducts = allProducts.filter(
    (product) => !menuProducts.some((p) => p.productId === product.productId)
  );

  // Filtramos productos por la búsqueda
  const filteredAndSearchedProducts = filteredProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedProducts = filteredAndSearchedProducts.reduce((acc, product) => {
    const mainCategory =
      product.productCategories?.[0]?.name || "Sin categoría";
    if (!acc[mainCategory]) acc[mainCategory] = [];
    acc[mainCategory].push(product);
    return acc;
  }, {});

  return (
    <div className="w-full flex flex-col">
      <div className="sticky top-0 z-30 bg-content1 pb-3 pt-1 px-2 py-2 shadow-sm">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
          placeholder="Buscar por nombre de producto"
          size="sm"
        />
      </div>

      <div className="w-full overflow-y-auto mt-2 px-1 pb-4" style={{ maxHeight: "calc(100vh - 250px)" }}>
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="w-full p-4 text-center">
            <p className="text-danger">{error}</p>
          </div>
        ) : Object.keys(groupedProducts).length === 0 ? (
          <p className="p-4 text-center">No hay productos disponibles para agregar al menú.</p>
        ) : (
          Object.entries(groupedProducts).map(([category, items]) => (
            <div key={category} className="mb-6">
              <h2 className="text-lg font-bold mb-3" style={{ color: style.H3 }}>
                {category}
              </h2>
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 px-0.5">
                {items.map((item) => {
                  const isSelected = addedDishes.some(
                    (p) => p.productId === item.productId
                  );
                  return (
                    <div 
                      key={item.productId}
                      className="relative"
                      onClick={() => toggleProductSelection(item)}
                    >
                      <Card
                        shadow="sm"
                        className={`w-full flex flex-col cursor-pointer transition-all duration-200 ${
                          isSelected ? 'ring-2 ring-primary scale-[1.02]' : ''
                        }`}
                      >
                        <CardBody className="overflow-visible p-0 relative">
                          <div className="absolute top-2 left-2 z-20" onClick={(e) => e.stopPropagation()}>
                            <Checkbox
                              isSelected={isSelected}
                              onChange={() => toggleProductSelection(item)}
                              style={{ color: style.BgButton }}
                            />
                          </div>
                          <div className={`absolute inset-0 transition-opacity duration-200 ${
                            isSelected ? 'bg-primary/10' : ''
                          }`} />
                          <Image
                            alt={item.name}
                            className="w-full object-cover h-[120px] sm:h-[140px] md:h-[160px]"
                            radius="lg"
                            shadow="sm"
                            src={
                              item.multimedia?.[0]?.url ? `https://${item.multimedia[0].url}` :
                              `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtRZhIqCoy71EH-axL3QYcCDGKdKdttyXRNA&s`
                            }
                            width="100%"
                          />
                        </CardBody>
                        <CardFooter className={`w-full flex flex-col items-start text-left p-2 sm:p-3 ${
                          isSelected ? 'bg-primary/5' : ''
                        }`}>
                          <b className="break-words self-start text-sm sm:text-base">{item.name}</b>
                          <p className="text-default-500 self-start text-xs sm:text-sm">
                            ${item.price.toFixed(2)}
                          </p>
                        </CardFooter>
                      </Card>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
