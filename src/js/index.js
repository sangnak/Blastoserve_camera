const webcamElement = document.getElementById("webcam");
const canvasElement = document.getElementById("canvas");
const snapSoundElement = document.getElementById("snapSound");
let submitButton = document.getElementById("submit_button");

let imageList = document.getElementById("myImageList");
let newUser = "user";
const webcam = new Webcam(
  webcamElement,
  { newUser },
  canvasElement,
  snapSoundElement
);

function startCamera() {
  webcam
    .start()
    .then((result) => {
      console.log("webcam started");
    })
    .catch((err) => {
      console.log(err);
    });
}

startCamera();



//take picture function
function takePicture() {
  var picture = webcam.snap();
var today=new Date()

  let h4 = document.createElement("h4");
  // fname = fname.value;
  h4.innerText = `patient name : ${fname}`;
  let img = document.createElement("img");
  let div = document.createElement("div");
  let div1 = document.createElement("div");
  img.src = picture;
  img.alt = "image/png";
  div1.classList.add("img-container");
  div.appendChild(img);
  let p = document.createElement("p");
  p.innerText = `Date : ${today.toLocaleTimeString()}`;
  div1.appendChild(h4);
  div1.appendChild(p);
  div1.appendChild(div);
  imageList.appendChild(div1);
}

function getDateTime() {
  var today = new Date();
  var todaysDate = today.toDateString().split(" ").join("_");
  var todaysTime = today.toTimeString().split(" ");
  var time = todaysTime[0].split(":").join("_");
  return todaysDate.concat("_" + time);
}
