import React, { useState } from 'react';
import { Search, Plus, ChevronDown } from 'lucide-react';
import { Employee } from '../@types/interfaces/personnel';

function Personnel() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAlphabetical, setShowAlphabetical] = useState(false);
  const [showHiringDate, setShowHiringDate] = useState(false);
  const [showLastViewed, setShowLastViewed] = useState(false);

  const [employees] = useState<Employee[]>([
    { name: 'João Henrique', document: '072.395.156.98', registration: '5699811' },
    { name: 'João Henrique', document: '072.395.156.98', registration: '5699811' },
    { name: 'João Henrique', document: '072.395.156.98', registration: '5699811' },
    { name: 'João Henrique', document: '072.395.156.98', registration: '5699811' },
    { name: 'João Henrique', document: '072.395.156.98', registration: '5699811' },
    { name: 'João Henrique', document: '072.395.156.98', registration: '5699811' },
    { name: 'João Henrique', document: '072.395.156.98', registration: '5699811' },
  ]);

  const filteredEmployees = employees.filter(
    employee =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.document.includes(searchTerm) ||
      employee.registration.includes(searchTerm)
  );

  return (
    <div>
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-2xl font-bold text-gray-900">Funcionários</h2>
    </div>

    <div className="grid grid-cols-1 gap-8">
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Lista de Funcionários</h3>

        <button className="bg-green-600 text-white w-36 px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
        <Plus className="h-5 w-5" />
  <span>Adicionar</span>
</button>

      </div>
      </div>
  <div className="grid grid-cols-1 gap-8">
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Section */}
        <div className="lg:col-span-1">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-4">Filtrar por</h3>
            <div className="space-y-3">
              <button
                onClick={() => setShowAlphabetical(!showAlphabetical)}
                className="flex items-center justify-between w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50"
              >
                <span className="text-gray-600">Alfabética</span>
                <ChevronDown className={`h-5 w-5 transform transition-transform ${showAlphabetical ? 'rotate-180' : ''}`} />
              </button>

              <button
                onClick={() => setShowHiringDate(!showHiringDate)}
                className="flex items-center justify-between w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50"
              >
                <span className="text-gray-600">Data de Contratação</span>
                <ChevronDown className={`h-5 w-5 transform transition-transform ${showHiringDate ? 'rotate-180' : ''}`} />
              </button>

              <button
                onClick={() => setShowLastViewed(!showLastViewed)}
                className="flex items-center justify-between w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50"
              >
                <span className="text-gray-600">Último visualizado</span>
                <ChevronDown className={`h-5 w-5 transform transition-transform ${showLastViewed ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Employee List */}
        <div className="lg:col-span-3">
          {filteredEmployees.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {filteredEmployees.map((employee, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-4 hover:bg-gray-50 px-4 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center space-x-4">
                    <div>
                      <h4 className="font-medium text-gray-900">{employee.name}</h4>
                      <p className="text-sm text-gray-500">{employee.document}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-600">{employee.registration}</span>
                    <button className="px-4 py-2 text-green-600 hover:bg-green-50 rounded-md transition-colors">
                      Visualizar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              Nenhum funcionário encontrado
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
</div>
</div>

  );
}

export default Personnel;
