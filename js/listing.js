const movie_base_url = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=";
let page = 1;
let movie_url = movie_base_url + page;

const image_base_url = "https://image.tmdb.org/t/p/";
let size = "w500"; // "original" is available

// 검색 수행하는 함수
let handleSearch = () => {
    // 포스트 제목 정보를 불러오기 위해 
    let posts = document.getElementsByClassName('movie_post');
    let title;
    // 검색할 때 쓴 문자열 정보를 불러오고 모두 소문자로 바꿈
    let keyword = document.getElementById('search_title').value.toLowerCase();
    // 포스트 내용 하나씩 비교
    for (let i = 0; i < posts.length; i++) {
        // 제목의 텍스트를 소문자로 바꿈
        title = posts[i].children[1].textContent.toLowerCase();

        if (title.indexOf(keyword) === -1) {
            // 타이틀과 검색 키워드가 일치하는 패턴이 없을 경우 포스터 안보여줌
            posts[i].style.display = "none";
        }
        else {
            // 타이틀과 검색 키워드가 일치하는 패턴이 있을 경우 포스터 보여줌
            posts[i].style.display = "block";
        }
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
    // fetch  못받을 경우 예외처리 하기

    return response.json();
}

let renderMovieTemplate = (postId, postImg, postTitle, postOverView, postVoteAvg) => {
    // innerHTML 사용법 몰라서 이렇게 적었심다...
    // 자바스크립트 코드는 아래 html로 나타낸 코드 형태와 같음
    // `<div class="movie_post" id=${postId}>
    //     <img class="movie_poster" src=${postImg} />
    //     <h2 class="title">${postTitle}</h2>
    //     <div class="overview">${postOverView}</div>
    //     <div class="voteAvg">score : ${postVoteAvg}</div>
    // </div>`
    const main = document.querySelector('main');
    let divPost = document.createElement('div');
    divPost.setAttribute('id', postId);
    divPost.setAttribute('class', 'movie_post');
    
    let img = document.createElement('img');
    img.src = postImg;
    img.setAttribute('class', 'movie_poster');
    let title = document.createElement('h2');
    title.setAttribute('class', 'title');
    title.textContent = postTitle;
    let overview = document.createElement('div');
    overview.setAttribute('class', 'overview');
    overview.textContent = postOverView;
    let voteAvg = document.createElement('div');
    voteAvg.setAttribute('class', 'voteAvg');
    voteAvg.textContent = `score : ${postVoteAvg}`;
    // divPost.textContent = postId;
    
    main.appendChild(divPost);
    [img, title, overview, voteAvg].map((element) => {
        divPost.appendChild(element);
    });
    divPost.addEventListener('click', () => {
        alert(`post id : ${postId}`);
    });
}

// 문서가 처음 시작할 때 실행되는 코드
document.addEventListener("DOMContentLoaded", () => {
    // 검색창에 엔터 누르면 검색하는 기능 추가
    document.getElementById('search_title').addEventListener("keydown", (e) => {
        // 브라우저에서 e.key를 지원하지 않고 e.keyCode를 지원할 때 문제 없도록 처리
        if (e.key || e.keyCode === 'Enter') {
            handleSearch();
        }
    });
    getMovieData(movie_url);
});

// 영화 정보를 불러오는 코드
getMovieData(movie_url).then((data) => {
    // console.log(data);
    let posts = data['results'];
    posts.forEach((post) => {
        // console.log(post['id'], image_base_url + size + post['poster_path'], post['original_title'], post['overview'], post['vote_average']);
        renderMovieTemplate(post['id'], image_base_url + size + post['poster_path'], post['original_title'], post['overview'], post['vote_average']);
    });
});
