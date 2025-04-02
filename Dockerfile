# Válasszuk ki az alapképet: Node.js 20
FROM node:20

# Állítsuk be a munkakönyvtárat
WORKDIR /app

# Másoljuk be a package.json és package-lock.json fájlokat
COPY package*.json ./

# Telepítsük a függőségeket
RUN npm install

# Másoljuk be a projekt összes fájlját
COPY . .

# Exponáljuk a 3000-es portot
EXPOSE 3000

# Indítsuk el a React appot
CMD ["npm", "start"]
