import React from "react";
import { BatchHeaderProps } from "./types";
import { AlertCircle } from "lucide-react";

export const BatchHeader: React.FC<BatchHeaderProps> = ({ onNewBatch, error }) => (
  <div className="flex flex-col gap-4">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Gerenciamento de Lotes e Aviários
        </h1>
        <p className="text-gray-600 mt-1">
          Gerencie seus lotes e aviários de forma eficiente
        </p>
      </div>

      <button
        onClick={onNewBatch}
        className="bg-gradient-to-r from-green-600 to-teal-600 text-white px-6 py-3 rounded-xl text-sm font-medium hover:from-green-700 hover:to-teal-700 transition-all shadow-md flex items-center justify-center gap-2"
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

    {error && (
      <div className="flex items-center gap-3 p-4 bg-red-50 border-l-4 border-red-600 rounded-lg">
        <AlertCircle className="text-red-600 w-5 h-5 flex-shrink-0" />
        <span className="text-red-600 text-sm">{error}</span>
      </div>
    )}
  </div>
);