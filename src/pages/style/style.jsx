import React, { useContext } from "react";
import { StyleContext } from "../../core/StyleContext";
import { ColorPicker } from "antd";

export function Style() {
  const { style, handleColorChange } = useContext(StyleContext);

  return (
    <>
      <div className="flex-1">
        <div className="flex gap-2">
          <h1 className="text-2xl mb-2">Choose a Color:</h1>
          <ColorPicker
            defaultValue={style.baseColor} // Usa el color base como valor por defecto
            onChange={handleColorChange} // Usa la función global para actualizar los colores
            className="mb-4 items-center"
          />
        </div>

        <div className="shadow-2xl rounded-2xl p-4 pt-8 bg-white justify-self-start w-30 ">
          <h1 className="text-4xl mb-2" style={{ color: style.baseColor }}>
            Header 1
          </h1>
          <h2
            className="text-3xl mb-2"
            style={{ color: style.mediumBackgroundColor }}
          >
            Header 2
          </h2>
          <h3
            className="text-2xl mb-4"
            style={{ color: style.lightBackgroundColor }}
          >
            Header 3
          </h3>

          <button
            style={{ backgroundColor: style.baseColor, color: "#ffffff" }}
            className="px-4 py-2 rounded mt-4 mb-2"
          >
            Button 1
          </button>

          <button
            style={{
              backgroundColor: style.mediumBackgroundColor,
              color: "#ffffff",
            }}
            className="px-4 py-2 rounded mt-4 ml-2"
          >
            Button 2
          </button>
          
          <div className="flex m-1 gap-3">
          <div
            style={{ backgroundColor: style.lightBackgroundColor }}
            className="w-20 h-24 rounded-lg"
          ></div>

          <div
            style={{ backgroundColor: style.darkBackgroundColor }}
            className="w-20 h-24 rounded-lg"
          ></div>
          
          </div>
        </div>
      </div>
    </>
  );
}
