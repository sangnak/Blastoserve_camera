const fs = require("fs");
const webcamElement = document.getElementById("webcam");
const canvasElement = document.getElementById("canvas");
const snapSoundElement = document.getElementById("snapSound");
let imageList = document.getElementById("myImageList");
let cameraList = document.getElementById("camera-list");
let headingData = document.getElementById("heading-data");

let select = document.querySelector(".select-list");
headingData.innerText = `${localStorage.getItem(
  "fname"
)}(${localStorage.getItem("TOP")})`;
var today = new Date();
let newUser = "user";
const webcam = new Webcam(
  webcamElement,
  { newUser },
  canvasElement,
  snapSoundElement
);
let fname = localStorage.getItem("fname");

// startCamera();
const videoConstraits = true;

const constraints = {
  audio: false,
  video: videoConstraits,
};

//to genarate the list of attached camera
navigator.mediaDevices
  .getUserMedia(constraints)
  .then((stream) => {
    window.stream = stream;
    webcamElement.srcObject = stream;
    return navigator.mediaDevices.enumerateDevices();
  })
  .then(gotDevices)
  .catch((error) => {
    console.error(error);
  });
let getImage = document.getElementById("get-image");
let labels = [];
let count = 0;
function gotDevices(devices) {
  devices.forEach((device, index) => {
    if (device.kind == "videoinput") {
      console.log(
        device.kind +
          ": " +
          device.label +
          " id = " +
          device.deviceId +
          " group id = " +
          device.groupId
      );
      // webcam.webcamList.push(device.deviceId);
      labels.push(device.deviceId);
      console.log(labels);
      var select = document.createElement("select");
      select.classList.add("select-list");
      select.name = "camera lists";
      select.id = "camera";
      labels.forEach((val) => {
        console.log(webcam.selectCamera);

        const option = document.createElement("option");
        option.value = val != "" ? val : "camera " + count;
        option.text = val != "" ? val : "camera " + count;
        count += 1;
        option.key = index;
        select.appendChild(option);
      });
      labels.push(device.deviceId);
      label.innerHTML = "Choose your camera: ";
      label.htmlFor = "camera";

      cameraList.appendChild(label).appendChild(select);
    }
  });
}

const label = document.createElement("label");

//take picture function
function takePicture() {

  // Save Image
  var picture = webcam.snap();
  let dir = localStorage.getItem("dir");
  saveImage(picture, dir);

  // Add Card in Image/Video List Area
  let h4 = document.createElement("h4");
  h4.innerText = `patient name : ${fname}`;

  let img = document.createElement("img");
  let div = document.createElement("div");
  let div1 = document.createElement("div");

  img.src = picture;
  img.alt = "image/png";
  div1.classList.add("img-container");
  div.appendChild(img);

  let p = document.createElement("p");
  p.innerText = `Time : ${today.toLocaleTimeString()}`;

  let div_text_input = document.createElement("div");
  div_text_input.classList.add("d-flex");
  div_text_input.classList.add("justify-content-center");
  // div_text_input.classList.add("form-control");
  div_text_input.style.minheight = "100%";

  

  // <div class="container d-flex justify-content-center" style="width: 100%">
  //   <button
  //     class="btn btn-green mt-3 px-4 border border-primary py-3 w-500"
  //     onclick="takePicture()"
  //   >
  //     Click here or on image to take photos
  //   </button>
  // </div>;

  let text_input = document.createElement("textarea");
  text_input.classList.add("mt-1")
  text_input.placeholder = "Note Here"

  let save_note_btn = document.createElement("button")

  div_text_input.appendChild(text_input)

  div1.appendChild(h4);
  div1.appendChild(p);
  div1.appendChild(div);
  div1.appendChild(div_text_input);

  imageList.appendChild(div1);
}

function saveImage(picture, dir) {
  var matches = picture.match(/^data:([A-Za-z-+/]+);base64,(.+)$/),
    response = {};

  response.type = matches[1];
  response.data = new Buffer(matches[2], "base64");
  let decodedImg = response;
  let imageBuffer = decodedImg.data;
  let type = decodedImg.type;
  let extension = "png";
  let count = new Date().toTimeString().split(" ");
  console.log(count);
  count = count[0].split(":").join("_");
  let fileName = `image_${count}.` + extension;

  fs.writeFile(`${dir}/${fileName}`, imageBuffer, (err) => {
    if (err) return console.error(err);
    console.log("file saved to ", `${dir}/${fileName}`);
  });
}

//Recording

const recordButton = document.querySelector("#record");
const timer = document.querySelector("#stopwatch");

let mediaRecorder;
let recordedBlobs;
recordButton.addEventListener("click", () => {
  console.log(recordButton.textContent);
  if (recordButton.innerText == "Start Recording") {
    
    startRecording();

    recordButton.textContent = "Stop Recording";

    console.log(recordButton);

    recordButton.className =
      "btn btn-light mt-3 px-4 border border-primary py-3 w-500 text-danger";
  } else {
    stopRecording();
    recordButton.textContent = "Start Recording";
    recordButton.className =
      "btn btn-danger mt-3 px-4 border border-primary py-3 w-500";
  }
});

//function start recording
function startRecording() {
  alert("recording started");
  timer.style.display = "block";
  startTimer();
  

  recordedBlobs = [];
  let options = { mimeType: "video/webm;codecs=vp9,opus" };
  try {
    mediaRecorder = new MediaRecorder(window.stream, options);
  } catch (e) {
    console.error("Exception while creating MediaRecorder:", e);
    errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(
      e
    )}`;
    return;
  }

  console.log("Created MediaRecorder", mediaRecorder, "with options", options);
  recordButton.textContent = "Stop Recording";

  mediaRecorder.onstop = (event) => {
    console.log("Recorder stopped: ", event);
    console.log("Recorded Blobs: ", recordedBlobs);
  };
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start();
  console.log("MediaRecorder started", mediaRecorder);
  mediaRecorder.addEventListener("stop", playVideo);
}

function handleDataAvailable(event) {
  console.log("handleDataAvailable", event);
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
  }
}

function stopRecording() {
  alert("recording stopped and saved automatically");
  stopTimer();
  resetTimer();
  timer.style.display = "none";
  timer.innerText = "";
  mediaRecorder.stop();
}

function playVideo() {
  const superBuffer = new Blob(recordedBlobs, { type: "video/webm" });

  let h4 = document.createElement("h4");

  h4.innerText = `patient name : ${fname}`;
  let video = document.createElement("video");
  let div = document.createElement("div");
  let div1 = document.createElement("div");
  video.src = null;
  video.srcObject = null;
  video.src = window.URL.createObjectURL(superBuffer);
  let dir = localStorage.getItem("dir");
  saveVideo(dir);
  video.controls = true;
  video.autoplay = true;
  video.muted = true;
  video.loop = true;
  video.play();
  div1.classList.add("video-container");
  div.appendChild(video);
  let p = document.createElement("p");
  p.innerText = `Time : ${today.toLocaleTimeString()}`;

  let div_text_input = document.createElement("div");
  div_text_input.classList.add("d-flex");
  div_text_input.classList.add("justify-content-center");
  // div_text_input.classList.add("form-control");
  div_text_input.style.minheight = "100%";

  // <div class="container d-flex justify-content-center" style="width: 100%">
  //   <button
  //     class="btn btn-green mt-3 px-4 border border-primary py-3 w-500"
  //     onclick="takePicture()"
  //   >
  //     Click here or on image to take photos
  //   </button>
  // </div>;

  let text_input = document.createElement("textarea");
  text_input.classList.add("mt-1");
  text_input.placeholder = "Note Here";

  let save_note_btn = document.createElement("button");

  div_text_input.appendChild(text_input);

  div1.appendChild(h4);
  div1.appendChild(p);
  div1.appendChild(div);
  div1.appendChild(div_text_input);

  imageList.appendChild(div1);
}

async function saveVideo(dir) {
  const blob = new Blob(recordedBlobs, { type: "video/mp4" });
  const buffer = Buffer.from(await blob.arrayBuffer());
  let count = new Date().toTimeString().split(" ");

  count = count[0].split(":").join("_");
  fs.writeFile(`${dir}/video_${count}.mp4`, buffer, (err) => {
    if (err) return console.error(err);
    console.log("file saved to ", `${dir}/video.mp4`);
  });
}
//clear localstorage

function startNewData() {
  localStorage.clear();
}

var hr = 0;
var min = 0;
var sec = 0;
var stoptime = true;

function startTimer() {
  if (stoptime == true) {
    stoptime = false;
    timerCycle();
  }
}
function stopTimer() {
  if (stoptime == false) {
    stoptime = true;
  }
}

function timerCycle() {
  if (stoptime == false) {
    sec = parseInt(sec);
    min = parseInt(min);
    hr = parseInt(hr);

    sec = sec + 1;

    if (sec == 60) {
      min = min + 1;
      sec = 0;
    }
    if (min == 60) {
      hr = hr + 1;
      min = 0;
      sec = 0;
    }

    if (sec < 10 || sec == 0) {
      sec = "0" + sec;
    }
    if (min < 10 || min == 0) {
      min = "0" + min;
    }
    if (hr < 10 || hr == 0) {
      hr = "0" + hr;
    }

    timer.innerHTML = hr + ":" + min + ":" + sec;

    setTimeout("timerCycle()", 1000);
  }
}

function resetTimer() {
  timer.innerHTML = "00:00:00";
  stoptime = true;
  hr = 0;
  sec = 0;
  min = 0;
}
