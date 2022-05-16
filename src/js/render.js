const fs = require("fs");

let submitButton = document.getElementById("submit_button");
// removeEventListener;

var today = new Date();
var todaysDate = today.toDateString().split(" ").join("_");
var todaysTime = today.toTimeString().split(" ");
var time = todaysTime[0].split(":").join("_");
const save__btn = document.querySelector(".save__btn");

//change the button name

fname.oninput = (e) => {
  submitButton.innerText = e.target.value;
};
// function handleChange() {
//   fname = fname.value;
//   submitButton.innerText = `${fname}`;
// }

save__btn.addEventListener("click", (e) => {
  e.preventDefault();

  let fname = document.getElementById("fname");
  let lname = document.getElementById("lname");
  let pnumber = document.getElementById("pnumber");
  let TOP = document.getElementById("TOP");

  if (fname.value == "" || fname.value.length < 3 || fname.value.length > 20) {
    alertFunc(
      "danger",
      "First Name Must be atleast three character and maximum 20 character"
    );
    return false;
  } else if (
    lname.value == "" ||
    lname.value.length < 3 ||
    lname.value.length > 20
  ) {
    alertFunc(
      "danger",
      "Last Name Must be atleast three character and maximum 20 character"
    );
    return false;
  } else if (pnumber.value == "" || pnumber == null) {
    alertFunc("danger", "Please fill the date");
    return false;
  } else if (TOP.value == "" || TOP == null) {
    alertFunc("danger", "Type of procedure is required field");
    return false;
  } else {
    localStorage.setItem("fname", submitButton.innerText);
    const dir = `./patient-details/${submitButton.innerText}_${todaysDate}_${time}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {
        recursive: true,
      });
      //document.getElementById("dir-save").innerText = dir;
      localStorage.setItem("dir", dir);
      localStorage.setItem("TOP", TOP.value);

      let data = `

      'First Name' : ${fname.value},
      'Last Name' : ${lname.value},

      'Date' : ${pnumber.value},

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
});
