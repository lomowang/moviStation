

// APIURL
const API_KEY = 'api_key=5d7ac24e63419994fda11db9f90c8f2b';
const BASE_URL ='https://api.themoviedb.org/3';
// 電影的api
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
// 影集的api
const API_TVURL = BASE_URL + '/tv/popular?&'+API_KEY;

const IMG_URL= 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL+'/search/movie?'+API_KEY;
const genres = [
  {
    id: 28,
    name: "Action"
    },
    {
    id: 12,
    name: "Adventure"
    },
    {
    id: 16,
    name: "Animation"
    },
    {
    id: 35,
    name: "Comedy"
    },
    {
    id: 80,
    name: "Crime"
    },
    {
    id: 99,
    name: "Documentary"
    },
    {
    id: 18,
    name: "Drama"
    },
    {
    id: 10751,
    name: "Family"
    },
    {
    id: 14,
    name: "Fantasy"
    },
    {
    id: 36,
    name: "History"
    },
    {
    id: 27,
    name: "Horror"
    },
    {
    id: 10402,
    name: "Music"
    },
    {
    id: 9648,
    name: "Mystery"
    },
    {
    id: 10749,
    name: "Romance"
    },
    {
    id: 878,
    name: "Science Fiction"
    },
    {
    id: 10770,
    name: "TV Movie"
    },
    {
    id: 53,
    name: "Thriller"
    },
    {
    id: 10752,
    name: "War"
    },
    {
    id: 37,
    name: "Western"
    }

  


]



const main = document.getElementById('main');
console.log(main)
const form = document.getElementById('form');
const search = document.getElementById('search');
const header = document.getElementById('header');

const trendingTvshow = document.getElementById('trendingTvshow');
console.log(trendingTvshow)








// 這是秀出電影的
// main段落的
getMovies(API_URL);

function getMovies(url){
    fetch(url).then(res => res.json()).then(data =>{
        console.log(data.results);
        if(data.results.length !== 0){
           showMovies(data.results);
        }else{
          main.innerHTML =`<h1 class="no-results">No Results</h1>`
        }
    })
}


gettvshow(API_TVURL);

function gettvshow(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data.results);
      if (data.results.length !== 0) {
        tvshow(data.results);
      } else {
        trendingTvshow.innerHTML = `<h1 class="no-results">No Results</h1>`;
      }
    });
}


function tvshow(data) {
  trendingTvshow.innerHTML = '';


data.forEach(tv =>{        
  const {poster_path, first_air_date, vote_average ,name } = tv;
  const trendingTvElement = document.createElement('div');
  trendingTvElement.classList.add('tv');
  trendingTvElement.innerHTML=`
  <img src="${IMG_URL+poster_path}" alt="${name}">
      <div class="movieInfo">
          <h3>${name}</h3>
      </div>
      <p class="green">${vote_average}</p>
      <div class="date">
          <p >${first_air_date}</p>
      </div>
  </div>
  `
  trendingTvshow.appendChild(trendingTvElement);
  console.log(trendingTvshow)

  })
}



    //  評分投票
     function getColor(vote){
        if(vote>=8){
            return'green'
        }else if(vote >=5){
            return'orange'
        }else{
            return 'red'
        }
     }


  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    selectedGenre=[];
    setGenre()
    if(searchTerm){
        getMovies(searchURL+'&query='+searchTerm)
    }else{
        // 搜尋清空就回主畫面
        getMovies(API_URL);
    }
})


    
  



    //  評分投票
     function getColor(vote){
        if(vote>=8){
            return'green'
        }else if(vote >=5){
            return'orange'
        }else{
            return 'red'
        }
     }


  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    selectedGenre=[];
    setGenre()
    if(searchTerm){
        getMovies(searchURL+'&query='+searchTerm)
    }else{
        // 搜尋清空就回主畫面
        getMovies(API_URL);
    }
})



