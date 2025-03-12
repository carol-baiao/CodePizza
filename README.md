# 🍕 CodePizza

CodePizza é um sistema completo para gerenciamento de pedidos em pizzarias. O sistema permite que os garçons registrem pedidos, que são exibidos na cozinha. O backend e frontend estão sendo desenvolvidos do zero, para fins de aprendizagem.

## 🚀 Tecnologias Utilizadas

- **Backend:** Node.js, TypeScript, Express, Prisma ORM, PostgreSQL, Multer (para upload de imagens), CORS, bcrypt (para criptografia de senhas)
- **Frontend:** Next.js, React Native (Ainda em desenvolvimento)
- **Autenticação:** JSON Web Token (JWT)
- **Banco de Dados:** PostgreSQL (com Prisma ORM)

## 📌 Funcionalidades

- 🏷️ **Cadastro de categorias** para organização dos produtos
- 📋 **Cadastro de produtos** (com imagens e categorias)
- 🏷️ **Gerenciamento de pedidos** (associando mesas e status)
- 🔥 **Interface para a cozinha** (visualização dos pedidos)
- 🔑 **Autenticação JWT** para segurança
- 🖼️ **Upload de imagens** armazenadas no backend (via Multer)

## 📂 Estrutura do Projeto

```
/CODEPIZZA
├── backend/
├── frontend/
├── README.md
├── .gitignore
```

### 📂 Estrutura do Backend

O backend segue o padrão MVC e utiliza o Prisma ORM para interação com o banco de dados PostgreSQL.

```
backend/
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│
├── src/
│   ├── config/ (Configuração do Multer)
│   ├── controllers/
│   ├── middlewares/
│   ├── prisma/ (Apenas para configuração)
│   ├── services/
│   ├── router/
│   ├── server.ts
│
├── tmp/ (Armazena imagens via Multer)
├── .env
```

### 📂 Estrutura do Frontend

Ainda em desenvolvimento.
<!--O frontend será desenvolvido utilizando Next.js para web e React Native para dispositivos móveis. A estrutura planejada será a seguinte:

```
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   ├── utils/
│   ├── App.tsx (No React Native)
│
├── public/ (Assets estáticos)
├── package.json
├── tsconfig.json
``` -->


## 🛠 Como Rodar o Projeto Localmente

### 📦 1. Clonar o Repositório
```bash
git clone https://github.com/seu-usuario/codepizza.git
cd codepizza
```

### ⚙ 2. Configurar as Dependências do Backend
```bash
cd backend
npm install  # ou yarn install
```

### 🛢 3. Configurar o Banco de Dados
1. Criar um arquivo `.env` na raiz do backend e configurar:
```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/codepizza"
JWT_SECRET="sua_chave_secreta"
```

2. Rodar as migrações:
```bash
npx prisma migrate dev
```

### ▶ 4. Rodar o Servidor Backend
```bash
npm run dev  # ou yarn dev
```


O servidor iniciará em http://localhost:3333

### ⚙ 5. Configurar as Dependências do Frontend
(Ainda em desenvolvimento)
<!--bash
cd frontend
npm install  # ou yarn install -->


### ▶ 6. Rodar o Frontend
(Ainda em desenvolvimento)
<!--bash
npm run dev  # ou yarn dev -->


## 🔗 Principais Rotas da API

(Ainda em desenvolvimento)

### 🧑 Usuários
- POST /users → Criar um usuário

### 🔑 Autenticação
- POST /session → Login de usuário (retorna JWT)

### 🍕 Produtos
- POST /product → Cadastrar produto
- GET /category/products/:category_id → Listar todos os produtos de determinada categoria

### 🏷 Categorias
- POST /category → Cadastrar categoria
- GET /category → Listar todas as categorias

### 🍽️ Pedidos
- POST /order → Criar pedido

## 📜 Licença
Este projeto é open-source e está sob a [MIT License](LICENSE).

---

## 📢 Créditos  
Este projeto foi originalmente desenvolvido por [Matheus Fraga](https://github.com/devfraga).  
Estou acompanhando o desenvolvimento e reproduzindo o projeto para fins de aprendizado.
