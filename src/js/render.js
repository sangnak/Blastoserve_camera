const fs = require("fs");

let submitButton = document.getElementById("submit_button");
// removeEventListener;
let fname = document.getElementById("fname");
let lname = document.getElementById("lname");
let pnumber = document.getElementById("pnumber");
let TOP = document.getElementById("TOP");
var today = new Date();
var todaysDate = today.toDateString().split(" ").join("_");
var todaysTime = today.toTimeString().split(" ");
var time = todaysTime[0].split(":").join("_");

//change the button name
function handleChange() {
  fname = fname.value;
  submitButton.innerText = `${fname}`;
  localStorage.setItem("fname", fname);
}
function saveData() {
  const dir = `./patient-details/${submitButton.innerText}_${todaysDate}_${time}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {
      recursive: true,
    });
    document.getElementById("dir-save").innerText = dir;
    localStorage.setItem("dir", dir);

    let data = `
  'First Name' : ${fname},
  'Last Name' : ${lname.value},
  'Contact Number' : ${parseInt(pnumber.value)},
  'Type Of Procedure' : ${TOP.value}
  
  
  `;

    fs.writeFile(`${dir}/${submitButton.innerText}.txt`, data, (err) => {
      if (err) console.log(err);
      else {
        console.log("File written successfully\n");

        location.href = "./pages/patient_camera.html";
      }
    });
  }
}
