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
        const{title,poster_path,release_date,vote_average,overview,id} = movie
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
                <br/>
                <button class="knowMore" id="${id}">Know More</button>
            </div>
        `

        main.appendChild(movieEl);

        //1.抓取影片的ID值
        document.getElementById(id).addEventListener('click', () => {
                console.log(id)
                openNav(movie)
            })
    })
    
}


const overlayContent = document.getElementById('overlay-content');
/* Open when someone clicks on the span element */
function openNav(movie) {
    let id = movie.id;
    fetch(BASE_URL + '/movie/'+id+'/videos?'+API_KEY).then(res => res.json())
    .then(videoData =>{
        // 2.抓到ID後幫我印出值的資料
        console.log(videoData);
        if(videoData){
            document.getElementById("myNav").style.width = "100%";
        if(videoData.results.length > 0){
            // 設定一個空字串 裝movievideo
            var embed = [];
            videoData.results.forEach(video =>{
                // 設定要抓取的值
                let{name,key,site} = video

                if(site == 'Youtube'){
                    embed.push(`
                         <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" title="${name}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>                
                `)  
                }

            })

            overlayContent.innerHTML = embed.join('');
        }else{
            overlayContent.innerHTML = `<h1 class="no-results">No Results Found</h1>`

        }
        }
    })
  }
  
  /* Close when someone clicks on the "x" symbol inside the overlay */
  function closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }
