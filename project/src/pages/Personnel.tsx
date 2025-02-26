import React, { useState } from 'react';
import { Search, Plus, ChevronDown } from 'lucide-react';

interface Employee {
  name: string;
  document: string;
  registration: string;
}

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

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.document.includes(searchTerm) ||
    employee.registration.includes(searchTerm)
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Funcionários</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Adicionar</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-4">Filtrar por</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setShowAlphabetical(!showAlphabetical)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <span className="text-gray-600">Alfabética</span>
                  <ChevronDown className={`h-5 w-5 transform transition-transform ${showAlphabetical ? 'rotate-180' : ''}`} />
                </button>

                <button
                  onClick={() => setShowHiringDate(!showHiringDate)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <span className="text-gray-600">Data de Contratação</span>
                  <ChevronDown className={`h-5 w-5 transform transition-transform ${showHiringDate ? 'rotate-180' : ''}`} />
                </button>

                <button
                  onClick={() => setShowLastViewed(!showLastViewed)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <span className="text-gray-600">Último visualizado</span>
                  <ChevronDown className={`h-5 w-5 transform transition-transform ${showLastViewed ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Employee List */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow">
            {filteredEmployees.map((employee, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-gray-50"
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
        </div>
      </div>
    </div>
  );
}

export default Personnel;