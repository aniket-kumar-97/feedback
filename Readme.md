API

`Signup` <br>
```
curl --location 'http://localhost:8080/api/v1/signup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "sss",
    "email": "aaa22111@gail.com",
    "password": "hebfjknfk",
    "phone": "0987543251"
}'
```
`Signin`

```
curl --location 'http://localhost:8080/api/v1/login' \
--header 'Content-Type: application/json' \
--data-raw '{
   "email": "aaa22111@gail.com",
    "password": "hebfjknfk"
}'
```

`Create feedback`

```
curl --location 'http://localhost:8080/api/v1/create-customer-feedback' \
--header 'Content-Type: application/json' \
--data '{
    "userId": "sss",
    "rating": "1",
    "wearing_mask": "yes",
    "packet_left_doorstep": "yes",
    "delivery_comment": "hhha ",
    "food_rating": "5",
    "food_quality_rating": "6",
    "restaurant_comment": "fff"
    
}'
```

`create feedback`

```
curl --location 'http://localhost:8080/api/v1/feedbackByUserId/64313550dfa9117f230f3756'
```
