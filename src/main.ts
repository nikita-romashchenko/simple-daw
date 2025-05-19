import { app, BrowserWindow } from "electron";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import started from "electron-squirrel-startup";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createWindow = () => {
  // Create the browser window.
  const launcherWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
    },
  });

  const dawWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
    },
  });

  if (DAW_VITE_DEV_SERVER_URL) {
    console.log("Environment variables:", {
      DAW_VITE_DEV_SERVER_URL,
      DAW_VITE_NAME,
      __dirname,
    });
    const url = `${DAW_VITE_DEV_SERVER_URL}/daw/index.html`;
    console.log("Loading from dev server:", url);
    dawWindow.loadURL(url);
  } else {
    const filePath = join(__dirname, "../dist/renderer/daw.html");
    console.log("Loading from file:", filePath);
    dawWindow.loadFile(filePath);
  }

  // and load the index.html of the app.
  if (LAUNCHER_VITE_DEV_SERVER_URL) {
    console.log("Environment variables:", {
      LAUNCHER_VITE_DEV_SERVER_URL,
      LAUNCHER_VITE_NAME,
      __dirname,
    });
    const url = `${LAUNCHER_VITE_DEV_SERVER_URL}/launcher/index.html`;
    console.log("Loading from dev server:", url);
    launcherWindow.loadURL(url);
  } else {
    const filePath = join(__dirname, "../dist/renderer/launcher.html");
    console.log("Loading from file:", filePath);
    launcherWindow.loadFile(filePath);
  }

  // Open the DevTools.
  launcherWindow.webContents.openDevTools();

  // Log any loading errors
  launcherWindow.webContents.on(
    "did-fail-load",
    (event, errorCode, errorDescription) => {
      console.error("Failed to load:", errorCode, errorDescription);
    }
  );
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
