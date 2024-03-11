
const token = localStorage.getItem('token');

function Logout(e){
    localStorage.clear();
    window.location.href='../Login/login.html';
}

function shownForm(e){
    const form = document.getElementById('form');
    const addButton = document.getElementById('addbutton');
    addButton.style.display='none';
    form.style.display='block';

}

function cancelEvent(e){
    const form = document.getElementById('form');
    const addButton = document.getElementById('addbutton');
    form.style.display='none';
    addButton.style.display='block';
    const parentNode = document.getElementById('ul_lists');
    parentNode.innerHTML='';
    getAllmovies();
}


async function addmovies(event){
    event.preventDefault();

    try {
    
       const title=document.getElementById('titleid').value;
        const genre=document.getElementById('genreid').value;
        const rating=document.getElementById('ratingid').value;
        const streamingLink=document.getElementById('streamingLinkid').value;

        const data={ title, genre, rating, streamingLink };
        
        document.getElementById('titleid').value='';
        document.getElementById('genreid').value='';
        document.getElementById('ratingid').value='';
        document.getElementById('streamingLinkid').value='';
    
        const res= await axios.post('http://localhost:3000/movies',data,{headers:{'Authorization':token}});
  
        if(res.status==201){
            alert(res.data.message);
            const form = document.getElementById('form');
            const addButton = document.getElementById('addbutton');
            addButton.style.display='block';
            form.style.display='none';
            shownMovielist(res.data.newMovies);
        }               
       
    } catch (error) {
        alert(error.response.data.message);
        shownError(error);
    }
}



function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}


window.addEventListener('DOMContentLoaded',async()=>{
    try {
        console.log(token);
        const res = await axios.get('http://localhost:3000/movies',{headers:{'Authorization':token}});
         for(let i in res.data.allMovies){
            shownMovielist(res.data.allMovies[i])
        }
    } catch (error) {
        shownError(error);
    }
})



function shownMovielist(data){
   
    const parentNode = document.getElementById('ul_lists');
    const childNode=`<li id='${data._id}' class='movie_lists'>
                        <div class='movie_list'>${data.title}</div>
                        <div class='movie_list'>${data.genre}</div>
                        <div class='movie_list'><a href="${data.streamingLink}">WatchNow</a></div>
                        <div class='movie_list_actions'>
                        <button onclick=editMovie('${data._id}') class="btn">Edit</button>
                        <button onclick=deleteMovie('${data._id}') class='btn'>Delete</button>
                        </div>
                     </li>`
                  

    parentNode.innerHTML=childNode+parentNode.innerHTML;             
}


async function editMovie(id) {
    const form = document.getElementById('form');
    const addButton = document.getElementById('addbutton');
    const AddmovieButton = document.getElementById('addButton');
    const updateButton = document.getElementById('updateButton');

  try {
      addButton.style.display = 'none';
      form.style.display = 'block';
      updateButton.style.visibility = 'visible';
      updateButton.onclick = async () => {
          try {
            const title=document.getElementById('titleid').value;
            const genre=document.getElementById('genreid').value;
            const rating=document.getElementById('ratingid').value;
            const streamingLink=document.getElementById('streamingLinkid').value;
    
            const data={ title, genre, rating, streamingLink };
            
            document.getElementById('titleid').value='';
            document.getElementById('genreid').value='';
            document.getElementById('ratingid').value='';
            document.getElementById('streamingLinkid').value='';
        
            const res= await axios.put(`http://localhost:3000/movies/${id}`,data,{headers:{'Authorization':token}});
            shownUpdateOnscreen(res.data.updatedMovie)
          } catch (error) {
            alert(error.response.data.message);
            console.log(error);
          }
      };
      AddmovieButton.style.display = 'none';
      removeMovielist(id);
  } catch (error) {
     alert(error.response.data.message);
    console.log(error);
  }
}


function shownUpdateOnscreen(data){
    
    const form = document.getElementById('form');
    const addButton = document.getElementById('addbutton');
    form.style.display='none';
    addButton.style.display='block';
    shownMovielist(data);

}


async function deleteMovie(id){
    try {
        const res = await axios.delete(`http://localhost:3000/movies/${id}`,{headers:{'Authorization':token}});
        removeMovielist(id);
    } catch (error) {
        alert(error.response.data.message);
        shownError(error);
    }
}




function removeMovielist(id){
    const parentNode = document.getElementById('ul_lists');
    const childNode = document.getElementById(id);

    parentNode.removeChild(childNode);
}


async function updateMovie(e){
    try {
        const res = await axios.put(`http://localhost:3000/movies/${id}`,{headers:{'Authorization':token}})
    } catch (error) {
        
    }
}



async function getAllmovies(){
    try {
        console.log(token);
        const res = await axios.get('http://localhost:3000/movies',{headers:{'Authorization':token}});
         for(let i in res.data.allMovies){
            shownMovielist(res.data.allMovies[i])
        }
    } catch (error) {
        shownError(error);
    }
}

const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
};

const searchMovies = async (searchTerm) => {
    try {
        console.log(searchTerm);
        const res = await axios.get(`http://localhost:3000/search?q=${searchTerm}`,{headers:{'Authorization':token}});
        const parentNode = document.getElementById('ul_lists');
        parentNode.innerHTML='';
        for(let i in res.data.movies){
            shownMovielist(res.data.movies[i])
        }
        // Handle the response data here
    } catch (error) {
        alert(res.response.data.message)
       shownError(error)
        // Handle errors here
    }
};

const debouncedSearchMovies = debounce(searchMovies, 1000); // Adjust debounce delay as needed

const handleSearchInput = (event) => {
    const searchTerm = event.target.value.trim();
    debouncedSearchMovies(searchTerm);
};

document.getElementById('search').addEventListener('input', handleSearchInput);



function shownError(error){
    console.log(error)
    document.body.innerHTML+= `<div style="colour:red;">${error}</div>`;
}