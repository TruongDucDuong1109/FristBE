const fs = require("fs");
const path = require("path");
const { getFileNameCategory, getFileModifyCategory, getFileSizeCategory, getFileType } = require("./handle-file");
function categorizeFile(file, options) {
const { type, name, modify, size, n, m, s } = options;
const typeCategories = type ? type.split(",").map((type) => type.trim()) : [];
if (!fs.existsSync(file)) {
    console.log(`The specified file or directory does not exist: ${file}`);
    return;
  }

  if (fs.lstatSync(file).isDirectory()) {
    const files = fs.readdirSync(file);

    files.forEach((fileName) => {
      const filePath = path.join(file, fileName);
      if (fs.lstatSync(filePath).isFile()) {
        const fileType = getFileType(filePath);
        let shouldCopy = true;

        if (typeCategories.length > 0 && !typeCategories.includes(fileType)) {
          shouldCopy = false;
        }

        const fileNameCategory = getFileNameCategory(filePath);
        const fileSizeCategory = getFileSizeCategory(filePath);
        const fileModifyCategory = getFileModifyCategory(filePath);

        if (shouldCopy && (name || n) && (size || s) && (modify || m)) {
          const outputDirectory = options.output || "";
          const destinationDir = path.join(outputDirectory, fileType, fileNameCategory, fileSizeCategory, fileModifyCategory);
          const destinationFile = path.join(destinationDir, fileName);
          fs.mkdirSync(destinationDir, { recursive: true });
          fs.copyFileSync(filePath, destinationFile);
        } 
        
        else if (shouldCopy && (name || n) && (size || s)) {
          const outputDirectory = options.output || "";
          const destinationDir = path.join(outputDirectory, fileType, fileNameCategory, fileSizeCategory);
          const destinationFile = path.join(destinationDir, fileName);
          fs.mkdirSync(destinationDir, { recursive: true });
          fs.copyFileSync(filePath, destinationFile);
        } 
        
        else if (shouldCopy && (name || n) && (modify || m)) {
          const outputDirectory = options.output || "";
          const destinationDir = path.join(outputDirectory, fileType, fileNameCategory, fileModifyCategory);
          const destinationFile = path.join(destinationDir, fileName);
          fs.mkdirSync(destinationDir, { recursive: true });
          fs.copyFileSync(filePath, destinationFile);
        } 
        
        else if (shouldCopy && (size || s) && (modify || m)) {
          const outputDirectory = options.output || "";
          const destinationDir = path.join(outputDirectory, fileType, fileSizeCategory, fileModifyCategory);
          const destinationFile = path.join(destinationDir, fileName);
          fs.mkdirSync(destinationDir, { recursive: true });
          fs.copyFileSync(filePath, destinationFile);
        } 
        
        else if (shouldCopy && (name || n)) {
          const outputDirectory = options.output || "";
          const destinationDir = path.join(outputDirectory, fileType, fileNameCategory);
          const destinationFile = path.join(destinationDir, fileName);
          fs.mkdirSync(destinationDir, { recursive: true });
          fs.copyFileSync(filePath, destinationFile);
        } 
        
        else if (shouldCopy && (modify || m)) {
          const outputDirectory = options.output || "";
          const destinationDir = path.join(outputDirectory, fileType, fileModifyCategory);
          const destinationFile = path.join(destinationDir, fileName);
          fs.mkdirSync(destinationDir, { recursive: true });
          fs.copyFileSync(filePath, destinationFile);
        } 
        
        else if (shouldCopy && (size || s)) {
          const outputDirectory = options.output || "";
          const destinationDir = path.join(outputDirectory, fileType, fileSizeCategory);
          const destinationFile = path.join(destinationDir, fileName);
          fs.mkdirSync(destinationDir, { recursive: true });
          fs.copyFileSync(filePath, destinationFile);
        } 
        
        else if (shouldCopy) {
          const outputDirectory = options.output || "";
          const destinationDir = path.join(outputDirectory, fileType);
          const destinationFile = path.join(destinationDir, fileName);
          fs.mkdirSync(destinationDir, { recursive: true });
          fs.copyFileSync(filePath, destinationFile);
          console.log(`Copied ${filePath} to ${destinationFile}`);
        }
      }
    });
  } else {
    console.log("The specified context is not a directory.");
  }
}

module.exports = categorizeFile;
