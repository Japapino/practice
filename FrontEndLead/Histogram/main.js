const buildObjectBySeenCount = (list) => {
  // Write your code here
  // takes in an array of numbers, and returns an object (probably a map) with the frequency of each number
  // question task, do we include skipped numbers in the histogram? like if 4 -> 2, 5->0, 5->3; do we show 5?

  // result variable
  let result = new Map();

  list.forEach((n, i) => {
    const num = list[i];

    result.set(num, (result.get(num) || 0) + 1);
  });

  return result;
};

// this version makes the histogram in the console.
const HistogramBuilder_Console = (list) => {
  const data = buildObjectBySeenCount(list); // map
  // sort in reverse order
  const keys = Array.from(data.keys()).sort((a, b) => a - b); // keys are each number that is in the array at least once
  const maxHeight = Math.max(...Array.from(data.values()));
  const maxWidth = keys.length;

  // so we actually want the values on the x-axis, and frequency on the y-axis
  //      2  3  4  5
  //      2  1  2  1
  //      0  1  2  3
  for (let v = maxHeight; v >= 1; v--) {
    let line = " ";
    // the max count will determine the height
    // printing happens 1 horizontal line at a time
    // if we think of it like print a grid, and each space as a cell
    // we can assign an index to each number, with a space on the sides.

    // [ 2, 1, 2, 1]

    // start at the top of the graph, if the bar for the key appears in that line, print it.
    for (let k = 0; k <= maxWidth; k++) {
      const key = keys[k];
      const value = data.get(key);
      // console.log('key  : ', key);
      // console.log('value: ', value);
      // console.log('v    : ', v);
      // console.log('---------------------------')
      // if value >= i put #, if not add a space

      if (value >= v) {
        line = line + "#";
      } else {
        line = line + " ";
      }

      // console.log('line: ', line);
    }

    // need to know which keys' bar reaches this height.
    // data.get(k) > i, then print #
    // old loop doesnt work because the # won't always be together
    // need to concat space by space
    const string = v + " | " + line + " ";

    console.log(string);
  }

  console.log("     " + keys.join(""));

  // draw line at the bottom
};

const HistogramBuilder = (list) => {
  // points on html document
  // values
  const leftAxis = document.querySelector(".left-axis");
  // keys
  const bottomAxis = document.querySelector(".bottom-axis");
  // data
  const content = document.querySelector(".content");

  const dataMap = buildObjectBySeenCount(list);
  const keys = Array.from(dataMap.keys()).sort((a, b) => a - b);
  const maxHeight = Math.max(...dataMap.values()); 


  // add keys to x-axis
  keys.forEach((k) => {
    const newDiv = document.createElement("div");
    newDiv.textContent = k; 
    bottomAxis.appendChild(newDiv); 
  });

  // values for y-axis, use loop to start from 1 and go up to the maxHeight
  for (let i = maxHeight; i >= 1; i--) {
    const newDiv = document.createElement("div");
    newDiv.textContent = i; 
    leftAxis.appendChild(newDiv); 
  }

  // content
  keys.forEach((k) => {
    const newDiv = document.createElement("div");
    const value = dataMap.get(k); 
    newDiv.style.height = ((value / maxHeight) * 100) + '%'; //takes a string
    content.appendChild(newDiv);
  }); 

};

HistogramBuilder([2, 4, 5, 2, 3, 4]);
