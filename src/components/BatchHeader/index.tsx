import React from "react";
import { BatchHeaderProps } from "./types";
import { AlertCircle } from "lucide-react";

export const BatchHeader: React.FC<BatchHeaderProps> = ({ onNewBatch, error }) => (
  <div className="mb-6 bg-white rounded-xl px-4 sm:px-6 py-6 shadow">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
      <h1 className="text-2xl font-bold text-gray-900">
        Gerenciamento de Lotes e Aviários
      </h1>

      <button
        onClick={onNewBatch}
        className="flex items-center gap-2 bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded-md transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
        Cadastrar Lote
      </button>
    </div>

    <p className={`text-sm text-gray-600 ${error ? 'mb-4' : 'mb-0'}`}>
      Gerencie seus lotes e aviários de forma eficiente
    </p>

    {error && (
      <div className="flex items-center gap-2 p-3 mt-4 bg-red-50 border-l-4 border-red-600 rounded-md">
        <AlertCircle className="text-red-600 w-5 h-5" />
        <span className="text-red-600 text-sm">{error}</span>
      </div>
    )}
  </div>
);
