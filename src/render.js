const fs = require("fs");

let fname = document.getElementById("fname");
var today = new Date();
var todaysDate = today.toDateString().split(" ").join("_");
var todaysTime = today.toTimeString().split(" ");
var time = todaysTime[0].split(":").join("_");
console.log();

const dir = `shubham_${todaysDate}_${time}`;
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, {
    recursive: true,
  });
}

//change the button name
function handleChange() {
  fname = fname.value;
  submitButton.innerText = `start capturing data for ${fname}`;
}
