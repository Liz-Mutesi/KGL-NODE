const salesLink = document.getElementById("sales-link")

const itemName = document.getElementById("itemName")

salesLink.addEventListener("change", function(){
    let collection = salesLink.selectedOptions
    window.location.href = `http://localhost:5000${collection[0].dataset.link}`;

})
itemName.onchange= function(){
    let collection = itemName.selectedOptions
    console.log(collection[0].dataset.price)
    

}

