const inputOutputs = document.querySelectorAll(".input-output")

inputOutputs.forEach(inputOutput => {
    const input = inputOutput.querySelector("#ratingInput")
    const output = inputOutput.querySelector("#amount")

    input.addEventListener("input", () => {
        output.value = input.value
    })
})

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".refresh-btn").forEach(btn => {
      btn.addEventListener("click", function () {
        let li = this.closest("li");
        let infoText = li.querySelector(".info-text");
  
        let dataOptions = [
          { key: "birthdate", label: "Geboortedatum" },
          { key: "fav_color", label: "Favoriete kleur" },
          { key: "most_energy", label: "Meeste energie in de" },
        ];


  
        let randomOption = dataOptions[Math.floor(Math.random() * dataOptions.length)];
        let newValue = li.dataset[randomOption.key];
  
        infoText.textContent = `${randomOption.label}: ${newValue}`;
      });
    });
  });
  