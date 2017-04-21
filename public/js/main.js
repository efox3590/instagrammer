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
			if (pw1 !== pw2.value) {
				console.log('pw1 is :', pw1.value);
				console.log('pw2 is :', pw2.value);
				// message.innerHTML = 'Passwords do not match.'
				message.innerHTML = `
<div class="ui error message">
	<div class="header">
		Passwords do not match!
	</div>
</div> 
<br>
				`;
				pw1.focus();
			}  // if
			else {	//can be deleted. just for testing
				console.log('pw1 is :', pw1.value);
				console.log('pw2 is :', pw2.value);
				message.innerHTML = `
<div class="ui success message">
  <div class="header">
    Your user registration was successful.
  </div>
</div>
				`;
// route to add user to db
			POST('/api/users', {
				first_name: fname,
     			last_name: lname,
     			email: email,
     			password: pw2,
     			profile_pic: null
			})			
			.then((data) => {
				console.log('added a user', data)
			})

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
			console.log('data', data);
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
		const name = document.querySelector('.fname');
		const {fname} = 
		name.innerHTML = ``;



		function render(user) {
			const container = document.querySelector('.js-feed');
			container.innerHTML = '';
			// postItems = postItems.reverse();

			console.log('postItems :',user);
// more likely for (const user of users) {
// replace( (postItem: user), (postItems: users) )
			for (const postItem of user) {
				console.log('single :',postItem);
// 
		    const div = document.createElement('div');
			div.classList.add('ui', 'centered', 'card', `js-post-item-${postItem.id}`);
	// need ${vars} for: image url, caption, commenter_id, commenter_comment
			const img_url = postItem.image_url;
			console.log(img_url);
			const caption = postItem.descr;
			console.log(caption)
			// const timeStamp = moment(postItem.data.when).format('dddd, MMMM DD, YYYY h:mm a');
			// not quite sure what the data looks like when it comes back
			// need to discus with team

			// const comm_id = 
			// const comm_comment = 
		    div.innerHTML = `
	  <div class="image">
	    // <img src="../assets/puppy.jpg">
	    <img src=${img_url}>
	    
	  </div>
	  <div class="content">
	    <div class="caption">
	      // Bear wanted to walk in the water. So cute!
	      ${caption}
	    </div>
	    <div class="meta">$TimeStamp</div>
	    <a>
	      <i class="heart icon"></i>
	    </a>
	      0 Likes
	    <div class="comments">
		   // <p><strong>Bob: </strong>What a great puppy.</p>
		   <p><strong>$some_user_id: </strong>$comment</p>
	    </div>
	  </div>
	 <!--  <div class="extra content">
	  </div> -->
	  <div class="extra content">
	  	<form class="ui form">
		  <div class="field">
		    <label>Leave a Comment</label>
		      <div class="field">
		        <input name="feed[comment]" placeholder="Leave a Comment" type="text" class="js-feed-comment">
		      </div>
			</div>
		</form>


	</div>
		    `; // end li.innerHTML
		    console.log(div);
		    

		    //need to isolate proper element
		 //    if (postItem.data.isLiked) {
			// 	li.innerHTML += `<span class="glyphicon glyphicon-heart js-like"></span>`
			// }
			// else {
			// 	li.innerHTML += `<span class="glyphicon glyphicon-heart-empty js-like"></span>`
				// }

			} // for /of loop

		} // render()

		// const comm = document.querySelector('.js-comm-input');
		// const comment = comm.value;


	} // feed.html

/*
 *		ADMIN
 */

	if (location.pathname === '/admin.html') {

// add new post
		const caption = document.querySelector('.js-adm-caption');
		const addbtn = document.querySelector('.js-adm-btn');

		addbtn.addEventListener('click', (e) => {
			e.preventDefault();

			// add post to activity feed for user
			instaApp.createPost(user_id); // or something
		});

// add comment
		const comm_input = document.querySelector('.js-adm-comment');

		comm_input.addEventListener('keydown', (e) => {
			const {value} = comm_input;
			if (e.keyCode === 13) {
				validateSearch(value)
				.then((data) => {
					PUT('/api/ comment route') // needs add comm route	
					.then((data) => {
						render(data);
					})
					.catch((e) => {
						alert(e)
					})
				})


			} // keycode
		}); // comm_input eventListener // add comment

// need to be targeted with post id or something.
// otherwise only grabs first icon in thread.

// toggle heart for likes
		const heart = document.querySelector('.js-heart');
		heart.addEventListener('click', (e) => {
			e.preventDefault();
			// heart.classList.add('red', 'js-red-heart');
			// heart.classList.remove('outline', 'js-empty-heart');
			heart.classList.toggle('outline');
		});

	} // admin.html

	// GET('/api/user/:id')
	// 	.then((user) => {
	// 		render(user);
	// 	});

})();