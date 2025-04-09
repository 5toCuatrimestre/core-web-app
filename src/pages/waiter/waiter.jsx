import React, { useContext, useState } from "react";
import { StyleContext } from "../../core/StyleContext";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import { rateWaiter } from "../../api/waiterApi";

export function Waiter() {
  const { style } = useContext(StyleContext);
  const [searchParams] = useSearchParams();
  const sellId = searchParams.get('sellId');

  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [ratingResult, setRatingResult] = useState(null);
  const [isAlreadyRated, setIsAlreadyRated] = useState(false);

  const handleStarClick = (index) => {
    if (!isLoading && !ratingResult && !isAlreadyRated) {
      setRating(index);
    }
  };

  const handleSubmit = async () => {
    if (isAlreadyRated) return;

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

    if (!sellId) {
      toast.error("No se proporcionó ID de venta", {
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

    try {
      setIsLoading(true);
      const response = await rateWaiter(sellId, rating);
      
      if (response.type === "SUCCESS") {
        setRatingResult(response.result);
        toast.success("¡Gracias por tu calificación!", {
          position: "top-center",
          duration: 2500,
          style: {
            borderRadius: "10px",
            background: style.BgCard,
            color: style.H1,
            border: `1px solid ${style.BgInterface}`,
          },
        });
      } else {
        if (response.text === "La venta ya se calificó") {
          setIsAlreadyRated(true);
        }
        toast.error(response.text || "Error al calificar", {
          position: "top-center",
          duration: 3000,
          style: {
            borderRadius: "10px",
            background: style.BgCard,
            color: style.H1,
            border: `1px solid ${style.BgInterface}`,
          },
        });
      }
    } catch (error) {
      console.error("Error al calificar:", error);
      const errorMessage = error.response?.data?.text || "Error al enviar la calificación";
      if (errorMessage === "La venta ya se calificó") {
        setIsAlreadyRated(true);
      }
      toast.error(errorMessage, {
        position: "top-center",
        duration: 3000,
        style: {
          borderRadius: "10px",
          background: style.BgCard,
          color: style.H1,
          border: `1px solid ${style.BgInterface}`,
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!sellId) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4" style={{ backgroundColor: style.BgInterface }}>
        <div className="w-full max-w-sm shadow-2xl rounded-2xl p-6" style={{ backgroundColor: style.BgCard, color: style.H1 }}>
          <h2 className="text-xl font-bold mb-4 text-center" style={{ color: style.H2 }}>
            Error
          </h2>
          <p className="text-center" style={{ color: style.H3 }}>
            No se proporcionó ID de venta para calificar
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4" style={{ backgroundColor: style.BgInterface }}>
      <div className="w-full max-w-sm shadow-2xl rounded-2xl p-6" style={{ backgroundColor: style.BgCard, color: style.H1 }}>
        <h2 className="text-xl font-bold mb-4 text-center" style={{ color: style.H2 }}>
          {ratingResult ? '¡Gracias por calificar!' : isAlreadyRated ? 'Venta ya calificada' : 'Califica tu experiencia'}
        </h2>
        {ratingResult && (
          <p className="text-center mb-4" style={{ color: style.H3 }}>
            Calificación registrada para {ratingResult.userName}
          </p>
        )}
        <div className="flex justify-center flex-wrap gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((index) => (
            <span
              key={index}
              onClick={() => handleStarClick(index)}
              className={`cursor-pointer text-3xl transition-all duration-200 ${
                (isLoading || ratingResult || isAlreadyRated) ? 'opacity-50' : ''
              }`}
              style={{ color: index <= rating ? "#facc15" : style.H3 }}
            >
              {index <= rating ? <StarFilled /> : <StarOutlined />}
            </span>
          ))}
        </div>
        <Button
          onClick={handleSubmit}
          disabled={isLoading || ratingResult || isAlreadyRated}
          className="w-full py-2 rounded-md mt-2"
          style={{
            background: (isLoading || ratingResult || isAlreadyRated) ? "#ccc" : style.BgButton,
            color: (isLoading || ratingResult || isAlreadyRated) ? "#666" : style.P,
            cursor: (isLoading || ratingResult || isAlreadyRated) ? "not-allowed" : "pointer",
          }}
        >
          {isLoading ? "Enviando..." : 
           ratingResult ? "Calificación enviada" : 
           isAlreadyRated ? "Venta ya calificada" : 
           "Calificar"}
        </Button>
      </div>
    </div>
  );
}
