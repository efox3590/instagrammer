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

	// if (document.querySelector('.js-reg-fname') !== null){
	if (location.pathname === '/register.html') {

		const fname = document.querySelector('.js-reg-fname');
		const lname = document.querySelector('.js-reg-lname');
		const email = document.querySelector('.js-reg-email');
		const pw1 = document.querySelector('.js-reg-pw1');
		const pw2 = document.querySelector('.js-reg-pw2');
		const btn = document.querySelector('.js-reg-btn');
		const message = document.querySelector('.js-reg-message');

		btn.addEventListener('click', (e) => {
			e.preventDefault();
			if (pw1.value !== pw2.value) {
				console.log('pw1 is :', pw1.value);
				console.log('pw2 is :', pw2.value)
				message.innerHTML = 'Passwords do not match.'
				pw2.focus();
			} 
			else {	//can be deleted. just for testing
				message.innerHTML = 'good job. passwords match'
			// route to add user to db
			// POST('/api/user' )
			

			}		
				

		}) // event listener

	}	// register.html

	// if (document.querySelector('.js-log-email') !== null){
	if (location.pathname === '/login.html') {

		const email = document.querySelector('.js-log-email');
		const pw = document.querySelector('.js-log-pw');
		const btn = document.querySelector('.js-log-btn')

		btn.addEventListener('click', (e) => {
			//  SEND LOGIN INFORMATIUIN TO PASSPORT ROUTE,
			console.log('need passport auth')
		// run passport authentication logic !!! 

		// POST('/api/')

		})
			
	}	// login.html

	if (location.pathname === '/feed.html') {



		function render(postItems) {
			const container = document.querySelector('.js-feed');
			container.innerHTML = '';
			postItems = postItems.reverse();

			// console.log('postItems :',postItems);
			for (const postItem of postItems) {
// 
		    const div = document.createElement('div');
			div.classList.add('ui', 'centered', 'card', `js-blog-item-${postItem.id}`);
	// need ${vars} for: image url, caption, commenter_id, commenter_comment
			const img_url = postItem.data.img_url;
			const caption = postItem.data.caption;
			const timeStamp = moment(postItem.data.when).format('dddd, MMMM DD, YYYY h:mm a');
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
	    <div class="meta">${TimeStamp}</div>
	    <a>
	      <i class="heart icon"></i>
	    </a>
	      0 Likes
	    <div class="comments">
		   // <p><strong>Bob: </strong>What a great puppy.</p>
		   <p><strong>${some_user_id}: </strong>${comment}</p>
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
		    

		    //need to isolate proper element
		 //    if (postItem.data.isLiked) {
			// 	li.innerHTML += `<span class="glyphicon glyphicon-heart js-like"></span>`
			// }
			// else {
			// 	li.innerHTML += `<span class="glyphicon glyphicon-heart-empty js-like"></span>`
				// }

			} // for /of loop

		} // render()

		const comm = document.querySelector('.js-comm-input');
		const comment = comm.value;


	} // feed.html



	// using moment
	// function getDate() {
	// 	let date = new Date();
	// 	console.log(date);
	// 	date = moment(date).format('dddd, MMMM DD, YYYY h:mm a');
	// 	console.log(date);
	// 	const message = document.querySelector('.js-login-message');
	// 	message.innerHTML = date;
	// };

	


})();