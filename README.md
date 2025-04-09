Projekat nije dovrsen, proizvodi se dodaju putem Postman-a.

# Shop

Prvi korak u pokretanju ovog projekta je da imamo instaliran Docker na svojim mašinama.


# Redis

Da bismo pokrenuli Redis server otvorimo terminal i idemo na lokaciju gde se nalazi root projekta.

Tu se nalazi docker fajl `docker-compose-redis.yml` sa Redis serverom koji pokrećemo sledećom komandom:

```bash
docker compose -f docker-compose-redis.yml up
```

# Instalacija

Instalacija biblioteka u root-u: 

```bash
npm install @nestjs/common
npm install @nestjs/core
npm install @nestjs/microservices
npm install @nestjs/typeorm
npm install @nestjs/typeorm sqlite3
npm install bootstrap
//npm install react-router-dom (u frontendu)
//npm install --save class-validation class-transformer (u svakom mikroserveru za validaciju)
```

Instalacija biblioteka na nivou `gateway`, `product`, `order` i `order-item` foldera.

Uđemo u folder `gateway` i pozovemo sledeću komandu u terminalu:

```bash
npm install
```

Zatim uradimo isto za `product`, `order` i `order-item`:

```bash
npm install
```

# Pokretanje

Nakon što smo uradili sve navedene korake, možemo da pokrenemo aplikaciju.

U folderu `gateway` pozovemo:

```bash
npm run start:dev # ova komanda pokreće server u watch modu koji osluškuje promene i sam se restartuje.
```

U folderima `product`, `order` i `order-item` pozovemo:

```bash
npm run start:dev
```

Pokretanje front-a:
```bash
cd frontend
npm install
npm run dev
```


