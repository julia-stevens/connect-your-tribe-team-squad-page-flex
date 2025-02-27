document.addEventListener("DOMContentLoaded", () => {
  const inputOutputs = document.querySelectorAll(".input-output");

  inputOutputs.forEach(inputOutput => {
      const input = inputOutput.querySelector("input[type='range']");
      const output = inputOutput.querySelector("output");

      if (input && output) {
          input.addEventListener("input", () => {
              output.textContent = input.value; 
          });
      }
  });
});


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
  