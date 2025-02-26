import React from "react";

export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-10 backdrop-blur-sm">
      {/* Fondo borroso */}
      <div className="relative p-6 rounded-2xl bg-white bg-opacity-40 shadow-lg backdrop-blur-md w-30 h-30 flex justify-center items-center">

        {/* Spinner de carga con tono más suave */}
        <span className="w-10 h-10 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></span>
      </div>
    </div>
  );
}

export default LoadingSpinner;
