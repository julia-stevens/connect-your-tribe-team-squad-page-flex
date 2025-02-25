const ratingInput = document.getElementById("ratingInput")
const amount = document.getElementById("amount")

ratingInput.addEventListener("input", changeOutputValue)

function changeOutputValue() {
    amount.value = ratingInput.value;
}
