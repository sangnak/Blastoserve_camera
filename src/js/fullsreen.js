const idFullsreen = document.getElementById("id-fullscreen");
const elem = document.querySelector("#webcam");
idFullsreen.onclick = () => {
  if (idFullsreen.classList.contains("fa-expand")) {
    // idFullsreen.classList.remove("fa-expand");

    // idFullsreen.classList.add("fa-compress");
    openFullscreen();
  } else {
    idFullsreen.classList.remove("fa-compress");
    idFullsreen.classList.add("fa-expand");
    // closeFullscreen();
    console.log("closeSreen");
  }
};

function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }

  elem.removeAttribute("controls");
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
}

