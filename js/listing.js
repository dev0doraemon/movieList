let url = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=";
let page = 1;

const image_base_url = "https://image.tmdb.org/t/p/";
let size = "w500";

let getMovieData = async (url, options) => {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjQxMWFmZjRiODc0OTE1MWQ1ZDBjZDAyZTIzNGVmZSIsInN1YiI6IjY0NzA4NmZmMzM2ZTAxMDBjNzA3OTc1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NSCtfR7Cu5h3HYuAUk_fJ1ivWxZ8ewChQOmBNjM2VQo",
        },
    });

    return response.json();
}

getMovieData(url + page).then((data) => {
    // console.log(data);
    let posts = data['results'];
    posts.forEach((post) => {
        // console.log(post['id'], image_base_url + size + post['poster_path'], post['original_title'], post['overview'], post['vote_average']);
        renderMovieTemplate(post['id'], image_base_url + size + post['poster_path'], post['original_title'], post['overview'], post['vote_average']);
    });
});


function renderMovieTemplate(postId, postImg, postTitle, postOverView, postVoteAvg) {
    const main = document.querySelector("main");
    let divId = document.createElement('div');
    divId.setAttribute('id', postId);
    
    let img = document.createElement('img');
    img.src = postImg;
    let title = document.createElement('h2');
    title.textContent = postTitle;
    let overview = document.createElement('div');
    overview.textContent = postOverView;
    let voteAvg = document.createElement('span');
    voteAvg.textContent = postVoteAvg;
    // divId.textContent = postId;
    
    main.appendChild(divId);
    divId.appendChild(img);
    divId.appendChild(title);
    divId.appendChild(overview);
    divId.appendChild(voteAvg);
    divId.addEventListener('click', () => {
        alert(`post id : ${postId}`);
    });
}


// const options = {
//     method: "GET",
//     headers: {
//         accept: "application/json",
//         Authorization:
//             "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjQxMWFmZjRiODc0OTE1MWQ1ZDBjZDAyZTIzNGVmZSIsInN1YiI6IjY0NzA4NmZmMzM2ZTAxMDBjNzA3OTc1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NSCtfR7Cu5h3HYuAUk_fJ1ivWxZ8ewChQOmBNjM2VQo",
//     },
// };

// fetch(url + page, options)
//     .then((response) => response.json())
//     .then((response) => console.log(response))
//     .catch((err) => console.error(err));

// fetch(url + page, options)
//     .then((response) => response.json())
//     .then((response) => {
//         console.log(response);
//         const posts = response['results'];
//         posts.forEach((post) => {
//             // console.log(post['backdrop_path'], post['original_title'], post['overview'], post['poster_path']);
//             console.log(post['id'], image_base_url + size + post['poster_path'], post['original_title'], post['overview'], post['vote_average']);
//         })
//     })
//     .catch((err) => console.error(err));

// function renderMovieTemplate(postId, postImg, postTitle, postOverView, postVoteAvg) {
//     let template = `
//         <div id=${postId}>
//             <div>
//                 <img src=${image_base_url}${size}${postImg} />
//             </div>
//             <div>
//                 <h2>${postTitle}</h2>
//                 <div>
//                     ${postOverView}
//                 </div>
//                 <span>${postVoteAvg}</span>
//             </div>
//         </div>
//     `;

//     return template;
// }