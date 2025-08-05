import { AviaryData } from '@/@types/AviaryData';
import { BatchData } from '@/@types/BatchData';
import { CollectEggData } from '@/@types/CollectEggData';
import { Info } from 'lucide-react';

interface CollectionReviewTemplateProps {
  batches: BatchData[];
  aviaries: AviaryData[];
  eggCollects: CollectEggData[];
  selectedBatch: BatchData | null;
  selectedAviary: AviaryData | null;
  selectedCollect: CollectEggData | null;
  isLoading: boolean;
  eggTypeLabels: Record<string, string>;
  onBatchChange: (batchId: string) => void;
  onAviaryChange: (aviaryId: string) => void;
  onSelectCollect: (collect: CollectEggData) => void;
  currentDate: string;
  onDateChange: (date: string) => void;
}

export default function CollectsTemplate({
  batches,
  aviaries,
  eggCollects,
  selectedBatch,
  selectedAviary,
  selectedCollect,
  isLoading,
  eggTypeLabels,
  currentDate,
  onBatchChange,
  onAviaryChange,
  onSelectCollect,
  onDateChange
}: CollectionReviewTemplateProps) {
  return (
    <div className=" mx-auto p-4">
      <div className="bg-white rounded-2xl p-6 mb-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center p-5">
            <input
              type="date"
              value={currentDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>


        {/* Seletor de Lote/Aviário */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white p-5 rounded-xl ">
            <label className="block text-gray-700 font-medium mb-2">Selecione um Lote</label>
            <select
              value={selectedBatch?.id?.toString() || ''}
              onChange={(e) => onBatchChange(e.target.value)}
              disabled={isLoading}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            >
              <option value="">{isLoading ? 'Carregando...' : 'Selecione um lote'}</option>
              {batches.map((batch) => (
                <option key={batch.id} value={batch.id}>
                  {batch.name}
                </option>
              ))}
            </select>
          </div>

          {selectedBatch && (
            <div className="bg-white p-5 rounded-xl ">
              <label className="block text-gray-700 font-medium mb-2">Selecione um Aviário</label>
              <select
                value={selectedAviary?.id?.toString() || ''}
                onChange={(e) => onAviaryChange(e.target.value)}
                disabled={isLoading}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              >
                <option value="">Selecione um aviário</option>
                {aviaries.map((aviary) => (
                  <option key={aviary.id} value={aviary.id}>
                    {aviary.name} - Aves: {(
                      (aviary.currentAmountOfRooster ?? aviary.initialAmountOfRoosters) +
                      (aviary.currentAmountOfChickens ?? aviary.initialAmountOfChickens)
                    )}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Área de Resultados */}
        {selectedAviary ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Histórico de Coletas */}
            <div className="bg-white rounded-2xl border overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-teal-500 p-4">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <Info className="mr-2 h-5 w-5" />
                  Histórico de Coleta
                </h3>
              </div>
              <div className="p-5">
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
                  {eggCollects.length > 0 ? (
                    eggCollects.map((entry, index) => (
                      <div
                        key={index}
                        onClick={() => onSelectCollect(entry)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all hover:shadow-md ${selectedCollect?.id === entry.id
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                          }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-gray-600">
                              {new Date(entry.collectionDate).toLocaleTimeString('pt-BR', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false
                              })}
                            </span>                          </div>
                          <div className="text-lg font-bold text-green-600">
                            {entry.totalEggs} ovos
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10 text-gray-500">
                      Nenhuma coleta encontrada para esta data
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Detalhes da Coleta */}
            <div>
              {selectedCollect ? (
                <div className="bg-white rounded-2xl  border overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4">
                    <h3 className="text-lg font-semibold text-white">Detalhes da Coleta</h3>
                  </div>
                  <div className="p-6">
                    {/* Tipos de Ovos */}
                    <div className="mb-8">
                      <h4 className="text-md font-semibold text-gray-700 mb-4">Distribuição de Ovos</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {selectedCollect.eggDetails?.map((detail, idx) => (
                          <div
                            key={idx}
                            className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-100"
                          >
                            <div className="flex justify-between items-center">
                              <span className="text-gray-700 font-medium">
                                {eggTypeLabels[detail.type] || detail.type}
                              </span>
                              <span className=" text-orange-500 font-bold flex items-center justify-center">
                                {detail.quantity}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Resumo */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gradient-to-br from-green-50 to-teal-50 p-4 rounded-xl border border-green-200">
                        <div className="text-green-800 font-medium text-sm mb-1">Ovos de Mercado</div>
                        <div className="text-2xl font-bold text-gray-800">{selectedCollect.marketEggs}</div>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                        <div className="text-blue-800 font-medium text-sm mb-1">Ovos Incubáveis</div>
                        <div className="text-2xl font-bold text-gray-800">{selectedCollect.hatchableEggs}</div>
                      </div>
                      <div className="bg-gradient-to-br from-rose-50 to-pink-50 p-4 rounded-xl border border-rose-200">
                        <div className="text-rose-800 font-medium text-sm mb-1">Ovos Descartáveis</div>
                        <div className="text-2xl font-bold text-gray-800">{selectedCollect.dumpEggs}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 h-full rounded-2xl shadow-lg flex flex-col items-center justify-center p-8 text-center">
                  <Info className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Selecione uma coleta</h3>
                  <p className="text-gray-500">
                    Escolha uma entrada no histórico à esquerda para visualizar os detalhes
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl shadow-lg flex flex-col items-center justify-center py-16 text-center">
            <Info className="h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Selecione um aviário</h3>
            <p className="text-gray-500 max-w-md">
              Escolha um lote e depois um aviário para visualizar o histórico de coletas
            </p>
          </div>
        )}
      </div>
    </div>
  );
}