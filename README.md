<h1 align="center"> API-Restaurant </h1>

<p align="center">
API Nodejs que gerencia um sistema de pedidos para mesas em um ambiente como restaurante ou bar. Permite visualizar pedidos de uma mesa específica, listar todos os pedidos de uma sessão e criar novos pedidos. Controla o fluxo de atendimento às mesas, com rotas para abrir uma nova sessão, listar sessões em andamento e encerrar uma sessão (provavelmente gerando o pagamento). Disponibiliza a lista de todas as mesas cadastradas no sistema. E gerencia o catálogo de produtos, com rotas para cadastrar, listar, atualizar e remover produtos.
</p>
### Rotas

- **Orders (Pedidos)**

    **GET Show By Table Session:**

      Exibe detalhes do pedido para uma sessão de mesa específica.

    **GET Index By Table Session:**

      Lista todos os pedidos vinculados a uma sessão de mesa específica.

    **POST Create:**

      Cria um novo pedido (adiciona produtos a uma sessão de mesa).

- **Table Sessions (Sessões de Mesa)**

    **PATCH Close:**

      Fecha uma sessão de mesa (encerramento do atendimento, provavelmente gera o pagamento).

    **GET Index:**
  
      Lista todas as sessões de mesa em andamento (mesas abertas).

    **POST Open:**

      Abre uma nova sessão de mesa (iniciar atendimento a uma nova mesa).

- **Tables (Mesas)**

    **GET Index:**

      Lista todas as mesas cadastradas no sistema.

- **Products (Produtos)**

    **DELETE Remove:**

      Remove um produto do catálogo.

    **PUT Update:**

      Atualiza informações de um produto (nome, preço, etc.).

    **POST Create:**

      Cadastra um novo produto no catálogo.

    **GET Index:**

      Lista todos os produtos disponíveis.
