const express = require("express");
const { exec } = require("child_process");
const path = require("path");

const app = express();
const port = 3000;

// Set the paths for input and output directories
const inputFilePath = path.join(__dirname, "input", "input_file.wav");
const outputDirectory = path.join(__dirname, "output");

app.post("/convert", (req, res) => {
  exec(
    `basic_pitch ${outputDirectory} ${inputFilePath}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return res.status(500).send("Error during MIDI conversion.");
      }
      console.log(stdout);
      res.send("MIDI conversion successful!");
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
