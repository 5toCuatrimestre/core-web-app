import React, { useContext, useState } from "react";
import { StyleContext } from "../../core/StyleContext";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";

export function Waiter() {
  const { style } = useContext(StyleContext);

  const token = "123abcTokenFalso";
  const [rating, setRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);
  const [hasShownToast, setHasShownToast] = useState(false);

  const handleStarClick = (index) => {
    if (!hasRated) setRating(index);
  };

  const handleSubmit = () => {
    if (hasRated && hasShownToast) return;

    if (hasRated && !hasShownToast) {
      setHasShownToast(true);
      toast.error("Este token ya ha sido utilizado", {
        position: "top-center",
        duration: 3000,
        style: {
          borderRadius: "10px",
          background: style.BgCard,
          color: style.H1,
          border: `1px solid ${style.BgInterface}`,
        },
      });
      return;
    }

    if (!rating) {
      toast.error("Selecciona una puntuación antes de calificar", {
        position: "top-center",
        duration: 3000,
        style: {
          borderRadius: "10px",
          background: style.BgCard,
          color: style.H1,
          border: `1px solid ${style.BgInterface}`,
        },
      });
      return;
    }

    console.log(`Token: ${token}, Puntuación: ${rating} estrellas`);
    setHasRated(true);
    toast.success("¡Gracias por calificar!", {
      position: "top-center",
      duration: 2500,
      style: {
        borderRadius: "10px",
        background: style.BgCard,
        color: style.H1,
        border: `1px solid ${style.BgInterface}`,
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4" style={{ backgroundColor: style.BgInterface }}>
      <div className="w-full max-w-sm shadow-2xl rounded-2xl p-6" style={{ backgroundColor: style.BgCard, color: style.H1 }}>
        <h2 className="text-xl font-bold mb-4 text-center" style={{ color: style.H2 }}>
          Puntuación del mesero
        </h2>
        <p className="text-lg mb-4 text-center" style={{ color: style.H3 }}>
          Mesero: <span className="font-semibold">Carlos Ramírez</span>
        </p>
        <div className="flex justify-center flex-wrap gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((index) => (
            <span
              key={index}
              onClick={() => handleStarClick(index)}
              className="cursor-pointer text-3xl transition-all duration-200"
              style={{ color: index <= rating ? "#facc15" : style.H3 }}
            >
              {index <= rating ? <StarFilled /> : <StarOutlined />}
            </span>
          ))}
        </div>
        <Button
          onClick={handleSubmit}
          disabled={hasRated}
          className="w-full py-2 rounded-md mt-2"
          style={{
            background: hasRated ? "#ccc" : style.BgButton,
            color: hasRated ? "#666" : style.P,
            cursor: hasRated ? "not-allowed" : "pointer",
          }}
        >
          {hasRated ? "Calificación enviada" : "Calificar"}
        </Button>
      </div>
    </div>
  );
}
