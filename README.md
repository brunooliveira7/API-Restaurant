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
