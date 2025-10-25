# SEGUNDO PARCIAL — Docker, PostgreSQL y Docker Compose

--------------------------------------------------------

cd ~/parcial-docker-integrado

# construir imagen
docker build -t parcial-api .

# ejecutar contenedor
docker run -d --name parcial-api -p 3000:3000 parcial-api

# validar endpoints
curl -s http://localhost:3000/ | jq .
curl -s http://localhost:3000/health | jq .

-------------------------------------------

# crear volumen nombrado
docker volume create db_data

# ejecutar PostgreSQL (usuario/clave/db del documento)
docker run -d --name parcial-db \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=12345 \
  -e POSTGRES_DB=parcial_db \
  -v db_data:/var/lib/postgresql/data \
  -p 5432:5432 \
  postgres:16-alpine

# crear tabla y agregar registros de prueba
docker exec -it parcial-db psql -U admin -d parcial_db -c \
"CREATE TABLE IF NOT EXISTS estudiantes(id SERIAL PRIMARY KEY, nombre VARCHAR(100) NOT NULL);"

docker exec -it parcial-db psql -U admin -d parcial_db -c \
"INSERT INTO estudiantes(nombre) VALUES ('Ana'),('Luis') RETURNING *;"

# reiniciar y verificar que los datos persisten
docker restart parcial-db
docker exec -it parcial-db psql -U admin -d parcial_db -c "SELECT * FROM estudiantes;"

-----------------------------------------------------------------------------------------------

# levantar integración
docker compose up -d --build

# validar servicios, red y healthcheck
docker compose ps
curl -s http://localhost:3000/ | jq .
curl -s http://localhost:3000/health | jq .
docker network ls | grep app_net
