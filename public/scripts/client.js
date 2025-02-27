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
          { key: "most_energy", label: "Meeste energie in" }
        ];

        let currentText = infoText.textContent;
        let currentIndex = dataOptions.findIndex(option => currentText.startsWith(option.label));
  
        let nextIndex = (currentIndex + 1) % dataOptions.length;
        let nextOption = dataOptions[nextIndex];
        let newValue = li.dataset[nextOption.key];
  
        infoText.textContent = `${nextOption.label}: ${newValue}`;
      });
    });
  });
  