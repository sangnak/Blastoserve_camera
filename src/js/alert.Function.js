const alertsOfForm = document.getElementById("alertsOfForm");
function alertFunc(type, msg) {
  alertsOfForm.classList.add(`alert-${type}`);
  alertsOfForm.innerText = msg;
  alertsOfForm.style.opacity = "1";
  setTimeout(() => {
    alertsOfForm.style.opacity = "0";
  }, 2000);
}
