# instagrammer : an instragram clone for NYCDA group project
This is a group effort led by [@efox3590](https://github.com/efox3590) and [@chickenricer](https://github.com/chickenricer), students of NYCDA. We are implementing an IG clone with SQLite, Express, and a simple CSS Frontend Framework.

# Contributors:
+ Emily Fox [(@efox3590)](https://github.com/efox3590) - SQLite DB/ Passport Authentication
+ Linda Yu [(@chickenricer)](https://github.com/chickenricer) - Front End/ Passport Authentication

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
### user
* ID
* email
* first_name
* last_name
* profile_pic

### follower
* user_id
* follower_id

### activity 
* user_id
* activity_id
* activity_payload
* image_url
* descr
  
# API Routes/ Passport Auth
* app.get('/api/users/:id/posts')

# FE framework
* Semantic UI
