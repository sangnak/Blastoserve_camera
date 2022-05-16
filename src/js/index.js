const { time } = require("console");
const fs = require("fs");
const webcamElement = document.getElementById("webcam");
const canvasElement = document.getElementById("canvas");
const snapSoundElement = document.getElementById("snapSound");
let imageList = document.getElementById("myImageList");
let cameraList = document.getElementById("camera-list");
let headingData = document.getElementById("heading-data");

let select = document.querySelector("#select");

let alert = document.getElementById("alert-component");
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

// startCamera();

let constraint = {
  video: true,
  audio: false,
};
try {
  // webcam.start();
  navigator.mediaDevices
    .getUserMedia(constraint)
    .then((stream) => {
      window.stream = stream;
      webcamElement.srcObject = stream;
      return navigator.mediaDevices.enumerateDevices();
    })
    .then(gotDevices);
} catch (error) {
  alertFunc("danger", "Webcam is not connected");

  console.log(error);
}
//to genarate the list of attached camera start

let getImage = document.getElementById("get-image");
let count = 0;
function gotDevices(devices) {
  select.innerHTML = "";
  select.appendChild(document.createElement("option"));
  devices.forEach((device) => {
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
      const option = document.createElement("option");
      option.value = device.deviceId;
      const label = device.label || `Camera ${count++}`;
      const textNode = document.createTextNode(label);

      option.appendChild(textNode);
      select.appendChild(option);
    }
  });
}
let currentStream;

function stopMediaTracks(stream) {
  stream.getTracks().forEach((track) => {
    track.stop();
  });
}
select.addEventListener("change", (event) => {
  if (typeof currentStream !== "undefined") {
    stopMediaTracks(currentStream);
  }
  const videoConstraints = {};
  if (select.value == "") {
    videoConstraints.facingMode = "environment";
  } else {
    videoConstraints.deviceId = { exact: select.value };
  }
  const constraints = {
    video: videoConstraints,
    audio: false,
  };

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then((stream) => {
      window.stream = stream;
      webcamElement.srcObject = stream;
      return navigator.mediaDevices.enumerateDevices();
    })
    .then(gotDevices)
    .catch((error) => {
      alertFunc("danger", error);
    });
});
// generated camera list end

// //Open up a modal for the button
// // Get the modal
// var modal = document.getElementById("myModal");

// // Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// var textAreaModal = document.getElementById("addNotesTextArea");

// // When the user clicks on the button, open the modal
// function openModal() {
//     modal.style.display = "block";
//     document.getElementById("addNotesTextArea").disabled = false;
// };

// // When the user clicks on <span> (x), close the modal
// function closeModal() {
//     modal.style.display = "none";
// };
// span.addEventListener("click", closeModal);

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// };

let imageVideoIds = [];
class ImageVideoId {
  constructor(patientName, imageVideoCaptureTime) {
    this.patientName = patientName;
    this.imageVideoCaptureTime = imageVideoCaptureTime;
  }
}

//take picture function start

function takePicture() {
  var picture = webcam.snap();

  let dir = localStorage.getItem("dir");

  let h4 = document.createElement("h4");
  // fname = fname.value;
  h4.innerText = `patient name : ${fname}`;
  let img = document.createElement("img");
  let div = document.createElement("div");
  let div1 = document.createElement("div");
  img.src = picture;

  // const imageName = saveImage(picture, dir);
  // console.log(imageName);

  saveImage(picture, dir);

  img.alt = "image/png";
  div1.classList.add("img-container");
  div.appendChild(img);
  let p = document.createElement("p");
  var today = new Date();

  // p.innerText = `Time : ${today.toLocaleTimeString()}`;

  let time_in_mili = today.toISOString().split(" ");
  p.innerText = `Time : ${today.toLocaleTimeString()}`;

  let div_text_input = document.createElement("div");
  let text_input = document.createElement("textarea");
  div_text_input.classList.add("d-flex");
  div_text_input.classList.add("justify-content-center");
  div_text_input.style.minheight = "100%";
  let p_new = document.createElement("p");
  p_new.innerText = "Category : Image";
  text_input.classList.add("mt-1");

  text_input.placeholder = "Enter Note Here";
  text_input.cols = 24;
  text_input.id = today.toISOString().split(" ");
  div_text_input.appendChild(text_input);
  div1.appendChild(h4);
  div1.appendChild(p);
  div1.appendChild(p_new);
  div1.appendChild(div);
  imageList.appendChild(div1);
  div1.appendChild(div_text_input);

  new_img_vid_id = new ImageVideoId(fname, time_in_mili);
  imageVideoIds.push(new_img_vid_id);
  // console.log(new_img_vid_id.patientName, new_img_vid_id.imageVideoCaptureTime);
  // console.log(time_in_mili);

  let data;
  let imageId = Math.random().toString(36).substr(2, 11);
  text_input.oninput = (e) => {
    text_input.value = e.target.value;

    const timeData = new Date().toLocaleTimeString();

    // data = `
    // {
    //   "id":"${imageId}"
    //   "image Name":"${imageName}",
    //   "Description":"${text_input.value}",
    //   "time":"${timeData}"
    // }`;

    //   text_input.onchange = () => {
    //     fs.appendFile(`${dir}/${fname}_Images_comments.txt`, data, function (err) {
    //       if (err) throw err;
    //       console.log("Thanks, It's saved to the file!");
    //     });
    //     alertFunc("commets are save successfully", "success");
    //     text_input.value = "";
    //   };
    // }

    //save images

    data = `
    {
      "Description":"${text_input.value}",
      "time":"${time_in_mili}"
    }`;
  };

  text_input.onblur = () => {
    let timeCount = time_in_mili[0].split(":").join("_");
    let fileName = `${dir}/image_${timeCount}_notes.` + "txt";

    let final = text_input.value.replace(/\s+/g, "");
    if (final == "") {
      text_input.value = null;

      if (fs.existsSync(fileName)) {
        fs.unlink(fileName, function (err) {
          if (err) throw err;
          alertFunc("danger", "File deleted!");
          console.log("File deleted!");
        });
      }
    } else {
      fs.writeFile(fileName, data, (err) => {
        if (err) return console.error(err);
        console.log("file saved to ", `${dir}/${fileName}`);
        alertFunc("success", "file saved successfully");
      });
    }
  };
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
  let count = new Date().toISOString().split(" ");
  console.log(count);
  let timeCount = count[0].split(":").join("_");
  let fileName = `image_${timeCount}.` + extension;

  fs.writeFile(`${dir}/${fileName}`, imageBuffer, (err) => {
    if (err) return console.error(err);
    console.log("file saved to ", `${dir}/${fileName}`);
    alertFunc(
      "success",
      "Image saved successfully, Scroll down to see Images."
    );
  });
}

//Recording

const recordButton = document.querySelector("#record");
const timer = document.querySelector("#stopwatch");
const pause = document.querySelector("#pauseOption");
const resume = document.querySelector("#resumeOption");

let mediaRecorder;
let recordedBlobs;
recordButton.addEventListener("click", () => {
  if (recordButton.innerText == "Start Recording") {
    startRecording();

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
  recordedBlobs = [];
  let options = { mimeType: "video/webm;codecs=vp9,opus" };
  try {
    if (window.stream == null) {
      alertFunc("warning", "please select camera");
      recordButton.textContent = "Start Recording";
      return;
    } else {
      mediaRecorder = new MediaRecorder(window.stream, options);
      recordButton.textContent = "Stop Recording";
      timer.style.display = "block";
      pause.style.display = "block";
      alertFunc("success", "Recording Started");

      startTimer();
    }
  } catch (e) {
    console.error("Exception while creating MediaRecorder:", e);
    errorMsgElement.innerHTML = `Exception while creating MediaRecorder: ${JSON.stringify(
      e
    )}`;
    return;
  }

  console.log("Created MediaRecorder", mediaRecorder, "with options", options);

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

//alert func

function stopRecording() {
  alertFunc("success", "recording stopped and saved successfully");

  stopTimer();
  resetTimer();
  timer.style.display = "none";
  pause.style.display = "none";
  resume.style.display = "none";
  timer.innerText = "";
  mediaRecorder.stop();
}

function pauseRecording() {
  stopTimer();
  mediaRecorder.pause();
  pause.style.display = "none";
  resume.style.display = "block";
}

function resumeRecording() {
  mediaRecorder.resume();
  startTimer();
  // setTimeout(function () {
  //   startTimer();
  // }, 1000);
  pause.style.display = "block";
  resume.style.display = "none";
}

// Previous playvideo with textarea

async function playVideo() {
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
  const videoName = await saveVideo(dir);
  video.controls = true;
  video.autoplay = true;
  video.muted = true;
  video.loop = true;
  video.play();
  saveVideo(dir);
  div1.classList.add("video-container");
  div.appendChild(video);
  let p = document.createElement("p");
  let today = new Date();
  let time_in_mili = today.toISOString().split(" ");
  p.innerText = `Time : ${today.toLocaleTimeString()}`;
  let p_new = document.createElement("p");
  p_new.innerText = "Category : Video";
  let div_text_input = document.createElement("div");
  let text_input = document.createElement("textarea");
  div_text_input.classList.add("d-flex");
  div_text_input.classList.add("justify-content-center");
  div_text_input.style.minheight = "100%";

  text_input.classList.add("mt-1");
  text_input.placeholder = "Enter Note Here";
  text_input.cols = 24;

  div_text_input.appendChild(text_input);

  div1.appendChild(h4);
  div1.appendChild(p);
  div1.appendChild(p_new);
  div1.appendChild(div);
  div1.appendChild(div_text_input);

  imageList.appendChild(div1);

  new_img_vid_id = new ImageVideoId(fname, time_in_mili);
  imageVideoIds.push(new_img_vid_id);
  console.log(new_img_vid_id.patientName, new_img_vid_id.imageVideoCaptureTime);
  console.log(time_in_mili);

  let data;
  let imageId = Math.random().toString(36).substr(2, 11);
  text_input.oninput = (e) => {
    text_input.value = e.target.value;

    data = `
    {
      "Description":"${text_input.value}",
      "time":"${time_in_mili}"
    }`;
  };

  text_input.onblur = () => {
    let timeCount = time_in_mili[0].split(":").join("_");
    let fileName = `${dir}/image_${timeCount}_notes.` + "txt";

    let final = text_input.value.replace(/\s+/g, "");
    if (final == "") {
      text_input.value = null;

      if (fs.existsSync(fileName)) {
        fs.unlink(fileName, function (err) {
          if (err) throw err;

          console.log("File deleted!");
        });
      }
    } else {
      fs.writeFile(fileName, data, (err) => {
        if (err) return console.error(err);
        console.log("file saved to ", `${dir}/${fileName}`);
        alertFunc("success", "commets are save successfully");
      });
    }
  };
}

// function playVideo() {
//   const superBuffer = new Blob(recordedBlobs, { type: "video/webm" });

//   let h4 = document.createElement("h4");

//   h4.innerText = `patient name : ${fname}`;
//   let video = document.createElement("video");
//   let div = document.createElement("div");
//   let div1 = document.createElement("div");
//   video.src = null;
//   video.srcObject = null;
//   video.src = window.URL.createObjectURL(superBuffer);
//   let dir = localStorage.getItem("dir");
//   saveVideo(dir);
//   video.controls = true;
//   video.autoplay = true;
//   video.muted = true;
//   video.loop = true;
//   video.play();
//   div1.classList.add("video-container");
//   div.appendChild(video);
//   let p = document.createElement("p");
//   p.innerText = `Time : ${today.toLocaleTimeString()}`;
//   div1.appendChild(h4);
//   div1.appendChild(p);
//   div1.appendChild(div);
//   imageList.appendChild(div1);
// }

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
function startForanotherPatient() {
  localStorage.clear();
}

//timer
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
