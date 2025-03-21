import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Checkbox,
  Input,
} from "@heroui/react";
import { StyleContext } from "../core/StyleContext";
import { getAllProducts } from "../api/productApi";

export function LoadDishesForModal({ menuProducts, addedDishes, setAddedDishes }) {
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { style } = useContext(StyleContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAllProducts();
        setAllProducts(response.result);
      } catch (err) {
        setError("Error loading products");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const toggleProductSelection = (product) => {
    const isSelected = addedDishes.some(p => p.productId === product.productId);
    if (isSelected) {
      // Si ya está seleccionado, lo eliminamos
      setAddedDishes(prev => prev.filter(p => p.productId !== product.productId));
    } else {
      // Si no está seleccionado, lo agregamos
      setAddedDishes(prev => [...prev, product]);
    }
  };

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  // Filtramos para mostrar solo productos que no están en el menú actual
  const filteredProducts = allProducts.filter(
    product => !menuProducts.some(p => p.productId === product.productId)
  );

  // Filtramos productos por la búsqueda
  const filteredAndSearchedProducts = filteredProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedProducts = filteredAndSearchedProducts.reduce((acc, product) => {
    const mainCategory = product.productCategories?.[0]?.name || "Sin categoría";
    if (!acc[mainCategory]) acc[mainCategory] = [];
    acc[mainCategory].push(product);
    return acc;
  }, {});

  return (
    <div className="w-full h-screen">
      <Input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full mb-4"
        placeholder="Buscar por nombre de producto"
      />

      {Object.keys(groupedProducts).length === 0 ? (
        <p>No hay productos disponibles para agregar al menú.</p>
      ) : (
        Object.entries(groupedProducts).map(([category, items]) => (
          <div key={category}>
            <h2 className="text-lg font-bold mb-4" style={{ color: style.H3 }}>
              {category}
            </h2>
            <div className="gap-4 grid grid-cols-4 sm:grid-cols-2">
              {items.map((item) => {
                const isSelected = addedDishes.some(
                  (p) => p.productId === item.productId
                );
                return (
                  <Card
                    key={item.productId}
                    shadow="sm"
                    className="w-full flex flex-col relative"
                  >
                    <CardBody className="overflow-visible p-0 relative">
                      <Checkbox
                        isSelected={isSelected}
                        onChange={() => toggleProductSelection(item)}
                        className="absolute top-2 left-2 z-20"
                        style={{ color: style.BgButton }}
                      />
                      <Image
                        alt={item.name}
                        className="w-full object-cover h-[140px]"
                        radius="lg"
                        shadow="sm"
                        src={
                          item.multimedia?.[0]?.url ||
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtRZhIqCoy71EH-axL3QYcCDGKdKdttyXRNA&s"
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
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
