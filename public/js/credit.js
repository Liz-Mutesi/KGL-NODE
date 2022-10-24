function validateForm() {
    let branch = document.forms["RegForm"]["branch"];
    let buyer = document.forms["RegForm"]["buyer"];
    let nin = document.forms["RegForm"]["nin"];
    let location = document.forms["RegForm"]["location"];
    let contact = document.forms["RegForm"]["contact"];
    let itemName = document.forms["RegForm"]["itemName"];
    let type = document.forms["RegForm"]["type"];
    let quantity = document.forms["RegForm"]["quantity"];
    let amount = document.forms["RegForm"]["amount"];
    let dispatchDate = document.forms["RegForm"]["dispatchDate"];
    let agent = document.forms["RegForm"]["agent"];
    let dueDate = document.forms["RegForm"]["dueDate"];
    // let dispatchDate = document.forms["RegForm"]["dispatchDate"];



    branchRegex = /^[A-Za-z]+$/
    buyerRegex = /^[a-zA-Z_ ]*$/
    ninRegex = /^[C-M]{2}[0-9]{1,8}[A-Z]{4}$/
    locationRegex = /^[A-Za-z0-9]+$/
    contactRegex = /^[0-9]*$/
    itemName = /^[A-Za-z]+$/
    //typeRegex = /^[A-Za-z]+$/
    quantityRegex = /^[0-9]{3,}$/
    amountRegex = /^[0-9]*$/
    agentRegex = /^[A-Za-z] + [A-Za-z]+$/
    //dueDateRegex = [0-9]{2}[-|\/]{1}[0-9]{2}[-|\/]{1}[0-9]{4}

    // alphaNumeric = /^[A-Za-z0-9]+$/


    if (branch.value == "" || !branchRegex.test(branch.value)) {
        alert("Please enter branch name");
        branch.style.border = "2px solid red";
        branchr.focus();
        return false;
    }
    else {
        branch.style.border = "2px solid green";
    }
    if (buyer.value == "" || !buyerRegex.test(buyer.value)) {
        //alert("Please enter customer name");
        buyer.style.border = "2px solid red";
        buyer.focus();
        return false;
    }
    else {
        buyer.style.border = "2px solid green";

    }
    if (nin.value === "" || !ninRegex.test(nin.value)) {
        alert("Please enter valid NIN");
        nin.style.border = "2px solid red";
        nin.focus();
        return false;
    }
    else {
        nin.style.border = "2px solid green";

    }
    if (location.value === "" || !locationRegex.test(location.value)) {
        //alert("Please enter your location");
        location.style.border = "2px solid red";
        location.focus();
        return false
    } else {
        location.style.border = "2px solid green";

    }
    if (contact.value === "" || contact.value.length != 10) {
        //alert("Please enter a valid phone number");
        contact.style.border = "2px solid red";
        phone.focus();
        return false;
    } else {
        contact.style.border = "2px solid green";

    }
    if (itemName.value === "" || !itemNameRegex.test(itemName.value)) {
        //alert("Please enter item name");
        itemName.style.border = "2px solid red";
        itemName.focus();
        return false;
    }
    else {
        itemName.style.border = "2px solid green";

    }

    // if (type.value === "" || !typeRegex.test(type.value)) {
    if (type.value === "") {
        alert('Please item type')
        type.style.border = "2px solid red";
        type.focus();
        return false;
    }
    else {
        type.style.border = "2px solid green";

    }
    if (quantity.value === "" || !quantityRegex.test(quantity.value)) {
        alert("Please enter valid quantity");
        quantity.style.border = "2px solid red";
        quantity.focus();
        return false;
    }
    else {
        quantity.style.border = "2px solid green";

    }
    if (amount.value === "" || !amountRegex.test(amount.value)) {
        alert("Please enter valid amount");
        //amount.style.border = "2px solid red";
        amount.focus();
        return false;
    }
    else {
        amount.style.border = "2px solid green";

    }
    if (dispatchDate.value === "") {
        dispatchDate.style.border = "2px solid red";
        alert("Date can not be empty")
        dispatchDate.focus()
    } else {
        dispatchDate.style.border = "2px solid green";

    }
    if (agent.value === "" || !agentRegex.test(agent.value)) {
        alert("This field can not be empty");
        agent.style.border = "2px solid red";
        agent.focus();
        return false;
    }
    else {
        agent.style.border = "2px solid green";

    }
    if (dueDate.value === "") {
        dueDate.style.border = "2px solid red";
        alert("Date can not be empty")
        dueDate.focus()
    } else {
        dueDate.style.border = "2px solid green";

    }

}
