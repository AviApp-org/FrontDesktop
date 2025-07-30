# 🐣 AviApp Frontend

Frontend do **AviApp**, um sistema moderno de gestão para granjas poedeiras, desenvolvido com **React + Vite**, estilizado com **Tailwind CSS** e gerenciado com **Yarn**. Este projeto visa facilitar e automatizar o processo de coleta e análise de dados de produção para produtores agrícolas, promovendo eficiência, precisão e tomada de decisão baseada em dados.

## 🚀 Tecnologias

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router DOM](https://reactrouter.com/)
- [Axios](https://axios-http.com/)
- [Yarn](https://yarnpkg.com/)
- [Lucide Icons](https://lucide.dev/) (ou similar)
- [React Toastify](https://fkhadra.github.io/react-toastify/) (para notificações)

## 🎯 Objetivo

O AviApp foi criado com foco em **produtores de ovos**, permitindo:

- Registro diário de coletas por aviário
- Controle de produção por tipo de ovo
- Monitoramento de mortalidade das aves
- Visualização de relatórios analíticos e gráficos
- Gestão de usuários, granjas e lotes

## 📦 Instalação

1. **Clone o repositório:**

```bash
git clone https://github.com/seu-usuario/aviapp-frontend.git
cd aviapp-frontend
Instale as dependências com Yarn:

bash
Copiar
Editar
yarn
Crie um arquivo .env com as variáveis de ambiente:

env
Copiar
Editar
VITE_API_BASE_URL=http://localhost:8080/api
Rode o projeto em modo desenvolvimento:

bash
Copiar
Editar
yarn dev
🛠️ Scripts Disponíveis
Comando	Descrição
yarn dev	Inicia o servidor de desenvolvimento
yarn build	Gera a build para produção
yarn preview	Visualiza o build localmente
yarn lint	Executa o linter nos arquivos

📁 Estrutura do Projeto
graphql
Copiar
Editar
src/
├── components/       # Componentes reutilizáveis
├── contexts/         # Context API (auth, theme, etc.)
├── hooks/            # Hooks customizados
├── pages/            # Páginas e rotas principais
├── services/         # Comunicação com a API (Axios)
├── styles/           # Estilos globais e temas
├── types/            # Tipagens globais (TypeScript)
└── utils/            # Funções utilitárias
🔐 Autenticação
A autenticação é baseada em JWT e utiliza access tokens e refresh tokens para garantir segurança e persistência de sessão.

Tokens são armazenados de forma segura no sessionStorage

Interceptadores Axios garantem envio automático do token

Expiração do token é tratada com refresh automático

📊 Relatórios e Dashboards
Os dados coletados são exibidos em relatórios interativos, que permitem:

Filtro por aviário, data ou lote

Visualização diária, semanal ou mensal

Gráficos e resumos agregados por tipo de produção

📦 Backend
O backend do projeto está disponível neste repositório:
🔗 AviApp API (Spring Boot)
