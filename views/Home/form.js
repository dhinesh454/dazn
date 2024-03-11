const token = localStorage.getItem('token');

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
            window.location.href="./home.html"  
        }               
       
    } catch (error) {
        shownError(error);
    }
}




function shownError(error){
    console.log(error)
    alert(error.response.data.message);
    document.body.innerHTML+= `<div style="colour:red;">${error}</div>`;
}