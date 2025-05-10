<h1 align="center">🍽️ API-Restaurant</h1>

<p align="center">
  API desenvolvida com Node.js para gerenciamento de pedidos em ambientes como restaurantes e bares. <br>
  Permite controlar o fluxo de atendimento às mesas, sessões e pedidos, além de gerenciar o catálogo de produtos.
</p>

---

## ✨ Funcionalidades

- Abertura e encerramento de sessões para atendimento de mesas
- Cadastro, listagem, atualização e remoção de produtos
- Criação e consulta de pedidos vinculados a sessões de mesas
- Visualização de todas as mesas cadastradas

---

## 📚 Endpoints

### 📦 Pedidos (`/orders`)

- `GET /orders/:tableSessionId`  
  Exibe os detalhes do pedido de uma sessão de mesa específica.

- `GET /orders/session/:tableSessionId`  
  Lista todos os pedidos vinculados a uma sessão de mesa.

- `POST /orders`  
  Cria um novo pedido (adiciona produtos a uma sessão de mesa).

---

### 🪑 Sessões de Mesa (`/table-sessions`)

- `POST /table-sessions`  
  Abre uma nova sessão de mesa (início do atendimento).

- `GET /table-sessions`  
  Lista todas as sessões em andamento (mesas abertas).

- `PATCH /table-sessions/:id/close`  
  Encerra uma sessão de mesa (finalização do atendimento/pagamento).

---

### 🧾 Mesas (`/tables`)

- `GET /tables`  
  Lista todas as mesas cadastradas no sistema.

---

### 🛒 Produtos (`/products`)

- `POST /products`  
  Cadastra um novo produto no catálogo.

- `GET /products`  
  Lista todos os produtos disponíveis.

- `PUT /products/:id`  
  Atualiza as informações de um produto (nome, preço, etc.).

- `DELETE /products/:id`  
  Remove um produto do catálogo.

---

<p align="center">
  <img alt="API Restaurant" src="https://github.com/brunooliveira7/API-Restaurant/blob/main/src/assets/API%20restaurant.png">
</p>

