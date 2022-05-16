const { app, BrowserWindow } = require("electron");
const path = require("path");
const fs = require("fs");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  let { width, height } = require("electron").screen.getPrimaryDisplay().size; //get the size of the windows screen
  const mainWindow = new BrowserWindow({
    width: width,
    height: height,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      icon: path.join(__dirname + "./assets/images/blsdtlogo.png"),

      // preload: path.join(__dirname, "preload.js"),
    },
  });
  mainWindow.setMenuBarVisibility(false);
  // and load the index.html of the app.

  let pageToLoad = "./src/pages/instructions.html";

  const dir = `user-data.json`;
  if (!fs.existsSync(dir)) {
    //make user data file, if no user-data json

    let data = '{ "show-instructions": true }';
    fs.writeFile(`user-data.json`, data, (err) => {
      if (err) console.log(err);
    });

  }else{
    load_file = fs.readFileSync(`user-data.json`);
    user_data = JSON.parse(load_file);

    //check if show-instructions is true or false
    if (!user_data["show-instructions"])
      pageToLoad = "./src/pages/blastoserve_ad.html";
  }

  mainWindow.loadFile(pageToLoad);

  // Open the DevTools.

  //We want the dev tools option only during production
  // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
