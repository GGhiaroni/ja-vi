import React from "react";

const LoadingSpinner: React.FC = () => (
  <div className="flex justify-center items-center h-48">
    <div
      className="animate-spin rounded-full h-12 w-12 border-b-2 border-(--color-ja-vi-secondary)"
      aria-label="Carregando conteúdo"
    />
    <p className="ml-4 text-(--color-ja-vi-secondary)">Carregando...</p>
  </div>
);

export default LoadingSpinner;
