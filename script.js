document.addEventListener("DOMContentLoaded", () => {
  let main = document.querySelector(".main");
  
  let lightbox = document.getElementById("lightbox");
  let lightboxImage = document.getElementById("lightboxImage");
  let lightboxText = document.getElementById("lightboxText");
  let flipContainer = document.querySelector(".flip-container");

  // Fetch CSV data
  fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vQV5q04aVVMH0kuTNNIgqKCtwGNLP5wzY1vFYEH2B6IKtLVQ8G0UkINk6TaVnRWeU-AvIon9aq3r-op/pub?gid=0&single=true&output=csv")
      .then(response => response.text())
      .then(csvData => {
          Papa.parse(csvData, {
              header: true,
              skipEmptyLines: true,
              complete: function(results) {
                  results.data.forEach(row => {
                      displayComponent(row);
                  });
              }
          });
      });

      function displayComponent(row) {
        let component = document.createElement("div");
        component.classList.add("letter-component");
    
        let name = document.createElement("p");
        name.textContent = "To: " + row.To;
        name.classList.add("to");
    
        let image = document.createElement("img");
        image.src = "images/" + row.image;
        image.classList.add("letterimage");
    
        let from = document.createElement("p");
        from.textContent = "From: " + row.From;
        from.classList.add("from");
    
        component.append(name, image, from);
        main.append(component);
    
        // Open Lightbox when clicking on image
        image.addEventListener("click", function() {
            lightboxImage.src = image.src;
            lightboxText.textContent = row.Quote; // Quote appears only in the lightbox
            lightbox.style.display = "flex";
        });
    }
    

  // Close lightbox when clicking outside the content
  lightbox.addEventListener("click", function(event) {
      if (!event.target.closest(".lightbox-content")) {
          lightbox.style.display = "none";
          flipContainer.classList.remove("flipped");
      }
  });

  // Flip the card when clicking on the image inside lightbox
  lightboxImage.addEventListener("click", function() {
      flipContainer.classList.toggle("flipped");
  });
});
