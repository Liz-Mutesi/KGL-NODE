function validationForm(){
    
    let email = document.forms["login"]["email"];
    let password = document.forms["login"]["password"];
    
    emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()])[A-Za-z\d@#$!%*?&^()]{8,}$/
    

    alphaNumeric = /^[A-Za-z0-9]+$/

   
    if(email.value == ""|| !emailRegex.test(email.value) ){
        //alert("Please enter your email");
        email.style.border = "2px solid red";
        email.focus();
        return false
     } else{ email.style.border = "2px solid green";
        
    }
    if(password.value == "" || !passRegex.test(password.value)){
        alert("Please enter valid password");
        password.style.border = "2px solid red";
        password.focus();
        return false;
    } else { password.style.border = "2px solid green";

     }


}
