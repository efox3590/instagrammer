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


	// if (document.querySelector('.js-reg-fname') !== null){
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
				console.log('email :',email);
				// message.innerHTML = 'Passwords do not match.'
				message.innerHTML = `
<div class="ui error message">
	<div class="header">
		Passwords do not match!
	</div>
</div> 
<br>
				`;
				document.querySelector('.js-reg-pw1').focus();
			}  // if
			else {	//can be deleted. just for testing
				console.log('passwords match');
				console.log('pw1 is :', pw1.value);
				console.log('pw2 is :', pw2.value);
				console.log('email :',email);
				

// 				message.innerHTML = `
// <div class="ui success message">
//   <div class="header">
//     Your user registration was successful.
//   </div>
// </div>
// 				`;
			POST('/auth/register', {
                // fname,
                // lname,
                // email,
                // pw1,
                first_name: fname,
                last_name: lname,
                email: email,
                password: pw1.value
            }).then((data) => {
            	console.log('did this add a user?');
                console.log('data from post/register :', data)
                if (data.success) {
                    window.location.href = '/login.html'
                }
            });

			}	// else	
				

		}) // event listener

	}	// register.html

/*
 *		LOGIN
 */


	// if (document.querySelector('.js-log-email') !== null){
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
			console.log('POST auth/login data', data);
			if (data.success) {
				window.location.href = '/feed.html'
			}
			
		})		

		}) // event listener
			
	}	// login.html

/*
 *		FEED
 */

	if (location.pathname === '/feed.html') {
		// const fname = document.querySelector('.fname');
		// const {value} = fname;
		// value.innerHTML = ``;

// order by time to sort array

		function render(data) {
			const user = data["user"];
			const container = document.querySelector('.js-feed');
			container.innerHTML = '';
			// user = user.reverse(); 
			console.log('postItems :',user);
// more likely for (const user of users) {
// replace( (postItem: user), (postItems: users) )
			for (const postItem of user) {
				console.log('single :',postItem);
				console.log('each user id :',postItem["id"]);
				const id = postItem["id"];
// 
		    const div = document.createElement('div');
			div.classList.add('ui', 'centered', 'card', `js-post-item-${postItem.id}`);
	// need vars for: image url, caption, commenter_id, commenter_comment
			const img_url = postItem.image_url;
			const caption = postItem.descr;
			const name = postItem.first_name;
			// const time = postItem.TimeStamp;
			const time = moment(postItem.TimeStamp).format('dddd, MMMM DD, YYYY h:mm a');

			const fname = document.querySelector('.fname');
			fname.innerHTML = `${name}!`;
			// const comm_id = 
			// const comm_comment = 
		    div.innerHTML = `

<div class="content">
    <div class="right floated meta">${time}</div>
    <img class="ui avatar image" src="../assets/puppy.jpg"> ${name}
  </div>
  <div class="image">
    <img src=${img_url}>
  </div>
  <div class="content">
  	<div class="caption">
      ${caption}
    </div>
    <span class="right floated">
      <i class="heart outline red icon js-heart"></i>
      <!-- 17 likes -->
    </span>
  <!--   <i class="comment icon"></i>
    3 comments -->
  </div>
	
		    `; // end div.innerHTML

		    container.appendChild(div);

		    //need to isolate proper element
		 //    if (postItem.data.isLiked) {
			// 	li.innerHTML += `<span class="glyphicon glyphicon-heart js-like"></span>`
			// }
			// else {
			// 	li.innerHTML += `<span class="glyphicon glyphicon-heart-empty js-like"></span>`
				// }

			} // for /of loop

		} // render()

		GET('/api/user/2')
		.then((data) => {
			render(data);
		});

		// const comm = document.querySelector('.js-comm-input');
		// const comment = comm.value;

		// const heart = document.querySelector('.js-heart');
		// heart.addEventListener('click', (e) => {
		// 	e.preventDefault();
		// 	// heart.classList.add('red', 'js-red-heart');
		// 	// heart.classList.remove('outline', 'js-empty-heart');
		// 	heart.classList.toggle('outline');
		// });

		const signout = document.querySelector('.js-logout');
		signout.addEventListener('click', (e) => {
			e.preventDefault();
			logout();

			// GET('/auth/logout')
			// .then((data) => {
			// 	console.log('logout data :',data);
			// 	window.location.href = '/'
			// })
		});

	} // feed.html

//hard code for testing should be /:user_id of session or s.t

/*
 *		ADMIN
 */

	if (location.pathname === '/admin.html') {
const validate = () => {
            throw new Error('This is a required arg');
        }; // validate

        const uploadFiles = (
            fileSelectSel = validate(),
            fileElemSel = validate(),
            onFileChanged = validate()
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
                fileElem && fileElem.click();
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

        uploadFiles('.js-fileSelect', '.js-fileElem', (files) => {
            if (!storageRef) {
                throw new Error('Storage Ref not set!');
            }
            const fileUploads = Array.from(files).map((currFile) => {
                // we store the name of the file as a storage ref
                const fileRef = storageRef.child(currFile.name);
                // we return a promise where we first "put" or upload the file
                // and then once the upload is complete, we return promise with
                // download URL string of the file we uploaded
                return fileRef.put(currFile).then((snapshot) => snapshot.downloadURL);
            });

            Promise.all(fileUploads).then((items) => {
                console.log(items);
            });
        }); // upload files
// add new post
		const caption = document.querySelector('.js-adm-caption');
		const addbtn = document.querySelector('.js-adm-btn');

		addbtn.addEventListener('click', (e) => {
			e.preventDefault();

			// add post to activity feed for user

			instaApp.createPost(user_id); // or something
		});

// render 	
		function render(data) {
			const user = data["user"];
			const container = document.querySelector('.js-feed');
			container.innerHTML = '';
			// user = user.reverse(); 
			console.log('postItems :',user);
// more likely for (const user of users) {
// replace( (postItem: user), (postItems: users) )
			for (const postItem of user) {
				console.log('single :',postItem);
// 
		    const div = document.createElement('div');
			div.classList.add('ui', 'centered', 'card', `js-post-item-${postItem.id}`);
	// need vars for: image url, caption, commenter_id, commenter_comment
			const img_url = postItem.image_url;
			const caption = postItem.descr;
			const name = postItem.first_name;
			// const time = moment(postItem.TimeStamp).format('dddd, MMMM DD, YYYY h:mm a');
			const time = moment(postItem.TimeStamp).format('dddd, MMMM DD, YYYY h:mm a');

			// const comm_id = 
			// const comm_comment = 
		    div.innerHTML = `

<div class="content">
    <div class="right floated meta">14h ${time}</div>
    <img class="ui avatar image" src="../assets/puppy.jpg"> ${name}
  </div>
  <div class="image">
    <img src=${img_url}>
  </div>
  <div class="content">
  	<div class="caption">
      ${caption}
    </div>
    <span class="right floated">
      <i class="heart outline red icon js-heart"></i>
      <!-- 17 likes -->
    </span>
  <!--   <i class="comment icon"></i>
    3 comments -->
  </div>
   <div class="extra content">
    <div class="ui large transparent left icon input">
      <i class="comment icon"></i>
      <input placeholder="Add Comment..." type="text" class="js-adm-comment">
    </div>
      <div class="extra content">
      <span class="right floated mods">
      	<i class="edit icon"></i>
	    <i class="trash outline icon"></i>
	  </span>  
	</div>
  </div>
</div> 
	
		    `; // end div.innerHTML

		    container.appendChild(div);

		    //need to isolate proper element
		 //    if (postItem.data.isLiked) {
			// 	li.innerHTML += `<span class="glyphicon glyphicon-heart js-like"></span>`
			// }
			// else {
			// 	li.innerHTML += `<span class="glyphicon glyphicon-heart-empty js-like"></span>`
				// }

			} // for /of loop

		} // render()

		GET('/api/user/2')
		.then((data) => {
			render(data);
		});


// add comment
		const comm_input = document.querySelector('.js-adm-comment');

		// comm_input.addEventListener('keydown', (e) => {
		// 	const {value} = comm_input;
		// 	if (e.keyCode === 13) {
		// 		validateSearch(value)
		// 		.then((data) => {
		// 			PUT('/api/ comment route') // needs add comm route	
		// 			.then((data) => {
		// 				render(data);
		// 			})
		// 			.catch((e) => {
		// 				alert(e)
		// 			})
		// 		})


		// 	} 
			// keycode
		// }); 
		// comm_input eventListener // add comment

// need to be targeted with post id or something.
// otherwise only grabs first icon in thread.

// toggle heart for likes
		// const heart = document.querySelector('.js-heart');
		// heart.addEventListener('click', (e) => {
		// 	e.preventDefault();
		// 	// heart.classList.add('red', 'js-red-heart');
		// 	// heart.classList.remove('outline', 'js-empty-heart');
		// 	heart.classList.toggle('outline');
		// });

		const signout = document.querySelector('.js-logout');
		signout.addEventListener('click', (e) => {
			e.preventDefault();
			logout();

		});
	} // admin.html



	function logout() {
		GET('/auth/logout')
			.then((data) => {
				console.log('logout data :',data);
				window.location.href = '/'
			})
		};

	
})();