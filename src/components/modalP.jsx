import React, { useState, useEffect } from "react";
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

export function ModalP({ isOpen, onClose, product }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    status: "",
    images: [],
    categories: [],
  });

  // Estado para las categorías seleccionadas
  const [selectedCategories, setSelectedCategories] = useState(new Set([]));

  // Estado para la pestaña activa
  const [activeTab, setActiveTab] = useState("details");

  // Lista de todas las categorías disponibles (esto debería venir de una API)
  const allCategories = [
    { id: 1, name: "Comida Rápida" },
    { id: 2, name: "Carnes" },
    { id: 3, name: "Platos Principales" },
    { id: 4, name: "Postres" },
    { id: 5, name: "Bebidas" },
    { id: 6, name: "Ensaladas" },
    { id: 7, name: "Vegetariano" },
    { id: 8, name: "Vegano" },
    { id: 9, name: "Desayunos" },
    { id: 10, name: "Cenas" },
  ];

  // Efecto para cargar los datos del producto cuando se abre el modal para editar
  useEffect(() => {
    if (product) {
      // Configurar los datos del formulario
      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price?.toString() || "",
        status: product.status || "",
        images: product.images || [],
        categories: product.categories || [],
      });

      // Configurar las categorías seleccionadas
      if (product.categories && product.categories.length > 0) {
        const categoryIds = product.categories.map((cat) => cat.id.toString());
        setSelectedCategories(new Set(categoryIds));
      } else {
        setSelectedCategories(new Set([]));
      }
    } else {
      // Si no hay producto, limpiar el formulario (para añadir nuevo)
      setFormData({
        name: "",
        description: "",
        price: "",
        status: "",
        images: [],
        categories: [],
      });
      setSelectedCategories(new Set([]));
    }

    // Resetear a la pestaña de detalles
    setActiveTab("details");
  }, [product, isOpen]);

  // Función para manejar cambios en los inputs
  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Función para manejar el cambio de categorías
  const handleCategoryChange = (selectedKeys) => {
    setSelectedCategories(selectedKeys);

    // Actualizar el formData con las categorías seleccionadas
    const selectedCategoriesArray = Array.from(selectedKeys).map((id) => {
      const category = allCategories.find((cat) => cat.id.toString() === id);
      return { id: parseInt(id), name: category ? category.name : "" };
    });

    setFormData((prev) => ({
      ...prev,
      categories: selectedCategoriesArray,
    }));
  };

  // Función para eliminar una imagen
  const handleRemoveImage = (imageId) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img.id !== imageId),
    }));
  };

  // Función para añadir una nueva imagen
  const handleAddImage = () => {
    // Aquí normalmente tendrías un selector de archivos y una carga a un servidor
    // Para este ejemplo, simplemente añadimos una URL de placeholder
    const newImage = {
      id: formData.images.length + 1,
      url: "https://via.placeholder.com/300x200/eee?text=Nueva+Imagen",
    };

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, newImage],
    }));
  };

  // Función para manejar el cierre del modal y limpiar datos
  const handleClose = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      status: "",
      images: [],
      categories: [],
    });
    setSelectedCategories(new Set([]));
    setActiveTab("details"); // Reset active tab when closing
    onClose();
  };

  // Función para guardar el producto
  const handleSave = () => {
    // Aquí podrías agregar la lógica para guardar los datos
    console.log("Datos a guardar:", formData);
    handleClose();
  };

  return (
    <>
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
                            <span className="text-default-400 text-small">
                              $
                            </span>
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
                        <SelectItem key="activo" value="activo">
                          Activo
                        </SelectItem>
                        <SelectItem key="inactivo" value="inactivo">
                          Inactivo
                        </SelectItem>
                      </Select>
                    </div>
                  </Tab>
                  <Tab key="categories" title="Categorías">
                    <div className="py-2">
                      <h3 className="text-md mb-2">
                        Seleccione las categorías
                      </h3>
                      <div className="overflow-y-auto max-h-96">
                        <CheckboxGroup
                          value={Array.from(selectedCategories)} // Convert Set to Array
                          onValueChange={handleCategoryChange}
                          orientation="horizontal"
                          className="gap-1 flex flex-wrap"
                        >
                          {allCategories.map((category) => (
                            <Checkbox
                              key={category.id}
                              value={category.id.toString()}
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
                              key={category.id}
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
                          onPress={handleAddImage}
                        >
                          Añadir Imagen
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {formData.images.map((image) => (
                          <div key={image.id} className="relative">
                            <Card>
                              <CardBody className="p-0">
                                <Image
                                  src={image.url}
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
                        {formData.images.length === 0 && (
                          <div className="col-span-full text-center py-8 text-gray-500">
                            No hay imágenes. Haga clic en "Añadir Imagen" para
                            agregar una.
                          </div>
                        )}
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
    </>
  );
}
