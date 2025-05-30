import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardCheck,
  FileBarChart,
  Home,
  Users,
  DollarSign,
  FileInput,
  Egg,
  UserPlus,
  Building2
} from 'lucide-react';

const sidebarItems = [
  { icon: LayoutDashboard, text: 'Dashboard', path: '/' },
  { icon: ClipboardCheck, text: 'Revisão de coletas', path: '/review' },
  { icon: FileBarChart, text: 'Relatórios', path: '/reports' },
  { icon: Home, text: 'Lotes e aviários', path: '/batches' },
  { icon: Users, text: 'Funcionários', path: '/employees' },
  { icon: UserPlus, text: 'Cadastro de Clientes', path: '/clients/register' },
  { icon: Building2, text: 'Cadastro de Granjas', path: '/farms/register' },
  { icon: DollarSign, text: 'Financeiro', path: '/financial' },
  { icon: FileInput, text: 'Entrada de dados', path: '/data-entry' },
];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-lg fixed h-full">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <div className="flex items-center">
              <Egg className="h-8 w-8 text-green-600 mr-2" />
              <h1 className="text-2xl font-bold text-green-900">Zuvo</h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 ${
                    isActive ? 'bg-green-50 text-green-600 border-r-4 border-green-600' : ''
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  <span className="text-sm font-medium">{item.text}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-6 border-t">
            <p className="text-sm text-gray-600">© 2022 Zuvo</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Fixed Header */}
        <header className="bg-white shadow-sm fixed w-[calc(100%-16rem)] z-10">
          <div className="px-6 py-4">
            <h2 className="text-2xl font-bold text-gray-900">
              {sidebarItems.find(item => item.path === location.pathname)?.text || 'Dashboard'}
            </h2>
          </div>
        </header>

        {/* Content */}
        <main className="p-8 max-w-[1920px] mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
