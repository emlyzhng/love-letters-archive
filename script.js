let main

document.addEventListener("DOMContentLoaded", () => {
//There must be a div with the class name main in your index.html file. All components will be appended to this div
  main = document.querySelector(".main")
  
  //Replace the url in the fetch with the url your google docs csv url
fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vQV5q04aVVMH0kuTNNIgqKCtwGNLP5wzY1vFYEH2B6IKtLVQ8G0UkINk6TaVnRWeU-AvIon9aq3r-op/pub?gid=0&single=true&output=csv")
    .then(response => response.text())
    .then(csvData => {
      Papa.parse(csvData, {
        header: true, // Treat the first row as column headers
        skipEmptyLines: true, // Ignore empty rows
        complete: function(results) {
          results.data.forEach(row => {
            displayComponent(row);
          });
        }
      });
    });
});

function displayComponent(row){
  console.log(row)
  //your code here
  let component = document.createElement("div")
  component.classList.add("letter-component")

  let name = document.createElement("p")
  name.textContent = row.To
  name.classList.add("to")

  let image = document.createElement("img")
  image.src = "images/" + row.image
  image.classList.add("letterimage")

  // component.addEventListener("click", function(){
  //   window.open(row.page)
  // })

  let name1 = document.createElement("p")
  name1.textContent = row.Quote
  name1.classList.add("quote")

  let name2 = document.createElement("p")
  name2.textContent = row.From
  name2.classList.add("from")

  component.append(name)
  component.append(image)
  component.append(name1)
  component.append(name2)
  main.append(component)
}