const fs = require("fs");
const webcamElement = document.getElementById("webcam");
const canvasElement = document.getElementById("canvas");
const snapSoundElement = document.getElementById("snapSound");
let imageList = document.getElementById("myImageList");
let newUser = "user";
const webcam = new Webcam(
  webcamElement,
  { newUser },
  canvasElement,
  snapSoundElement
);
let fname = localStorage.getItem("fname");

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
  var today = new Date();
  let dir = localStorage.getItem("dir");

  let h4 = document.createElement("h4");
  // fname = fname.value;
  h4.innerText = `patient name : ${fname}`;
  let img = document.createElement("img");
  let div = document.createElement("div");
  let div1 = document.createElement("div");
  img.src = picture;


  saveImage(picture, dir);

  img.alt = "image/png";
  div1.classList.add("img-container");
  div.appendChild(img);
  let p = document.createElement("p");
  p.innerText = `Time : ${today.toLocaleTimeString()}`;
  div1.appendChild(h4);
  div1.appendChild(p);
  div1.appendChild(div);
  imageList.appendChild(div1);
}

// function getDateTime() {
//   var today = new Date();
//   var todaysDate = today.toDateString().split(" ").join("_");
//   var todaysTime = today.toTimeString().split(" ");
//   var time = todaysTime[0].split(":").join("_");
//   return todaysDate.concat("_" + time);
// }

function saveImage(picture, dir) {
  // var link = document.getElementById('id-1');
  // // link.download = "test.png";
  // link.href = picture;
  // const fileContents = new Buffer(picture, "base64");
  var matches = picture.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
    response = {};

  response.type = matches[1];
  response.data = new Buffer(matches[2], "base64");
  let decodedImg = response;
  let imageBuffer = decodedImg.data;
  let type = decodedImg.type;
  let extension = "png";
let count =new Date().toTimeString().split(' ')
count=count[0];
  let fileName = `image${count != 0 ? count : ""}.` + extension;

  fs.writeFile(`${dir}/` + fileName, imageBuffer, (err) => {
    if (err) return console.error(err);
    console.log("file saved to ");
  });
  // link.click();
}

//to genarate the list of attached camera
const genarate = () => {
  var select = document.createElement("select");
  select.name = "camera lists";
  select.id = "camera";
  console.log(labels);
  let count = 0;
  labels.forEach((val) => {
    var option = document.createElement("option");
    option.value = val != "" ? val : "camera " + count;
    option.text = val != "" ? val : "camera " + count;
    select.appendChild(option);
  });
  label.innerHTML = "Choose your camera: ";
  label.htmlFor = "camera";

  cameraList.appendChild(label).appendChild(select);
};