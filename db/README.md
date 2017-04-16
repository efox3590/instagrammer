Pulling the following queries: 

```
SELECT
    d.id as id,
    d.follow_id as follow_id,

    e.first_name as user_first_name,
    e.id as user_id,
    e.last_name as user_last_name,
    e.email as user_email,
    e.password as user_password
   

FROM  followers as d 
INNER JOIN activity as ed on d.id = ed.activity_id
INNER JOIN user as e on e.id = ed.id
WHERE d.follow_id = ${followers_id}

```

```
SELECT
    d.id as id,
    d.follow_id as follow_id,

    e.first_name as user_first_name,
    e.id as user_id,
    e.last_name as user_last_name,
    e.email as user_email,
    e.password as user_password
   

FROM  followers as d 
INNER JOIN activity as ed on d.id = ed.activity_id
INNER JOIN user as e on e.id = ed.id
WHERE e.id = ${user_id}
```

```
SELECT
    d.id as id,
    d.follow_id as follow_id,

    e.first_name as user_first_name,
    e.id as user_id,
    e.last_name as user_last_name,
    e.email as user_email,
    e.password as user_password
   

FROM  followers as d 
INNER JOIN activity as ed on d.id = ed.activity_id
INNER JOIN user as e on e.id = ed.id
WHERE ed.activity_id = ${activity_id}
```
