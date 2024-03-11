

async function loginUser(event){
    event.preventDefault();

   try {
     const dataUser={
         email:event.target.email.value,
         password:event.target.password.value
     }
 
     const res= await axios.post('http://localhost:3000/user/login',dataUser);
    
     if(res.status==202){
         localStorage.setItem('token',res.data.token);
         alert(res.data.message);
         window.location.href="../Home/home.html"
     }
   } catch (error) {
     console.log(error)
     alert(error.response.data.message);
   }
}