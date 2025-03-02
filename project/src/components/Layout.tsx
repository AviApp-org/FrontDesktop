import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Settings, Bell, User, ChevronLeft, LayoutDashboard, FileText, Egg, DollarSign, ClipboardCheck, Users, FileInput, Layers } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <Egg className="h-8 w-8 text-green-600" />
            <span className="text-xl font-bold text-gray-900">AviApp</span>
          </div>
        </div>
        
        <nav className="p-4 space-y-2">
          <button
            onClick={() => navigate('/dashboard')}
            className={`w-full flex items-center space-x-2 p-2 rounded-lg transition-colors ${
              isActive('/dashboard')
                ? 'bg-green-50 text-green-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => navigate('/reports')}
            className={`w-full flex items-center space-x-2 p-2 rounded-lg transition-colors ${
              isActive('/reports')
                ? 'bg-green-50 text-green-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <FileText className="h-5 w-5" />
            <span>Relatórios</span>
          </button>

          <button
            onClick={() => navigate('/financial')}
            className={`w-full flex items-center space-x-2 p-2 rounded-lg transition-colors ${
              isActive('/financial')
                ? 'bg-green-50 text-green-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <DollarSign className="h-5 w-5" />
            <span>Financeiro</span>
          </button>

          <button
            onClick={() => navigate('/collection-review')}
            className={`w-full flex items-center space-x-2 p-2 rounded-lg transition-colors ${
              isActive('/collection-review')
                ? 'bg-green-50 text-green-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <ClipboardCheck className="h-5 w-5" />
            <span>Revisão de Coleta</span>
          </button>

          <button
            onClick={() => navigate('/personnel')}
            className={`w-full flex items-center space-x-2 p-2 rounded-lg transition-colors ${
              isActive('/personnel')
                ? 'bg-green-50 text-green-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Users className="h-5 w-5" />
            <span>Funcionários</span>
          </button>

          <button
            onClick={() => navigate('/data-entry')}
            className={`w-full flex items-center space-x-2 p-2 rounded-lg transition-colors ${
              isActive('/data-entry')
                ? 'bg-green-50 text-green-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <FileInput className="h-5 w-5" />
            <span>Entrada de Dados</span>
          </button>

          <button
            onClick={() => navigate('/batch-management')}
            className={`w-full flex items-center space-x-2 p-2 rounded-lg transition-colors ${
              isActive('/batch-management')
                ? 'bg-green-50 text-green-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Layers className="h-5 w-5" />
            <span>Lotes e Aviários</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ChevronLeft className="h-6 w-6 text-gray-500" />
                <h1 className="ml-2 text-xl font-semibold text-gray-900">GRANJA DE TESTE 1</h1>
              </div>
              <div className="flex items-center space-x-4">
                <Settings className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700" />
                <Bell className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700" />
                <User className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;