import React, { useState, useEffect, useRef } from "react";
import { useCreateProduct, useUpdateProduct } from "../hooks/useProducts";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Checkbox,
  CheckboxGroup,
  Tabs,
  Tab,
  Card,
  CardBody,
  Image,
} from "@heroui/react";

import { uploadImage, createMultimedia } from "../api/storageApi";

export function ModalP({ isOpen, onClose, product }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    status: "active",
    images: [], // Se almacenarán objetos con { id, url }
    categories: [],
  });

  const [selectedCategories, setSelectedCategories] = useState(new Set([]));
  const [activeTab, setActiveTab] = useState("details");
  const fileInputRef = useRef(null); // Referencia para el input file

  const allCategories = [
    { categoryId: 1, name: "Desayuno" },
    { categoryId: 2, name: "Comida" },
    { categoryId: 3, name: "Cena" },
  ];

  const { mutateAsync: createProduct } = useCreateProduct();
  const { mutateAsync: updateProduct } = useUpdateProduct();

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price?.toString() || "",
        status: product.status ? "active" : "inactive",
        images: product.multimedia || [],
        categories: product.productCategories || [],
      });
      if (product.productCategories && product.productCategories.length > 0) {
        const categoryIds = product.productCategories.map((cat) =>
          cat.categoryId.toString()
        );
        setSelectedCategories(new Set(categoryIds));
      } else {
        setSelectedCategories(new Set([]));
      }
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        status: "active",
        images: [],
        categories: [],
      });
      setSelectedCategories(new Set([]));
    }
    setActiveTab("details");
  }, [product, isOpen]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (selectedKeys) => {
    setSelectedCategories(selectedKeys);
    const selectedCategoriesArray = Array.from(selectedKeys).map((id) => {
      const category = allCategories.find(
        (cat) => cat.categoryId.toString() === id
      );
      return { categoryId: parseInt(id), name: category ? category.name : "" };
    });
    setFormData((prev) => ({
      ...prev,
      categories: selectedCategoriesArray,
    }));
  };

  const handleRemoveImage = (imageId) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.id !== imageId),
    }));
  };

  // Función que sube la imagen y crea la multimedia al momento de seleccionar el archivo
// modalP.jsx
  const handleAddImage = async (imageFile) => {
    try {
      console.log("Iniciando la subida de la imagen...");
      const uploadedImageUrl = await uploadImage(imageFile); // Se sube la imagen
      console.log("Imagen subida con éxito, URL obtenida:", uploadedImageUrl);

      // Se crea la multimedia con la URL para obtener el id
      const multimediaResponse = await createMultimedia(uploadedImageUrl);
      console.log("Multimedia creada con éxito, ID obtenido:", multimediaResponse.id);

      if (!multimediaResponse.id) {
        console.error("No se obtuvo un ID válido de la multimedia.");
        return;
      }

      const newImage = {
        id: multimediaResponse.id, // Se guarda el id para la relación
        url: uploadedImageUrl,    // Se guarda la URL para vista previa
      };

      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, newImage],
      }));

      console.log("Nueva imagen añadida al formulario:", newImage);
    } catch (error) {
      console.error("Error al agregar imagen:", error);
    }
  };


  // Función que maneja el cambio en el input file
  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      console.log("Imagen seleccionada:", file);
      await handleAddImage(file);
      // Se limpia el input para poder volver a seleccionar la misma imagen si es necesario
      e.target.value = "";
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      status: "active",
      images: [],
      categories: [],
    });
    setSelectedCategories(new Set([]));
    setActiveTab("details");
    onClose();
  };

  const handleSave = async () => {
    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      status: formData.status === "active",
      productCategories: formData.categories.map((category) => ({
        categoryId: category.categoryId,
      })),
      multimedia: formData.images.map((image) => ({ id: image.id })),
    };

    console.log("Datos a enviar al crear/actualizar el producto:", productData);

    if (product) {
      await updateProduct({ id: product.productId, productData });
    } else {
      await createProduct(productData);
    }
    handleClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      placement="center"
      onOpenChange={handleClose}
      backdrop={"blur"}
      size="4xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {product ? "Editar Producto" : "Registrar Producto"}
            </ModalHeader>
            <ModalBody>
              <Tabs
                selectedKey={activeTab}
                onSelectionChange={setActiveTab}
                aria-label="Secciones del producto"
              >
                <Tab key="details" title="Detalles">
                  <div className="flex flex-col gap-4 py-2">
                    <Input
                      label="Nombre"
                      placeholder="Ingrese el nombre del producto"
                      variant="bordered"
                      value={formData.name}
                      onValueChange={(value) => handleChange("name", value)}
                    />
                    <Input
                      label="Descripción"
                      placeholder="Ingrese la descripción del producto"
                      variant="bordered"
                      value={formData.description}
                      onValueChange={(value) =>
                        handleChange("description", value)
                      }
                    />
                    <Input
                      label="Precio"
                      placeholder="Ingrese el precio"
                      variant="bordered"
                      type="number"
                      value={formData.price}
                      onValueChange={(value) => handleChange("price", value)}
                      startContent={
                        <div className="pointer-events-none flex items-center">
                          <span className="text-default-400 text-small">$</span>
                        </div>
                      }
                    />
                    <Select
                      label="Estado"
                      selectedKeys={formData.status ? [formData.status] : []}
                      onSelectionChange={(keys) =>
                        handleChange("status", Array.from(keys)[0])
                      }
                    >
                      <SelectItem key="active" value="active">
                        Activo
                      </SelectItem>
                      <SelectItem key="inactive" value="inactive">
                        Inactivo
                      </SelectItem>
                    </Select>
                  </div>
                </Tab>
                <Tab key="categories" title="Categorías">
                  <div className="py-2">
                    <h3 className="text-md mb-2">Seleccione las categorías</h3>
                    <div className="overflow-y-auto max-h-96">
                      <CheckboxGroup
                        value={Array.from(selectedCategories)}
                        onValueChange={handleCategoryChange}
                        orientation="horizontal"
                        className="gap-1 flex flex-wrap"
                      >
                        {allCategories.map((category) => (
                          <Checkbox
                            key={category.categoryId}
                            value={category.categoryId.toString()}
                            className="m-1"
                          >
                            {category.name}
                          </Checkbox>
                        ))}
                      </CheckboxGroup>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">
                        Categorías seleccionadas:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {formData.categories.map((category) => (
                          <span
                            key={category.categoryId}
                            className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs"
                          >
                            {category.name}
                          </span>
                        ))}
                        {formData.categories.length === 0 && (
                          <span className="text-gray-500 text-sm">
                            No hay categorías seleccionadas
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab key="images" title="Imágenes">
                  <div className="py-2">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-md">Imágenes del producto</h3>
                      <Button
                        size="sm"
                        color="primary"
                        onPress={() => {
                          if (fileInputRef.current) {
                            fileInputRef.current.click();
                          }
                        }}
                      >
                        Añadir Imagen
                      </Button>
                      {/* Input oculto para seleccionar la imagen */}
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                      />
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {formData.images.map((image) => (
                        <div key={image.id} className="relative">
                          <Card>
                            <CardBody className="p-0">
                              <Image
                                src={`https://${image.url}`}
                                alt={`Imagen ${image.id}`}
                                className="w-full h-48 object-cover"
                              />
                            </CardBody>
                          </Card>
                          <Button
                            color="danger"
                            size="sm"
                            isIconOnly
                            className="absolute top-2 right-2 z-10"
                            onPress={() => handleRemoveImage(image.id)}
                          >
                            ✕
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={handleClose}>
                Cancelar
              </Button>
              <Button color="primary" onPress={handleSave}>
                {product ? "Actualizar Producto" : "Guardar Producto"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
