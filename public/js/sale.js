const salesLink = document.getElementById("sales-link")


salesLink.addEventListener("change", function(){
    let collection = salesLink.selectedOptions
    window.location.href = `http://localhost:8000${collection[0].dataset.link}`;

})

