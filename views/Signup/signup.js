
async function newuserRegister(event){
    event.preventDefault();

    try {
        const name = document.getElementById('nameid').value;
        const email = document.getElementById('emailid').value;
        const phonenumber = document.getElementById('phoneid').value;
        const password = document.getElementById('passid').value;

        const data = {name,email,phonenumber,password,role:'user'};
        const res = await axios.post('http://localhost:3000/user/signup',data);

        if(res.status==201){
            window.location.href="../Login/login.html";
            alert(res.data.message);
        } 
    }
     catch (error) {
        console.log(error);
        alert(error.response.data.message);
    }

}



function adminRegister(e) {
    const user = document.getElementById('userButton');
    const admin = document.getElementById('adminButton');

    try {
        user.style.display='none';
        admin.style.display='block';   
    } catch (error) {
        console.log(error);
        alert(error.response.data.message);
    }

}



async function adminuserRegister(event){
    event.preventDefault();

    try {
        const name = document.getElementById('nameid').value;
        const email = document.getElementById('emailid').value;
        const phonenumber = document.getElementById('phoneid').value;
        const password = document.getElementById('passid').value;

        const data = {name,email,phonenumber,password,role:'admin'};
        const res = await axios.post('http://localhost:3000/user/signup',data);

        if(res.status==201){
            window.location.href="../Login/login.html";
            alert(res.data.message);
        } 
    }
     catch (error) {
        console.log(error);
        alert(error.response.data.message);
    }

}