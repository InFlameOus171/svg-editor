require('fs').stat(process.argv[2], (err, stats) => {
  if (err) {
    console.error('File does not exist!');
  } else {
    const size = stats.size / 1000;
    const red = '\x1b[31m%s\x1b[0m';
    const yellow = '\x1b[33m%s\x1b[0m';
    const green = '\x1b[32m%s\x1b[0m';
    const color = size > 150 ? red : size > 100 ? yellow : green;
    console.log('Size of bundle:');
    console.log(color, `${size}kB`);
    console.log();
  }
});
