# Estágio de build
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm ci

# Instalar cssnano que está faltando
RUN npm install --save-dev cssnano

# Copiar código fonte
COPY . .

# Build da aplicação pulando verificação do TypeScript
RUN npx vite build

# Estágio de produção
FROM nginx:alpine

# Copiar arquivos buildados para o nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuração customizada do nginx
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expor porta 80
EXPOSE 80

# Comando para iniciar o nginx
CMD ["nginx", "-g", "daemon off;"]
