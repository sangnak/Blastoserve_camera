const { app, BrowserWindow } = require("electron");
const path = require("path");
const fs = require("fs");
if (require("electron-squirrel-startup")) {
  app.quit();
}
const createWindow = () => {
  let { width, height } = require("electron").screen.getPrimaryDisplay().size; //get the size of the windows screen
  const mainWindow = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      icon: path.join(__dirname + "./assets/images/blsdtlogo.png"),
    },
  });
  mainWindow.setMenuBarVisibility(false);
  let pageToLoad = "./src/pages/instructions.html";
  const dir = `user-data.json`;
  if (!fs.existsSync(dir)) {
    let data = '{ "show-instructions": true }';
    fs.writeFile(`user-data.json`, data, (err) => {
      if (err) console.log(err);
    });
  } else {
    load_file = fs.readFileSync(`user-data.json`);
    user_data = JSON.parse(load_file);
    if (!user_data["show-instructions"])
      pageToLoad = "./src/pages/blastoserve_ad.html";
  }
  mainWindow.loadFile(pageToLoad);
};
app.on("ready", createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
