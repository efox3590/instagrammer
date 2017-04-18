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
				pw1.focus();
			} 
			else {	//can be deleted. just for testing
				message.innerHTML = 'good job. passwords match'
			}		//delete this silliness
				
			// route to add user to db
			POST('/api/user', )

		}) // event listener

	}	// register.html

	// if (document.querySelector('.js-log-email') !== null){
	if (location.pathname === '/login.html') {

		const email = document.querySelector('.js-log-email');
		const pw = document.querySelector('.js-log-pw');
		const btn = document.querySelector('.js-log-btn')

		btn.addEventListener('click', (e) => {

		run passport authentication logic !!! 

		POST('/api/')

		})
			
	}	// login.html

	if (location.pathname === '/feed.html') {



		function render(postItems) {
			const container = document.querySelector('.js-postlist');
			container.innerHTML = '';
			postItems = postItems.reverse();
// how do we get back this array from sqlite?

			// console.log('postItems :',postItems);
			for (const postItem of postItems) {
// need field in sql db to store time so entries can be sorted by time 
// and time can be displayed on posts via moment.js


				// const fullContent = `${postItem.data.post}`;
				// let hour = `${postItem.data.hour}`
			 //    const ampm = hour >= 12 ? 'PM' : 'AM';
			 //    hour = hour % 12;
			 //    let minute = `${postItem.data.minute}`;
			 //    minute = parseInt(minute, 10) > 10 ? minute : "0".concat(minute);
			 //    let second = `${postItem.data.second}`;
			 //    second = parseInt(second, 10) > 10 ? second : "0".concat(second);

			 //    const timeStamp = `${postItem.data.month + 1}/${postItem.data.day}/${postItem.data.year}
		  //     ${hour}:${minute}:${second} ${ampm} `;
		    const li = document.createElement('li');
			li.classList.add('list-group-item', 'postlist-item', `js-blog-item-${postItem.id}`);
	// need ${vars} for: image url, caption, commenter_id, commenter_comment
			const img_url = postItem.data.img_url;
			const caption = postItem.data.caption;
			const timeStamp = moment(postItem.data.when).format('dddd, MMMM DD, YYYY h:mm a');
			// not quite sure what the data looks like when it comes back
			// need to discus with team
			
			// const comm_id = 
			// const comm_comment = 
		    li.innerHTML = `
<figure>
	<div class="item-image">
	// <img src="../assets/puppy.jpg" alt="Puppy" class="img-responsive">
	<img src=`${img_url}` class="img-responsive">

	<figcaption>
	// Bear was walking in the water! So cute!
	$[caption}
	</figcaption>
	</div><!-- item image -->
	<div class="likes">
	<span class="glyphicon glyphicon-heart-empty"></span> Like
	</div>
</figure> 

<section>
	<article>
		<ul class="comments-list">
			<li class="comment-item">
				// <p><strong>Bob Dylan:</strong> What a cute puppy! </p>
				<p><strong>${comm_id}:</strong> ${comm_comment} </p>
			</li>
		</ul>
		  <div class="col-lg-6">
		    <div class="input-group">
		      <input type="text" class="form-control input-text js-comment-input" placeholder="Add a Comment">
		      <button class="js-comment-btn btn btn-primary">Add</button>
		    </div><!-- /input-group -->
		  </div><!-- /.col-lg-6 -->
	</article>
</section>
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

		const comm = document.querySelector('.js-comment-input');
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