const fs = require("fs");
const path = require("path");

const FILE_TYPES = {
    image: ["jpg", "jpeg", "png", "gif"],
    text: ["txt", "doc", "docx"],
    bash: ["sh", "bash"],
  };

function getFileType(file) {
    const ext = path.extname(file).slice(1);
    for (const type in FILE_TYPES) {
      if (FILE_TYPES[type].includes(ext)) {
        return type;
      }
    }
    return "others";
  }

function getFileNameCategory(file) {
  const fileType = getFileType(file);
  if (fileType === "bash" || fileType === "others") {
    return;
  }

  const fileName = path.basename(file, path.extname(file));
  const firstLetter = fileName.charAt(0).toUpperCase();
  const category = `${firstLetter}-${String.fromCharCode(firstLetter.charCodeAt(0) + 3)}`;
  return category;
}

function getFileModifyCategory(file) {
  const stats = fs.statSync(file);
  const today = new Date();
  const fileDate = stats.mtime;
  const timeDiff = today.getTime() - fileDate.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  const fileType = getFileType(file);
  if (fileType === "bash" || fileType === "others") {
    return;
  }

  if (daysDiff === 0) {
    return "Today";
  } else if (daysDiff <= 7) {
    return "This week";
  } else if (daysDiff <= 30) {
    return "This month";
  } else {
    return "This year";
  }
}

function getFileSizeCategory(file) {
  const stats = fs.statSync(file);
  const fileSizeInBytes = stats.size;
  const fileType = getFileType(file);
  if (fileType === "bash" || fileType === "others") {
    return;
  }

  if (fileSizeInBytes > 10 * 1024 * 1024) {
    return "Verybig";
  } else if (fileSizeInBytes >= 5 * 1024 * 1024) {
    return "Big";
  } else if (fileSizeInBytes >= 1024 * 1024) {
    return "Medium";
  } else if (fileSizeInBytes >= 100 * 1024) {
    return "Small";
  } else {
    return "Tiny";
  }
}
module.exports = {
    getFileNameCategory,
    getFileModifyCategory,
    getFileSizeCategory,
    getFileType
  };