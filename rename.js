const [oldFilePath, newFilePath] = [process.argv[2], process.argv[3]];

const renameFile = () => {
  require('fs').rename(oldFilePath, newFilePath, function (err) {
    if (err) console.log(err);
    console.log('File successfully renamed!');
  });
};

renameFile();
