import React, { useState, useContext } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/react";
import { StyleContext } from "../../core/StyleContext";
import { LoadDishes } from "../../components/loadDishes"; // Cuadrícula de tarjetas
import { ModalD } from "../../components/ModalD";         // Modal existente

export function Dish() {
  const { style } = useContext(StyleContext);

  // Control del modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full">  {/* Contenedor principal que ocupa todo el ancho */}
      <Card
        className="w-full shadow-lg"  // ¡Sin max-w-[1100px]!
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
          <LoadDishes />
        </CardBody>

        <CardFooter className="flex justify-end">
          <Button
            style={{ background: style.BgButton, color: style.P }}
            onPress={() => setIsModalOpen(true)}
          >
            Agregar Platillo
          </Button>
        </CardFooter>
      </Card>

      {/* ModalD se abre/cierra según isModalOpen */}
      <ModalD isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
