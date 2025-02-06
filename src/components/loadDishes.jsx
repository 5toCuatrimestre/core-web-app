import { Card, CardBody, CardFooter, Image, Checkbox } from "@heroui/react";
import { DiProduct } from "../json/diProduct";

export function LoadDishes() {
  return (
    <div className="gap-4 grid grid-cols-4 sm:grid-cols-8">
      {DiProduct.map((item, index) => (
        <Card
          key={index}
          isPressable
          shadow="sm"
          onPress={() => console.log("item pressed")}
          className="w-full flex flex-col relative"
        >
          <CardBody className="overflow-visible p-0 relative">
            {/* Checkbox directamente sobre la imagen */}
            <Checkbox className="absolute top-2 right-0 z-20 bg-white rounded-lg shadow-md" />

            <Image
              alt={item.title}
              className="w-full object-cover h-[140px]"
              radius="lg"
              shadow="sm"
              src={item.img}
              width="100%"
            />
          </CardBody>
          <CardFooter className="w-full flex flex-col items-start text-left">
            <b className="break-words self-start">{item.title}</b>
            <p className="text-default-500 self-start">{item.price}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
