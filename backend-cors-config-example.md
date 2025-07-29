# Configuração de CORS para o Backend

Este arquivo contém exemplos de como configurar o CORS no backend para permitir requisições do frontend.

## Spring Boot (Java)

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("http://localhost:5174")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true);
    }
}
```

## Express.js (Node.js)

```javascript
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5174',
  credentials: true
}));
```

## Django (Python)

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5174",
]
CORS_ALLOW_CREDENTIALS = True
```

## ASP.NET Core (C#)

```csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddCors(options =>
    {
        options.AddPolicy("AllowFrontend",
            builder =>
            {
                builder.WithOrigins("http://localhost:5174")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials();
            });
    });
}

public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    app.UseCors("AllowFrontend");
    // ... outras configurações
}
```

## Solução Temporária para Desenvolvimento

Se não for possível modificar o backend imediatamente, você pode usar um proxy no frontend para contornar o problema de CORS durante o desenvolvimento.

### Vite (React)

```typescript
// vite.config.ts
export default defineConfig({
  // ... outras configurações
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
```

E então atualizar a configuração do Axios:

```typescript
// axios.ts
const api = axios.create({
  baseURL: '/api',
  // ... outras configurações
});
```

### Angular

```json
// angular.json
{
  "projects": {
    "your-app": {
      "architect": {
        "serve": {
          "options": {
            "proxyConfig": "src/proxy.conf.json"
          }
        }
      }
    }
  }
}
```

```json
// src/proxy.conf.json
{
  "/api": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true,
    "pathRewrite": {
      "^/api": ""
    }
  }
}
```

## Verificação de CORS

Para verificar se o CORS está configurado corretamente, você pode usar o seguinte comando curl:

```bash
curl -X OPTIONS -H "Origin: http://localhost:5174" -H "Access-Control-Request-Method: POST" http://localhost:8080/batches -v
```

A resposta deve incluir os seguintes headers:

```
Access-Control-Allow-Origin: http://localhost:5174
Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true
``` 