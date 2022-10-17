const itemName = document.getElementById("itemName")
const price = document.getElementById("price")

itemName.onchange = function () {
    let list = itemName.selectedOptions
    price.value = (list[0].dataset.price)
    //console.log(list)

}

