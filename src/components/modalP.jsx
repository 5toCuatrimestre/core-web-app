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
import { LoadingSpinner } from "./loadingSpinner";
import toast from 'react-hot-toast';

import { uploadImage, createMultimedia } from "../api/storageApi";

export function ModalP({ isOpen, onClose, product }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    status: "active",
    images: [],
    categories: [],
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [selectedCategories, setSelectedCategories] = useState(new Set([]));
  const [activeTab, setActiveTab] = useState("details");
  const fileInputRef = useRef(null);
  const [originalData, setOriginalData] = useState(null);
  const [showErrorToast, setShowErrorToast] = useState(true);

  const allCategories = [
    { categoryId: 1, name: "Desayuno" },
    { categoryId: 2, name: "Comida" },
    { categoryId: 3, name: "Cena" },
  ];

  const { mutateAsync: createProduct } = useCreateProduct();
  const { mutateAsync: updateProduct } = useUpdateProduct();

  useEffect(() => {
    if (product) {
      const initialData = {
        name: product.name || "",
        description: product.description || "",
        price: product.price?.toString() || "",
        status: product.status ? "active" : "inactive",
        images: product.multimedia || [],
        categories: product.productCategories || [],
      };
      setFormData(initialData);
      setOriginalData(initialData);
      if (product.productCategories && product.productCategories.length > 0) {
        const categoryIds = product.productCategories.map((cat) =>
          cat.categoryId.toString()
        );
        setSelectedCategories(new Set(categoryIds));
      } else {
        setSelectedCategories(new Set([]));
      }
    } else {
      const emptyData = {
        name: "",
        description: "",
        price: "",
        status: "active",
        images: [],
        categories: [],
      };
      setFormData(emptyData);
      setOriginalData(emptyData);
      setSelectedCategories(new Set([]));
    }
    setActiveTab("details");
    setErrors({});
  }, [product, isOpen]);

  const getValidationErrors = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    } else if (formData.name.length > 30) {
      newErrors.name = "El nombre no puede exceder 30 caracteres";
    }

    if (!formData.description.trim()) {
      newErrors.description = "La descripción es requerida";
    } else if (formData.description.length > 80) {
      newErrors.description = "La descripción no puede exceder 80 caracteres";
    }

    if (!formData.price.trim()) {
      newErrors.price = "El precio es requerido";
    } else if (parseFloat(formData.price) < 0) {
      newErrors.price = "El precio no puede ser negativo";
    }

    if (formData.categories.length === 0) {
      newErrors.categories = "Debe seleccionar al menos una categoría";
    }

    return newErrors;
  };

  const handleChange = (name, value) => {
    if (name === 'price') {
      // Permitir números, punto decimal y eliminar otros caracteres
      let numericValue = value.replace(/[^0-9.]/g, '');
      
      // Eliminar múltiples puntos decimales
      const parts = numericValue.split('.');
      if (parts.length > 2) {
        numericValue = parts[0] + '.' + parts.slice(1).join('');
      }
      
      // Limitar parte entera a 6 dígitos
      let integerPart = parts[0];
      if (integerPart.length > 6) {
        integerPart = integerPart.slice(0, 6);
      }
      
      // Limitar parte decimal a 2 dígitos
      let decimalPart = parts[1] || '';
      if (decimalPart.length > 2) {
        decimalPart = decimalPart.slice(0, 2);
      }
      
      // Reconstruir el valor
      value = decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
      
      // Si el valor está vacío o no es un número válido, establecer como vacío
      if (!value || isNaN(value)) {
        value = '';
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Validación en tiempo real
    const validationErrors = getValidationErrors();
    setErrors(validationErrors);
    setShowErrorToast(true); // Resetear el estado del toast cuando hay cambios
  };

  const handleCategoryChange = (selectedKeys) => {
    setSelectedCategories(selectedKeys);
    const selectedCategoriesArray = Array.from(selectedKeys).map((id) => {
      const category = allCategories.find(
        (cat) => cat.categoryId.toString() === id
      );
      return { categoryId: parseInt(id), name: category ? category.name : "" };
    });
    setFormData(prev => ({
      ...prev,
      categories: selectedCategoriesArray,
    }));
    if (errors.categories) {
      setErrors(prev => ({
        ...prev,
        categories: "",
      }));
    }
  };

  const handleRemoveImage = (imageId) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((img) => img.id !== imageId),
    }));
  };

  const handleAddImage = async (imageFile) => {
    try {
      setIsUploading(true);
      const uploadedImageUrl = await uploadImage(imageFile);
      const multimediaResponse = await createMultimedia(uploadedImageUrl);

      if (!multimediaResponse.id) {
        toast.error('Error al procesar la imagen', {
          position: 'top-center',
          duration: 3000,
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
        return;
      }

      const newImage = {
        id: multimediaResponse.id,
        url: uploadedImageUrl,
      };

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, newImage],
      }));

      toast.success('Imagen subida correctamente', {
        position: 'top-center',
        duration: 3000,
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } catch (error) {
      console.error("Error al agregar imagen:", error);
      toast.error('Error al subir la imagen', {
        position: 'top-center',
        duration: 3000,
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      await handleAddImage(file);
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
    setErrors({});
    onClose();
  };

  const hasRealChanges = () => {
    if (!originalData) return false;
    
    // Verificar cambios en campos básicos
    const basicChanges = Object.keys(formData).some(key => {
      if (key === 'images') return false; // Ignorar imágenes aquí
      const currentValue = formData[key]?.toString().trim() || "";
      const originalValue = originalData[key]?.toString().trim() || "";
      return currentValue !== originalValue;
    });

    // Verificar cambios en imágenes solo en modo edición
    if (product) {
      const currentImages = formData.images?.map(img => img.id).sort() || [];
      const originalImages = originalData.images?.map(img => img.id).sort() || [];
      const imageChanges = JSON.stringify(currentImages) !== JSON.stringify(originalImages);
      
      return basicChanges || imageChanges;
    }

    return basicChanges;
  };

  const isFormValid = () => {
    const validationErrors = getValidationErrors();
    return Object.keys(validationErrors).length === 0;
  };

  const handleSave = async () => {
    if (product && !hasRealChanges()) {
      if (showErrorToast) {
        toast.error('No hay cambios para guardar', {
          position: 'top-center',
          duration: 3000,
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
        setShowErrorToast(false);
      }
      return;
    }

    const validationErrors = getValidationErrors();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      if (showErrorToast) {
        toast.error('Por favor corrija los errores en el formulario', {
          position: 'top-center',
          duration: 3000,
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
        setShowErrorToast(false);
      }
      return;
    }

    setIsSaving(true);

    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      status: formData.status === "active",
      productCategories: formData.categories.map((category) => ({
        categoryId: category.categoryId,
      })),
      multimedia: formData.images?.map((image) => ({ id: image.id })) || [],
    };

    try {
      if (product) {
        await updateProduct({ id: product.productId, productData });
        toast.success('Producto actualizado correctamente', {
          position: 'top-center',
          duration: 3000,
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      } else {
        await createProduct(productData);
        toast.success('Producto creado correctamente', {
          position: 'top-center',
          duration: 3000,
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      }
      handleClose();
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      toast.error(product ? 'Error al actualizar el producto' : 'Error al crear el producto', {
        position: 'top-center',
        duration: 3000,
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
    } finally {
      setIsSaving(false);
    }
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
              {isUploading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <LoadingSpinner />
                </div>
              )}
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
                      maxLength={30}
                      errorMessage={errors.name}
                      isInvalid={!!errors.name}
                      isRequired
                    />
                    <Input
                      label="Descripción"
                      placeholder="Ingrese la descripción del producto"
                      variant="bordered"
                      value={formData.description}
                      onValueChange={(value) => handleChange("description", value)}
                      maxLength={80}
                      errorMessage={errors.description}
                      isInvalid={!!errors.description}
                      isRequired
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
                      min="0"
                      step="0.01"
                      errorMessage={errors.price}
                      isInvalid={!!errors.price}
                      isRequired
                      classNames={{
                        input: "[-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      }}
                      onKeyDown={(e) => {
                        // Permitir números, punto decimal, backspace, delete, tab, enter, flechas
                        if (!/[0-9.]/.test(e.key) && 
                            !['Backspace', 'Delete', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                          e.preventDefault();
                        }
                        // Permitir solo un punto decimal
                        if (e.key === '.' && formData.price.includes('.')) {
                          e.preventDefault();
                        }
                      }}
                    />
                    <Select
                      label="Estado"
                      selectedKeys={formData.status ? [formData.status] : []}
                      onSelectionChange={(keys) =>
                        handleChange("status", Array.from(keys)[0])
                      }
                      isRequired
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
                        isRequired
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
                    {errors.categories && (
                      <p className="text-danger text-sm mt-2">{errors.categories}</p>
                    )}
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
                        isDisabled={isUploading}
                        onPress={() => {
                          if (fileInputRef.current) {
                            fileInputRef.current.click();
                          }
                        }}
                      >
                        {isUploading ? (
                          <div className="flex items-center gap-2">
                            <LoadingSpinner size="sm" />
                            <span>Subiendo...</span>
                          </div>
                        ) : (
                          'Añadir Imagen'
                        )}
                      </Button>
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                        disabled={isUploading}
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
              <Button 
                color="danger" 
                variant="flat" 
                onPress={handleClose}
                isDisabled={isSaving || isUploading}
              >
                Cancelar
              </Button>
              <Button 
                color="primary" 
                onPress={handleSave}
                isDisabled={isSaving || isUploading || (product && !hasRealChanges())}
              >
                {isSaving ? "Guardando..." : (product ? "Actualizar Producto" : "Guardar Producto")}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
