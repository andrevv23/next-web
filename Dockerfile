# Usa a imagem do Node.js como base
FROM node:20-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos do projeto
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install --only=production

RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Compila o código (caso use TypeScript)
RUN npm run build

# Expõe a porta do NestJS (alterar se necessário)
EXPOSE 3001

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]