# REDIS DOC

### 1. создание packege.json

```
npm init
```

### 2. Старт приложения
```
  "scripts": {
    "start": "node app"
     "dev": "nodemon app"
  },
```
### 3. Установка пакетов
```
pnpm install express body-parser redis method-override express-handlebars --save
```

### 4. Создать gitignore

### 5. Создать app.js

### 6. nodemon
```
pnpm add -D nodemon
```

### 7. Добавить шаблоны (views)
### 8. Подключить bootrstrap
### 9.  Create Redis Client
```
let client = redis.createClient()

```
### 10. Redis Docker Download
```
docker run --name redis -p 6379:6379 -d redis
```

### 11. If redis have downloaded
```
docker run -p 6379:6379 -d redis
```

### 12. redis HGETALL

```
app.post('/user/search', function(req, res, next){
let id = req.body.id;

    client.hGetAll(id, function(err, obj) {
        if (!obj){
            res.render('searchusers', {
                error: "User does not exit"
            })
        } else {
            obj.id = id;
            res.render('details', {
                user: obj
            })
        }
    })
})
```

### 13. redis HSET
```
docker ps
docker exec -it  naughty_benz  redis-cli
docker rename naughty_benz redis_local

docker exec -it  naughty_benz  redis-cli       
127.0.0.1:6379> HSET user01 first_name "Don" last_name "Trum" email "don_tr@gmail.com" phone "911"
(integer) 4
```

### 14. redis del



