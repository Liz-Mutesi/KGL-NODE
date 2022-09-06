function validationForm(){
    let username = document.forms["RegForm"]["Name"];
    let email = document.forms["RegForm"]["Email"];
    let password = document.forms["RegForm"]["Password"];
    let phone = document.forms["RegForm"]["Telephone"];
    //let username = document.forms["RegForm"]["username"];
    
    nameRegex = /^[A-Za-z]+$/
    emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()])[A-Za-z\d@#$!%*?&^()]{8,}$/
    numberRegex = /^[0-9]*$/

    alphaNumeric = /^[A-Za-z0-9]+$/

   
    if(username.value == ""){
        //alert("Please enter your name");
        username.style.border = "2px solid red";
        //username.innerHTML = "Please enter your name";
        //username.focus();
        return false;
    }
    else { username.style.border = "2px solid green";

    }

    if(email.value == ""|| !emailRegex.test(email.value) ){
        //alert("Please enter your email");
        email.style.border = "2px solid red";
        //email.focus();
        return false
     } else{ email.style.border = "2px solid green";
        
    }
    
    if(password.value == "" || !passRegex.test(password.value)){
        //alert("Please enter valid password");
        password.style.border = "2px solid red";
        //password.focus();
        return false;
    }
    else { password.style.border = "2px solid green";

    }

    if(phone.value == "" || phone.value.length != 10){
        //alert("Please enter your valid phone number");
        phone.style.border = "2px solid red";
        //phone.focus();
        return false;
    } else { phone.style.border = "2px solid green";
}

}
