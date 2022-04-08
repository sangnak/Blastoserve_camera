const fs = require("fs");
const webcamElement = document.getElementById("webcam");
const canvasElement = document.getElementById("canvas");
const snapSoundElement = document.getElementById("snapSound");
let imageList = document.getElementById("myImageList");
let cameraList = document.getElementById("camera-list");
let headingData = document.getElementById("heading-data");

headingData.innerText = `${localStorage.getItem(
  "fname"
)}(${localStorage.getItem("TOP")})`;

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
  let count = new Date().toTimeString().split(" ");
  count = count[0];
  let fileName = `image${count != 0 ? count : ""}.` + extension;

  fs.writeFile(`${dir}/${fileName}`, imageBuffer, (err) => {
    if (err) return console.error(err);
    console.log("file saved to ", `${dir}/${fileName}`);
  });
  // link.click();
}

//to genarate the list of attached camera
// let select = document.querySelector(".select-list");
// let getImage = document.getElementById("get-image");
// let labels = [];
// let count = 0;
// function gotDevices(devices) {
//   devices.forEach((device, index) => {
//     if (device.kind == "videoinput") {
//       console.log(
//         device.kind +
//           ": " +
//           device.label +
//           " id = " +
//           device.deviceId +
//           " group id = " +
//           device.groupId
//       );
//       // webcam.webcamList.push(device.deviceId);
//       labels.push(device.label);
//       console.log(labels);
//       var select = document.createElement("select");
//       select.classList.add("select-list");
//       select.name = "camera lists";
//       select.id = "camera";
//       labels.forEach((val) => {
//         console.log(webcam.selectCamera);

//         const option = document.createElement("option");
//         option.value = val != "" ? val : "camera " + count;
//         option.text = val != "" ? val : "camera " + count;
//         count += 1;
//         option.key = index;
//         select.appendChild(option);
//       });
//       labels.push(device.deviceId);
//       label.innerHTML = "Choose your camera: ";
//       label.htmlFor = "camera";

//       cameraList.appendChild(label).appendChild(select);
//     }
//   });
// }

// navigator.mediaDevices
//   .enumerateDevices()
//   .then(gotDevices)
//   .catch(function (err) {
//     console.log(err.name + ": " + err.message);
//   });

// const constraints = {
//   video: true,
//   audio: false,
// };
// navigator.mediaDevices
//   .getUserMedia(constraints)
//   .then((stream) => {
//     currentStream = stream;
//     webcamElement.srcObject = stream;
//     return navigator.mediaDevices.enumerateDevices();
//   })
//   .then(gotDevices)
//   .catch((error) => {
//     console.error(error);
//   });

// const label = document.createElement("label");

//clear localstorage

function startNewData() {
  localStorage.clear();
}

// //New Recording functionality

// let camera_button = document.querySelector("#start-camera");
// let video = document.querySelector("#video");
// let start_button = document.querySelector("#start-record");
// let stop_button = document.querySelector("#stop-record");
// let download_link = document.querySelector("#download-video");

// let camera_stream = null;
// let media_recorder = null;
// let blobs_recorded = [];

// camera_button.addEventListener('click', async function() {
//   camera_stream = await webcam.stream();
// 	video.srcObject = camera_stream;
// });

// start_button.addEventListener('click', function() {
//     // set MIME type of recording as video/webm
//     media_recorder = new MediaRecorder(camera_stream, { mimeType: 'video/webm' });

//     // event : new recorded video blob available 
//     media_recorder.addEventListener('dataavailable', function(e) {
// 		blobs_recorded.push(e.data);
//     });

//     // event : recording stopped & all blobs sent
//     media_recorder.addEventListener('stop', function() {
//   	// create local object URL from the recorded video blobs
//     let video_local = URL.createObjectURL(new Blob(blobs_recorded, { type: 'video/webm' }));
//     download_link.href = video_local;

//     stop_button.style.display = 'none';
//     download_link.style.display = 'block';
//     });

//     // start recording with each recorded blob having 1 second video
//     media_recorder.start(1000);

//     start_button.style.display = 'none'
//     stop_button.style.display = 'block';
// });

// stop_button.addEventListener('click', function() {
// 	media_recorder.stop(); 
// });