function saleValidateForm() {
    let branch = document.forms["salesForm"]["branch"];
    let buyer = document.forms["salesForm"]["buyer"];
    let itemName = document.forms["salesForm"]["itemName"];
    let quantity = document.forms["salesForm"]["quantity"];
    let price = document.forms["salesForm"]["price"];
    let amount = document.forms["salesForm"]["amount"];
    let agent = document.forms["salesForm"]["agent"];
    let date = document.forms["salesForm"]["date"];
    let time = document.forms["salesForm"]["time"];
    // let dispatchDate = document.forms["salesForm"]["dispatchDate"];



    branchRegex = /^[A-Za-z]+$/
    buyerRegex = /^[A-Za-z]{2,}+ [A-Za-z]+$/
    itemName = /^[A-Za-z]+$/
    quantityRegex = /^[0-9]{3,}+$/
    priceRegex = /^[0-9]{3,}+$/
    typeRegex = /^[A-Za-z0-9]+$/
    amountRegex = /^[0-9]{5,}+$/
    agentRegex = /^[A-Za-z]{2,}+ [A-Za-z]+$/
    //dateRegex = ^[0-9]{2}[-|\/]{1}[0-9]{2}[-|\/]{1}[0-9]{4}
    //timeRegex = ^[0-9]{2}[:]{1}[0-9]{2}

    alphaNumeric = /^[A-Za-z0-9]+$/

    
    if (branch.value === "" || !branchRegex.test(branch.value)) {
        //alert("Please enter customer name");
        branch.style.border = "2px solid red";
        branch.focus();
        return false;
    }
    else {
        branch.style.border = "2px solid green";

    }
    if (buyer.value === "" || !buyerRegex.test(buyer.value)) {
        alert("Please enter customer name");
        buyer.style.border = "2px solid red";
        buyer.focus();
        return false;
    }
    else {
        buyer.style.border = "2px solid green";

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
    if (price.value === "" || price.value.length != 10) {
        //alert("Please enter a valid price");
        price.style.border = "2px solid red";
        //price.focus();
        return false;
    } else {
        price.style.border = "2px solid green";

    }
    if (type.value === "" || !typeRegex.test(type.value)) {
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
    if (agent.value === "" || !agentRegex.test(agent.value)) {
        alert("This field can not be empty");
        agent.style.border = "2px solid red";
        agent.focus();
        return false;
    }
    else {
        agent.style.border = "2px solid green";

    }
    if (date.value === "") {
        date.style.border = "2px solid red";
        alert("Date can not be empty")
        date.focus()
    } else {
        date.style.border = "2px solid green";

    }
    if (time.value === "") {
        time.style.border = "2px solid red";
        alert("Date can not be empty")
        time.focus()
    } else {
       time.style.border = "2px solid green";

    }

}
