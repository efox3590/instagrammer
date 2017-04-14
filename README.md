# instagrammer : an instragram clone for NYCDA group project
This is a group effort led by @efox3590, @mariorangel10, and @chickenricer, students of NYCDA. We are implementing an IG clone with SQLite, Express, and a simple CSS Frontend Framework.

# Contributors:
+ Emily Fox (@efox3590) - SQLite DB
+ Mario Rangel (@mariorangel10) - API Routes/ Passport Authentication
+ Linda Yu (@chickenricer) - Front End

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
### User
* ID
* email
* first_name
* last_name
* profile_pic

### Followers
* user_id
* follower_id

### Activity 
* user_id
* activity_id
* activity_payload
  
# API Routes/ Passport Auth
* app.get('/api/users/:id/posts')

# FE framework
Bootstrap
