# Digital Menu

Uma base de cardápio digital moderna, responsiva e reutilizável para restaurantes, lanchonetes e negócios de alimentação.

O Digital Menu é um projeto pensado para transformar o tradicional cardápio em uma experiência digital completa, permitindo que o cliente consulte produtos, monte seu pedido e envie a solicitação diretamente pelo WhatsApp do estabelecimento.

## 🎯 Objetivo

Criar uma solução simples para o cliente e prática para o estabelecimento.

### Para o cliente

- Encontrar produtos rapidamente
- Navegar por categorias
- Personalizar produtos
- Adicionar observações
- Montar o carrinho
- Escolher retirada ou entrega
- Informar endereço
- Selecionar forma de pagamento
- Calcular troco
- Visualizar o resumo do pedido
- Enviar o pedido diretamente pelo WhatsApp

### Para o estabelecimento

- Gerenciar categorias
- Cadastrar e editar produtos
- Alterar preços
- Ativar ou desativar produtos
- Configurar adicionais e opções
- Definir regiões e taxas de entrega
- Informar horários de funcionamento
- Definir o WhatsApp responsável pelos pedidos

## 🧩 Stack

- React
- JavaScript
- CSS
- Vite
- Supabase (planejado)
- PostgreSQL (planejado)
- Vercel (planejado)

## 🏗️ Estrutura do projeto

```bash
cardapio-digital/
├── docs
    ├── design
├── public/
├── src/
|   ├── assets
│   ├── components/
|   ├── context/
|   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── styles/
|  ├── utils
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env.example
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── vite.config.js
└── package-lock.json
```

## 🚀 Como executar

1. Instale as dependências:

```bash
npm install
```

2. Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

3. Acesse a aplicação no navegador:

```bash
http://localhost:5173
```

## 🔧 Variáveis de ambiente

Copie o arquivo de exemplo e configure os valores do projeto:

```bash
cp .env.example .env
```

Exemplo:

```env
VITE_SUPABASE_URL=https://SEU_PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon
```

## 📌 Roadmap

### Fase 01 — Base

- [x] Inicialização do projeto
- [x] Estrutura básica de arquivos
- [x] Componentes iniciais
- [x] Navegação do cardápio
- [x] Produtos e categorias

### Fase 02 — Pedido

- [x] Carrinho
- [x] Adicionais
- [x] Observações
- [ ] Checkout
- [ ] WhatsApp

### Fase 03 — Backend

- [ ] Banco de dados
- [ ] Supabase
- [ ] Configurações do estabelecimento
- [ ] Entregas e taxas

## 💡 Observação

Este projeto foi pensado como uma base reutilizável para diferentes estabelecimentos, mantendo a lógica principal do sistema e permitindo personalização visual e de configuração conforme o cliente.

---

Digital Menu — do cardápio ao pedido, em uma experiência simples.
