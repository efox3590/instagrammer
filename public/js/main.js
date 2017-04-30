(function() { // protect the lemmings

    function GET(url) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('GET', url);
            request.onload = () => {
                const data = JSON.parse(request.responseText);
                resolve(data)
            };
            request.onerror = (err) => {
                reject(err)
            };
            request.send();
        });
    } // GET

    function POST(url, data) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('POST', url);
            request.setRequestHeader('Content-Type', 'application/json');

            request.onload = () => {
                const data = JSON.parse(request.responseText);
                resolve(data)
            };
            request.onerror = (err) => {
                reject(err)
            };

            request.send(JSON.stringify(data));
        });
    } // POST

    function PUT(url, data) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('PUT', url);
            request.setRequestHeader('Content-Type', 'application/json');

            request.onload = () => {
                const data = JSON.parse(request.responseText);
                resolve(data)
            };
            request.onerror = (err) => {
                reject(err)
            };

            request.send(JSON.stringify(data));
        });
    } // POST

    function DELETE(url, data = {}) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('DELETE', url);
            request.setRequestHeader('Content-Type', 'application/json');

            request.onload = () => {
                const data = JSON.parse(request.responseText);
                resolve(data)
            };
            request.onerror = (err) => {
                reject(err)
            };

            request.send(JSON.stringify(data));
        });
    } // DELETE

/*
 *		REGISTER
 */

    if (location.pathname === '/register.html') {

        const btn = document.querySelector('.js-reg-btn');

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const fname = document.querySelector('.js-reg-fname').value;
            const lname = document.querySelector('.js-reg-lname').value;
            const email = document.querySelector('.js-reg-email').value;
            const pw1 = document.querySelector('.js-reg-pw1');
            const pw2 = document.querySelector('.js-reg-pw2');
            const message = document.querySelector('.js-reg-message');
            if (pw1.value !== pw2.value) {
                console.log('pw1 is :', pw1.value);
                console.log('pw2 is :', pw2.value);
                console.log('email :', email);
                message.innerHTML = `
<div class="ui error message">
	<div class="header">
		Passwords do not match!
	</div>
</div> 
<br>
				`;

				document.querySelector('.js-reg-pw1').focus();
			}  // end if
			else {	
				console.log('passwords match');
				console.log('pw1 is :', pw1.value);
				console.log('pw2 is :', pw2.value);
				console.log('email :',email);
				
    			POST('/auth/register', {
                    first_name: fname,
                    last_name: lname,
                    email: email,
                    password: pw1.value
                }).then((data) => {
                    if (data.success) {
                        window.location.href = '/login.html'
                    }
                });

			}	// else	
		}) // register btn event listener
	}	// register.html

/*
 *		LOGIN
 */

	if (location.pathname === '/login.html') {

		const email = document.querySelector('.js-log-email');
		const pw = document.querySelector('.js-log-pw');
		const btn = document.querySelector('.js-log-btn')

		btn.addEventListener('click', (e) => {
			e.preventDefault();

    		POST('/auth/login', {
    			email: email.value,
    			password: pw.value, 

    		})
    		.then((data) => {
    			localStorage.setItem('user_id', data.id);
                localStorage.setItem('fname', data.fname);
    			if (data.success) {
    				window.location.href = '/feed.html'
    			}
			
    		})	// then	
		}) // login btn event listener
	}	// login.html

/*
 *		FEED
 */

	if (location.pathname === '/feed.html') {
		
        const userId = localStorage.getItem('user_id');
        const first_name = localStorage.getItem('fname');
        
        const fname = document.querySelector('.fname');
        fname.innerHTML = `${first_name}`;

        GET('/api/' + userId + '/followedusers')
            .then((posts) => {
                render(posts);
            });

        function render(posts) {
            const container = document.querySelector('.js-feed');
            container.innerHTML = "";

            for (const feed of posts.followed_users) {
                const card = document.createElement('div');
                card.classList.add('ui', 'centered', 'card');
                const time = moment(feed.timestamp).fromNow();
                
                card.innerHTML = `
  <div class="content">
    <div class="right floated meta">${time}</div>
    <img class="ui avatar image" src="${feed.profile_pic}"> ${feed.user_fname}
  </div>
  <div class="image">
    <img src="${feed.image}">
  </div>
  <div class="content">
    <div class="description">
    ${feed.description}
    </div>
    </br>
    <span class="right floated">
      <i class="heart red outline icon js-heart-${feed.post_id}"></i>
    </span>
  </div>
  `;
                container.appendChild(card);

        const heart = document.querySelector(`.js-heart-${feed.post_id}`);
        heart.addEventListener('click', (e) => {
            e.preventDefault();
            heart.classList.toggle('outline');
        });
            }  // for / of
        } // render

        const signout = document.querySelector('.js-logout');
        signout.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    } // feed.html

/*
 *		PROFILE
 */

    if (location.pathname === '/profile.html') {
    	
// file upload / firebase code    	
        const validate = () => {
            throw new Error('This is a required arg');
        }; // validate

        const uploadFiles = (
            fileSelectSel = validate(),
            fileElemSel = validate(),
            onFileChanged = validate(),
            onClicked = validate()
        ) => {
            // select anchor tag and file input
            const fileSelect = document.querySelector(fileSelectSel);
            const fileElem = document.querySelector(fileElemSel);

            if (fileSelect === null || fileElem === null) {
                throw new Error('Required DOM elements not found by querySelector');
            }

            // click handler for fileElem
            fileSelect.addEventListener('click', (e) => {
                e.preventDefault();
                onClicked();
            });

            // change handler for fileSelect
            fileElem.addEventListener('change', (e) => onFileChanged(e.target.files))
        } // uploadFiles


        // Initialize Firebase
        const config = {
            apiKey: "AIzaSyA7rjzLhKWPj7c4VSVIcVP9u6NK2m2lhak",
            authDomain: "instragram-clone-8452c.firebaseapp.com",
            databaseURL: "https://instragram-clone-8452c.firebaseio.com",
            projectId: "instragram-clone-8452c",
            storageBucket: "instragram-clone-8452c.appspot.com",
            messagingSenderId: "721001345500"
        };
        // Name of file storage ref "folder"
        const FILE_STORAGE_REF = 'images';

        // initialize firebase
        firebase.initializeApp(config);
        // Get a reference to the storage service, which is used to create references in your storage bucket
        const storageRef = firebase.storage().ref().child(FILE_STORAGE_REF);

        let filesToUpload = [];

        uploadFiles('.js-fileSelect', '.js-fileElem', (files) => {
            filesToUpload = filesToUpload.concat(Array.from(files));
            // console.log('files to upload :',filesToUpload)
            if (!storageRef) {
                throw new Error('Storage Ref not set!');
            }
            const fileUploads = filesToUpload.map((currFile) => {
                // we store the name of the file as a storage ref
                const fileRef = storageRef.child(currFile.name);
                // we return a promise where we first "put" or upload the file
                // and then once the upload is complete, we return promise with
                // download URL string of the file we uploaded
                return fileRef.put(currFile).then((snapshot) => snapshot.downloadURL);
            });

            Promise.all(fileUploads).then((items) => {
                // console.log('snapshot.downloadURL :',items);
                localStorage.setItem('img_url', items[0])
                filesToUpload = [];

            });  


        }, () => {
          

        }); // upload files

// add new post
        const text = document.querySelector('.js-pro-caption');
        const addbtn = document.querySelector('.js-pro-btn');

        addbtn.addEventListener('click', (e) => {
            e.preventDefault();
            let fbImg = localStorage.getItem('img_url');

            POST('/api/' + userId + '/post', {
            	image_url: fbImg,
            	descr: text.value
            })
             .then(() => {
                text.value = "";
                GET('/api/user/' + userId)
                    .then((data) => {
                        render(data);
                })
            })
            .catch((e) => {
                 alert(e)
            });
        });

        const userId = localStorage.getItem('user_id')
        const first_name = localStorage.getItem('fname');
        const fname = document.querySelector('.fname');
        fname.innerHTML = `${first_name}`;

        GET('/api/user/' + userId)
        .then((data) => {
            render(data);
        }); 

        function render(data) {
                // console.log('this is data in profile/', data)
            const user = data["user"];
                // console.log('this is "user" in profile/:', user)
            const container = document.querySelector('.js-feed');
            container.innerHTML = '';
                // console.log('postItems :', user);
            for (const postItem of user) {
                    // console.log('single :', postItem);
                const div = document.createElement('div');
                div.classList.add('ui', 'centered', 'card', `js-post-item-${postItem.post_id}`);
                const img_url = postItem.image;
                const caption = postItem.description;
                const name = postItem.firstName;
                const profile_pic = postItem.profile_pic;
                // const time = moment(postItem.TimeStamp).format('dddd, MMMM DD, YYYY h:mm a');
                const time = moment(postItem.TimeStamp).fromNow();
    //             const fname = document.querySelector('.fname');
				// fname.innerHTML = `${first_name}`;
                div.innerHTML = `

<div class="content">
    <div class="right floated meta">${time}</div>
    <img class="ui avatar image" src="${profile_pic}"> ${name}
  </div>
  <div class="image">
    <img src=${img_url}>
  </div>
  <div class="content">
  	<input type="text" class="caption js-edit-caption" value="${caption}">
    </input>
    <span class="right floated">
      <i class="heart outline red icon js-heart"></i>
    </span>
  </div>
   <div class="extra content">
      <span class="right floated mods">
      	<i class="edit icon js-edit"></i>
        <i class="trash outline icon js-delete"></i>
      </span>  
  </div>
</div> 
	
		    `; // end div.innerHTML

                container.appendChild(div);

                const newCaption = div.querySelector('.js-edit-caption');
                newCaption.addEventListener('keydown', (e) => {
                    const {post_id} = postItem;
                    if (e.keyCode === 13) {

                        PUT('/api/' + userId + '/update/' + post_id, { descr: newCaption.value })
                            .then(() => {
                                GET('/api/user/' + userId)
                                    .then((data) => {
                                        render(data);
                                })
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                    }
                }); // newCaption event listener

                const edit = div.querySelector(`.js-edit`);
                edit.addEventListener('click', (e) => {
                    newCaption.focus();
                }); // edit icon event listenter

                const remove = div.querySelector(`.js-delete`);
                remove.addEventListener('click', (e) => {
                    const {post_id} = postItem;

                    DELETE('/api/' + userId + '/delete/' + post_id)
                        .then(() => {
                            GET('/api/user/' + userId)
                                .then((data) => {
                                    render(data);
                            })
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                })  // delete icon event listener

            } // for /of loop
        } // render()


        const signout = document.querySelector('.js-logout');
        signout.addEventListener('click', (e) => {
            e.preventDefault();
            logout();

        }); // log out event listener
    } // profile.html

/*
 *		EXPLORE
 */

 // view other users (to hopefully follow)
 		if (location.pathname === '/explore.html') {
            const userId = localStorage.getItem('user_id')
            const first_name = localStorage.getItem('fname');
            const fname = document.querySelector('.fname');
            fname.innerHTML = `${first_name}`;
            
            GET('/api/users')
                .then((posts) => {
                    render(posts);
                });

            function render(posts) {
                const accounts = posts.users
                const preview = accounts.reduce((hash, users) => Object.assign(
                    hash, {
                        [users.id]: (hash[users.id] || []).concat([users])
                    }
                ), {})

                const container = document.querySelector('.js-feed');
                container.innerHTML = "";

                for (const feed in preview) {
                    if (preview.hasOwnProperty(feed) && preview[feed] !== preview[userId]) {
                        const userRows = preview[feed];
                        const card = document.createElement('div');
                        card.classList.add('ui', 'card');
                        card.innerHTML = `
<div class="content">
    <div class="top">
         <div class="left floated author">
            <img class="ui avatar image" src="${userRows[0].profilePic}"> <strong>${userRows[0].firstName} </strong>
         </div>
         <span class="right floated">
             <button class="ui button primary js-follow-btn">Follow</button>
         </span>
    </div>
    <br><br>
    <div class="ui divider"></div>
        <div class="usersPhoto">
            <div class="ui four doubling cards">
              <div class="card">
                <div class="image">
                  <img src="${userRows[0].image}">
                </div>
              </div>
              <div class="card">
                <div class="image">
                  <img src="${userRows[1].image}">
                </div>
              </div>
              <div class="card">
                <div class="image">
                  <img src="${userRows[2].image}">
                </div>
              </div>
              <div class="card">
                <div class="image">
                  <img src="${userRows[3].image}">
                </div>
              </div>
            </div>
        </div>               
    </div>
</div>
                `;
                        container.appendChild(card);


                        const followBtn = card.querySelector('.js-follow-btn');
                        followBtn.addEventListener('click', (e) => {
                            const followed_id = feed;

                            if (followBtn.innerHTML === "Follow") {
                                POST('/api/' + userId + '/follow/' + followed_id, {
                                    user_id: userId,
                                    followed_id: followed_id
                                })
                                .then((data) => {
                                    followBtn.innerHTML = "Unfollow";
                                })
                            }
                            if (followBtn.innerHTML === "Unfollow") {
                                DELETE('/api/' + userId + '/unfollow/' + followed_id, {
                                    user_id: userId,
                                    followed_id: followed_id
                                })
                                .then((data) => {
                                    followBtn.innerHTML = "Follow";
                                })
                            }

                        }) // followBtn event listener

                        GET('/api/' + userId + '/followedusers')
                            .then((posts) => {
                                const arr = posts.followed_users; 
                                const magicFollowObj = arr.reduce((hash, followed_users) => Object.assign(
                                    hash, {
                                        [followed_users.follow_id]: (hash[followed_users.follow_id] || []).concat([followed_users])
                                    }
                                ), {})

                                for (user in magicFollowObj) {
                                    if (user === 10) {
                                        user.profile_pic = 'http://www.jigzone.com/p/jz/jzG/George_Washington.jpg';
                                    }

                                    if (feed === user) {
                                        followBtn.innerHTML = "Unfollow";
                                    }
                                    // console.log('one user in magicFollowObj // curr following', user)
                                }  // for user in magic loop
                                    
                        })  //GET

                    }   // if

                }  // for / in
            } //render

            const signout = document.querySelector('.js-logout');
            signout.addEventListener('click', (e) => {
                e.preventDefault();
                logout();

            });

 		} // explore.html

	function logout() {
		GET('/auth/logout')
			.then((data) => {
				// console.log('logout data :',data);
				localStorage.setItem('user_id', null);
				window.location.href = '/'
			})
		};


})();