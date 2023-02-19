let data;

// 每天熱門電影

const API_KEY = 'api_key=5d7ac24e63419994fda11db9f90c8f2b';
const BASE_URL ='https://api.themoviedb.org/3';

//每周熱門電影
const API_URL = BASE_URL + '/trending/movie/week?'+API_KEY;

// 每天熱門電影
const APIDAY_URL = BASE_URL + '/trending/movie/day?'+API_KEY;



const IMG_URL= 'https://image.tmdb.org/t/p/w500';
const main = document.getElementById('main');





// 抓出一天熱門電影
getMoviesDay(APIDAY_URL);

function getMoviesDay(url){
    fetch(url).then(res => res.json()).then(data =>{
        console.log(data.results)
        showMovieDay(data.results);
    })
}



// 秀出一天熱門電影
function showMovieDay(data){
    main.innerHTML='';
    data.forEach(movie => {
        const{title,poster_path,release_date,vote_average,overview} = movie
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML =`
        <img src="${IMG_URL+poster_path}" alt="${title}">
            <div class="movieInfo">
                <h3>${title}</h3>
                <span class="green">${vote_average}</span>
            </div>
            
            <div class="date">
                <p>${release_date}</p>
            </div>

            <div class="overView">
                <h3>${overview}</h3>
            </div>
        `

        main.appendChild(movieEl);
    });
    
}
