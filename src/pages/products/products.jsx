import React, { useContext } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
} from "@heroui/react";
import { useAllProducts } from "../../hooks/useProducts";
import { ModalP } from "../../components/modalP";
import { StyleContext } from "../../core/StyleContext";
import { LoadingSpinner } from "../../components/loadingSpinner";

export const columns = [
  { name: "ID", uid: "productId", sortable: true },
  { name: "NOMBRE", uid: "name", sortable: true },
  { name: "DESCRIPCIÓN", uid: "description" },
  { name: "PRECIO", uid: "price", sortable: true },
  { name: "ESTADO", uid: "status", sortable: true },
  { name: "CREADO EN", uid: "created_at", sortable: true },
  { name: "IMÁGENES", uid: "images", sortable: true },
  { name: "CATEGORIAS", uid: "categories", sortable: true },
  { name: "ACCIONES", uid: "actions" },
];

export const statusOptions = [
  { name: "Activo", uid: "active" },
  { name: "Inactivo", uid: "inactive" },
];

export function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

export const PlusIcon = ({ size = 24, width, height, ...props }) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path d="M6 12h12" />
        <path d="M12 18V6" />
      </g>
    </svg>
  );
};

export const VerticalDotsIcon = ({ size = 24, width, height, ...props }) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={size || height}
      role="presentation"
      viewBox="0 0 24 24"
      width={size || width}
      {...props}
    >
      <path
        d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
        fill="currentColor"
      />
    </svg>
  );
};

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

export const ChevronDownIcon = ({ strokeWidth = 1.5, ...otherProps }) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...otherProps}
    >
      <path
        d="m19.92 8.95-6.52 6.52c-.77.77-2.03.77-2.8 0L4.08 8.95"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

const statusColorMap = {
  active: "success",
  inactive: "danger",
};

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "description",
  "price",
  "status",
  "images",
  "categories",
  "actions",
];

export function Products() {
  const { style } = useContext(StyleContext);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const { data, isLoading, error } = useAllProducts();
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "price",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const products = data?.result ?? [];
  
  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredProducts = [...products];

    if (hasSearchFilter) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredProducts = filteredProducts.filter((product) => {
        // Convertir el valor booleano a string correspondiente
        const productStatus = product.status ? "active" : "inactive";
        return Array.from(statusFilter).includes(productStatus);
      });
    }

    return filteredProducts;
  }, [products, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((product, columnKey) => {
    const cellValue = product[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{
              radius: "lg",
              src: product.avatar,
              className: "hidden",
            }}
            description={product.email}
            name={cellValue}
          >
            {product.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-tiny capitalize text-default-400">
              {product.team}
            </p>
          </div>
        );
        case "status":
          // Convertir el valor booleano a string para mostrar
          const statusText = product.status ? "Activo" : "Inactivo";
          const statusValue = product.status ? "active" : "inactive";
          return (
            <Chip
              className="capitalize"
              color={statusColorMap[statusValue]}
              size="sm"
              variant="flat"
            >
              {statusText}
            </Chip>
          );
      case "images":
        return (
          <div className="max-w-[250px] h-20 overflow-x-auto overflow-y-hidden py-1 scrollbar-hide flex items-center">
            <div className="flex gap-2 flex-nowrap">
              {(product.multimedia || []).map((image) => (
                <div
                  key={image.id}
                  className="relative flex-shrink-0 w-16 h-16"
                >
                  <img
                  //with backticks add https://
                    src={`https://${image.url}`}
                    alt={`${product.name} imagen ${image.id}`}
                    className="w-full h-full object-cover rounded-lg shadow-md"
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case "categories":
        return (
          <div className="max-w-[250px] h-auto overflow-x-auto overflow-y-hidden py-1 scrollbar-hide flex items-center">
            <div className="grid grid-flow-col auto-cols-max grid-rows-2 gap-1">
              {(product.productCategories || []).map((category) => (
                <Chip
                  key={category.categoryid}
                  size="sm"
                  className="capitalize"
                  style={{ background: style.BgButton, color: style.P }}
                >
                  {category.name}
                </Chip>
              ))}
            </div>
          </div>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Button
              size="sm"
              key={product.id}
              style={{ background: style.BgButton, color: style.P }}
              onPress={() => {
                setSelectedProduct(product);
                setIsModalOpen(true);
              }}
            >
              Editar
            </Button>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Buscar por nombre"
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                  style={{ background: style.BgButton, color: style.P }}
                >
                  Estado
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                  style={{ background: style.BgButton, color: style.P }}
                >
                  Filtrar columnas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              color="primary"
              endContent={<PlusIcon />}
              onPress={() => setIsModalOpen(true)}
              style={{ background: style.BgButton, color: style.P }}
            >
              Añadir
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span
            className="text-default-400 text-small"
            style={{ color: style.H3 }}
          >
            Total {products.length} productos
          </span>
          <label
            className="flex items-center text-default-400 text-small"
            style={{ color: style.H3 }}
          >
            Filas por página:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
              style={{ color: style.H3 }}
            >
              <option value="10" style={{ color: style.P }}>
                10
              </option>
              <option value="15" style={{ color: style.P }}>
                15
              </option>
              <option value="20" style={{ color: style.P }}>
                25
              </option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    products.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="default"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
            style={{ background: style.BgButton, color: style.P }}
          >
            Anterior
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
            style={{ background: style.BgButton, color: style.P }}
          >
            Siguiente
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <div>Error al cargar usuarios</div>
      ) : (
        <>
          {isModalOpen && (
            <ModalP
              isOpen={isModalOpen}
              onClose={() => {
                setIsModalOpen(false);
                setSelectedProduct(null);
              }}
              product={selectedProduct}
            />
          )}

          <Table
            style={{
              background: style.BgCard,
              color: style.P,
            }}
            classNames={{
              wrapper: "p-0 m-0",
            }}
            isHeaderSticky
            aria-label="Example table with custom cells, pagination y sorting"
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            selectedKeys={selectedKeys}
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
          >
            <TableHeader columns={headerColumns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
                  allowsSorting={column.sortable}
                  style={{ background: style.BgButton, color: style.P }}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody
              emptyContent={"No se encontraron productos"}
              items={sortedItems}
            >
              {(item) => (
                <TableRow key={item.productId} style={{ color: style.H3 }}>
                  {(columnKey) => (
                    <TableCell>{renderCell(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </>
      )}
    </>
  );
}
