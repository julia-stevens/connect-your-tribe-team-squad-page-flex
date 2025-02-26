const inputOutputs = document.querySelectorAll(".input-output")

inputOutputs.forEach(inputOutput => {
    const input = inputOutput.querySelector("#ratingInput")
    const output = inputOutput.querySelector("#amount")

    input.addEventListener("input", () => {
        output.value = input.value
    })
})