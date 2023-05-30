const movie_base_url = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=";
let page = 1;
let movie_url = movie_base_url + page;

const image_base_url = "https://image.tmdb.org/t/p/";

let size = "w500"; // "original" is available

let handleSearch = () => {
    let posts = document.getElementsByClassName('movie_post');
    // console.log(posts);
    // foreach 왜 안되누..
    // posts.forEach((post) => {
    // })
    let title;
    let keyword = document.getElementById('search_title').value.toLowerCase();
    for (let i = 0; i < posts.length; i++) {
        title = posts[i].children[1].textContent.toLowerCase();
        if (title.indexOf(keyword) === -1) {
            posts[i].style.display = "none";
        }
        else {
            posts[i].style.display = "block";
        }
        console.log(posts[i]);
    }
}

let getMovieData = async (url) => {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjQxMWFmZjRiODc0OTE1MWQ1ZDBjZDAyZTIzNGVmZSIsInN1YiI6IjY0NzA4NmZmMzM2ZTAxMDBjNzA3OTc1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NSCtfR7Cu5h3HYuAUk_fJ1ivWxZ8ewChQOmBNjM2VQo",
        },
    };
    const response = await fetch(url, options);

    return response.json();
}

let renderMovieTemplate = (postId, postImg, postTitle, postOverView, postVoteAvg) => {
    const main = document.querySelector('main');
    let divPost = document.createElement('div');
    divPost.setAttribute('id', postId);
    divPost.setAttribute('class', 'movie_post');
    
    let img = document.createElement('img');
    img.src = postImg;
    let title = document.createElement('h2');
    title.setAttribute('class', 'title');
    title.textContent = postTitle;
    let overview = document.createElement('div');
    overview.textContent = postOverView;
    let voteAvg = document.createElement('span');
    voteAvg.textContent = postVoteAvg;
    // divPost.textContent = postId;
    
    main.appendChild(divPost);
    [img, title, overview, voteAvg].map((element) => {
        divPost.appendChild(element);
    });
    divPost.addEventListener('click', () => {
        alert(`post id : ${postId}`);
    });
}

getMovieData(movie_url).then((data) => {
    // console.log(data);
    let posts = data['results'];
    posts.forEach((post) => {
        // console.log(post['id'], image_base_url + size + post['poster_path'], post['original_title'], post['overview'], post['vote_average']);
        renderMovieTemplate(post['id'], image_base_url + size + post['poster_path'], post['original_title'], post['overview'], post['vote_average']);
    });
});
