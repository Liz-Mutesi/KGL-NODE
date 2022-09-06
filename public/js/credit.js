function validationForm(){
    let name = document.forms["RegForm"]["Name"];
    let location = document.forms["RegForm"]["Location"];
    let email = document.forms["RegForm"]["Email"];
    let nin = document.forms["RegForm"]["NIN"];
    let phone = document.forms["RegForm"]["Telephone"];
    let select = document.forms["RegForm"]["Period"];
    //let username = document.forms["RegForm"]["username"];
    
    nameRegex = /^[A-Za-z]+ [A-Za-z]+$/
    locationRegex = /^[A-Za-z0-9]+$/
    emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    ninRegex = /^[A-Za-z0-9]{10}$/
    //passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()])[A-Za-z\d@#$!%*?&^()]{8,}$/
    numberRegex = /^[0-9]*$/

    alphaNumeric = /^[A-Za-z0-9]+$/

    
    if(name.value == ""|| !nameRegex.test(name.value)){
        //alert("Please enter your name");
        name.style.border = "2px solid red";
        //name.innerHTML = "Please enter full name";
        //username.focus();
        return false;
    }
    else {name.style.border = "2px solid green";

    }
    if(email.value == ""|| !emailRegex.test(email.value) ){
        //alert("Please enter your email");
        email.style.border = "2px solid red";
        //email.focus();
        return false
     } else{ email.style.border = "2px solid green";
        
    }
    if(location.value == ""|| !locationRegex.test(location.value)){
        //alert("Please enter location");
        location.style.border = "2px solid red";
        //location.innerHTML = "Please enter full name";
        //location.focus();
        return false;
    }
    else {location.style.border = "2px solid green";

    }
    if(nin.value == "" || !ninRegex.test(nin.value)){
         //alert("Please enter valid NIN");
        nin.style.border = "2px solid red";
        //nin.focus();
         return false;
    }
    else { nin.style.border = "2px solid green";

    }
    if(phone.value == "" || phone.value.length != 10){
        //alert("Please enter a valid phone number");
        phone.style.border = "2px solid red";
        //phone.focus();
        return false;
    } else { phone.style.border = "2px solid green";

}
    if(select.value === ""){
        period.style.border = "2px solid red";
        // alert("Please select credit period")
        period.focus()
    } else{ phone.style.border = "2px solid green";

    }

}
