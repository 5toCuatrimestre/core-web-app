import React, { useState, useContext } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@heroui/react";

import { LoadDishes } from "./loadDishes";
import { StyleContext } from "../core/StyleContext";

export const SearchIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

export function ModalD({ isOpen, onClose }) {
  const { style } = useContext(StyleContext);

  return (
    <Modal
      isOpen={isOpen}
      placement="top-center"
      onOpenChange={onClose}
      backdrop={"blur"}
      scrollBehavior="inside"
      className="border-1"
      style={{
        background: style.BgCard,
        borderColor: style.Button, // ✅ Ahora sí funcionará
      }}
    >
      <ModalContent size="xl" className="max-w-[1100px] w-full">
        {(onClose) => (
          <>
            <ModalHeader
              className="flex flex-col gap-1"
              style={{ color: style.H2 }}
            >
              Registrar Menú
              <Input
                isClearable
                className="w-full sm:max-w-[44%] mt-2"
                placeholder="Buscar por nombre"
                startContent={<SearchIcon />}
                // value={filterValue}
                // onClear={() => onClear()}
                // onValueChange={onSearchChange}
              />
            </ModalHeader>
            <ModalBody>
              <LoadDishes isModal={true} />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Cancelar
              </Button>
              <Button color="primary" onPress={onClose}>
                Guardar Menú
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
