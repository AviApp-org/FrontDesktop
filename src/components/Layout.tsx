import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ClipboardCheck,
  FileBarChart,
  Home,
  Users,
  DollarSign,
  Egg,
  UserPlus,
  Building2,
  LogOut,
  Menu
} from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}  


const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { logout, user } = useAuthContext();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const sidebarItems = [
    { icon: LayoutDashboard, text: 'Dashboard', path: '/', requiredRole: null },
    { icon: ClipboardCheck, text: 'Histórico de coletas', path: '/collects', requiredRole: null },
    { icon: FileBarChart, text: 'Relatórios', path: '/reports', requiredRole: null },
    { icon: Home, text: 'Lotes e aviários', path: '/batches', requiredRole: null },
    { icon: Users, text: 'Funcionários', path: '/employees', requiredRole: null },
    { icon: DollarSign, text: 'Financeiro', path: '/financial', requiredRole: null },
    { icon: UserPlus, text: 'Cadastro de Clientes', path: '/clients/register', requiredRole: 'ADMIN' },
    { icon: Building2, text: 'Cadastro de Granjas', path: '/farms/register', requiredRole: 'ADMIN' },
  ].filter(item => !item.requiredRole || user?.role === item.requiredRole);

  const handleLogout = () => {
    logout();
  };
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-svh bg-gray-100">
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-20 bg-white p-2 rounded-md shadow-sm"
      >
        <Menu className="h-6 w-6" />
      </button>

      <div
        className={`w-64 bg-white shadow-lg fixed h-full transition-all duration-300 z-10 
          ${sidebarOpen ? 'left-0' : '-left-64'} 
          md:left-0`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <div className="flex items-center">
              <Egg className="h-8 w-8 text-green-600 mr-2" />
              <h1 className="text-3xl font-bold text-green-900">FREYR</h1>
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
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 ${isActive ? 'bg-green-50 text-green-600 border-r-4 border-green-600' : ''
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
            <p className="text-sm text-gray-600">© 2022 Freyr</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm fixed top-0 left-0 w-full md:w-[calc(100%-16rem)] md:left-64 z-20 flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl md:text-3xl font-bold text-green-600">
            {sidebarItems.find(item => item.path === location.pathname)?.text || 'Dashboard'}
          </h1>
          <button
            onClick={handleLogout}
            className="text-gray-600 hover:text-red-600 transition-colors"
            title="Sair"
          >
            <LogOut className="h-5 w-5 md:h-6 md:w-6" />
          </button>
        </header>

        {/* Content */}
        <main className="p-8 md:p-12 max-w-full mx-auto pt-16 md:pt-24">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;