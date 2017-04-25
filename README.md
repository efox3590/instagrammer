# instagrammer : an instragram clone project
This is a group effort led by [@efox3590](https://github.com/efox3590) and [@chickenricer](https://github.com/chickenricer). We are implementing an IG clone with SQLite, Express, and a simple CSS Frontend Framework.

# Contributors:
+ Emily Fox [(@efox3590)](https://github.com/efox3590) - SQLite DB, Passport Authentication Firebase
+ Linda Yu [(@chickenricer)](https://github.com/chickenricer) - Front End, Passport Authentication, API Routes

# Installation Instructions
### Clone Project
```
$ git clone [this_repo] && cd [this_repo]
```

### Install Modules
```
$ npm install 
```
### Run Server
```
$ npm start
```

# DB Schemas
## Tables:
### users
* ID
* email
* first_name
* last_name
* profile_pic

### followers
* user_id
* follower_id

### posts 
* post_id
* user_id
* activity_id
* image_url
* descr
* timestamp
  
# API Routes/ Passport Authentication
GET('/api/users/')

# FE framework
* Semantic UI
