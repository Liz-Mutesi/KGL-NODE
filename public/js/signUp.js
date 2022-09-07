function validationForm(){
    let firstname = document.forms["RegForm"]["firstname"];
    let surname = document.forms["RegForm"]["surname"];
    // let location = document.forms["RegForm"]["Location"];
    let email = document.forms["RegForm"]["Email"];
    // let nin = document.forms["RegForm"]["NIN"];
    let password = document.forms["RegForm"]["password"];
    let role = document.forms["RegForm"]["role"];
    //let username = document.forms["RegForm"]["username"];
    
    firstnameRegex = /^[A-Za-z]+$/
    surnameRegex = /^[A-Za-z]+$/
    // locationRegex = /^[A-Za-z0-9]+$/
    emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()])[A-Za-z\d@#$!%*?&^()]{8,}$/
    // ninRegex = /^[A-Za-z0-9]{10}$/
    roleRegex = /^[A-Za-z]+$/

    

    
    if(firstname.value == ""|| !firstnameRegex.test(firstname.value)){
        //alert("Please enter your name");
        firstname.style.border = "2px solid red";
        firstname.innerHTML = "Please enter full name";
        firstname.focus();
        return false;
    }
    else {firstname.style.border = "2px solid green";

    }

    if(surname.value == ""|| !surnameRegex.test(surname.value)){
        //alert("Please enter your name");
        surname.style.border = "2px solid red";
        surname.innerHTML = "Please enter full name";
        surname.focus();
        return false;
    }
    else {surname.style.border = "2px solid green";

    }

    if(email.value == ""|| !emailRegex.test(email.value) ){
        //alert("Please enter your email");
        email.style.border = "2px solid red";
        email.innerHTML = "Please enter valid email"
        email.focus();
        return false
     } else{ email.style.border = "2px solid green";
        
    }
    if(password.value == ""|| !passwordRegex.test(password.value) ){
        //alert("Please enter your email");
        password.style.border = "2px solid red";
        password.innerHTML = "Please enter valid email"
        password.focus();
        return false
     } else{ password.style.border = "2px solid green";
        
    }

    if(role.value === ""){
        role.style.border = "2px solid red";
        role.innerHTML = "Please fill in your role"
        
        role.focus()
    } else{ role.style.border = "2px solid green";

    }
//     if(location.value == ""|| !locationRegex.test(location.value)){
//         //alert("Please enter location");
//         location.style.border = "2px solid red";
//         //location.innerHTML = "Please enter full name";
//         //location.focus();
//         return false;
//     }
//     else {location.style.border = "2px solid green";

//     }
//     if(nin.value == "" || !ninRegex.test(nin.value)){
//          //alert("Please enter valid NIN");
//         nin.style.border = "2px solid red";
//         //nin.focus();
//          return false;
//     }
//     else { nin.style.border = "2px solid green";

//     }
//     if(phone.value == "" || phone.value.length != 10){
//         //alert("Please enter a valid phone number");
//         phone.style.border = "2px solid red";
//         phone.focus();
//         return false;
//     } else { phone.style.border = "2px solid green";

// }
    

}
