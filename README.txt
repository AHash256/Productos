PRODUCTOS API - DOCUMENTACIÓN
=============================

API RESTful para gestionar productos, desarrollada con Node.js, Express, Firebase Firestore y autenticación JWT.

---------------------------------------------
FUNCIONALIDADES
---------------------------------------------

- Login con token JWT (simulado)
- CRUD de productos
- Base de datos alojada en Firebase Firestore

---------------------------------------------
CONFIGURACIÓN INICIAL
---------------------------------------------

1. Cloná el proyecto:

   git clone https://github.com/AHash256/Productos.git
   cd productos-api
   npm install

2. Crear archivo .env en la raíz del proyecto con el siguiente contenido:

   PORT=3000
   JWT_SECRET=tu_clave_secreta_jwt
   FIREBASE_PROJECT_ID=tu_project_id
   FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\ntu_clave_privada\n-----END PRIVATE KEY-----
   FIREBASE_CLIENT_EMAIL=xxxxx@xxxxx.iam.gserviceaccount.com

   * Los valores FIREBASE los obtenés desde Firebase > Configuración del proyecto > Cuentas de servicio

3. Ejecuta

npm run start

---------------------------------------------
AUTENTICACIÓN
---------------------------------------------

POST /login

BODY:
{
  "email": "admin@example.com",
  "password": "123456"
}

RESPUESTA:
{
  "token": "jwt_token_generado"
}

IMPORTANTE: Usar este token en el encabezado para los demás endpoints:

Authorization: Bearer TU_TOKEN_AQUÍ

---------------------------------------------
ENDPOINTS DISPONIBLES
---------------------------------------------

GET /products
  - Lista todos los productos

GET /products/:id
  - Muestra un producto específico

POST /products
  - Crea un nuevo producto
  - BODY:
    {
      "name": "Zapatilla de running para mujer",
      "price": 12999,
      "description": "Zapatillas cómodas con buena amortiguación",
      "stock": 25
    }

DELETE /products/:id
  - Elimina un producto por ID

TODOS LOS ENDPOINTS EXCEPTO LOGIN requieren JWT en los encabezados.

---------------------------------------------
CÓDIGOS DE ERROR 
---------------------------------------------

401 Unauthorized  →  Token faltante o inválido
403 Forbidden     →  Token expirado o corrupto
404 Not Found     →  Producto no encontrado
500 Server Error  →  Error interno o Firebase mal configurado

---------------------------------------------
ESTRUCTURA EN FIREBASE FIRESTORE
---------------------------------------------

Colección: products

Cada documento debe tener los siguientes campos:

- name: string
- price: number
- description: string
- stock

Ejemplo de valores:
  name: Zapatilla de running para mujer
  price: 12999
  description: Zapatillas cómodas con buena amortiguación
  stock: 10



---------------------------------------------
USO CON POSTMAN
---------------------------------------------

1. Hacer login (POST /login) y copiar el token
2. En los headers de las demás peticiones, usar:

Authorization: Bearer {{jwt_token}}

3. Para probar endpoints con ID, usar el campo {{product_id}}

Set Postman para pruebas (JSON)

{
  "info": {
    "name": "Productos API - Tests",
    "_postman_id": "abcd-1234-efgh-5678",
    "description": "Pruebas básicas para la API REST de productos con autenticación JWT",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Login - Obtener Token",
      "request": {
        "method": "POST",
        "header": [
          { "key": "Content-Type", "value": "application/json" }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"email\": \"admin@example.com\",\n  \"password\": \"admin123\"\n}"
        },
        "url": {
          "raw": "http://localhost:3000/auth/login",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["auth", "login"]
        }
      },
      "response": []
    },
    {
      "name": "Get All Products",
      "request": {
        "method": "GET",
        "header": [
          { "key": "Authorization", "value": "Bearer {{jwt_token}}" }
        ],
        "url": {
          "raw": "http://localhost:3000/api/products",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "products"]
        }
      },
      "response": []
    },
    {
      "name": "Get Product By ID",
      "request": {
        "method": "GET",
        "header": [
          { "key": "Authorization", "value": "Bearer {{jwt_token}}" }
        ],
        "url": {
          "raw": "http://localhost:3000/api/products/{{product_id}}",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "products", "{{product_id}}"]
        }
      },
      "response": []
    },
    {
      "name": "Create Product",
      "request": {
        "method": "POST",
        "header": [
          { "key": "Authorization", "value": "Bearer {{jwt_token}}" },
          { "key": "Content-Type", "value": "application/json" }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"Producto Demo\",\n  \"price\": 100,\n  \"description\": \"Producto de prueba\"\n}"
        },
        "url": {
          "raw": "http://localhost:3000/api/products/create",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "products", "create"]
        }
      },
      "response": []
    },
    {
      "name": "Delete Product",
      "request": {
        "method": "DELETE",
        "header": [
          { "key": "Authorization", "value": "Bearer {{jwt_token}}" }
        ],
        "url": {
          "raw": "http://localhost:3000/api/products/{{product_id}}",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "products", "{{product_id}}"]
        }
      },
      "response": []
    }
  ],
  "variable": [
    {
      "key": "jwt_token",
      "value": ""
    },
    {
      "key": "product_id",
      "value": ""
    }
  ]
}


