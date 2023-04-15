// Assignment Code
const generateBtn = document.querySelector("#generate");
const regenerateBtn = document.querySelector("#regenerate");

regenerateBtn.disabled = true; //before the first clicking of generateBtn, this button is disabled to avoid error.

const types = ["lowercase", "uppercase", "numeric", "special"];
const listOfAvaChar = [
  "abcdefghijklmnopqrstuvwxyz",
  "ABCDEFGJHIJKLMNOPQRSTUVWXYZ",
  "0123456789",
  "!()-.?[]_`~;:!#$%^&*+=",
];

let length = 0;
let numOfTypes = 0;
let includeTypes = [false, false, false, false];
//After clicking generateBtn to generate pwd, these variables are set and their values saved. They can be used to regenerate the pwd using regenerateBtn.

function shuffle(text) {
  let remainText = text;
  let newText = "";
  let textLen = text.length;

  for (var i = 0; i < textLen; i++) {
    let index = Math.floor(Math.random() * remainText.length);
    newText += remainText[index];
    remainText =
      remainText.slice(0, index) + remainText.slice(index + 1, textLen);
  }

  return newText;
} //To shuffle the password at the end.

function randomChunk(str, len) {
  genChunk = "";

  for (var i = 0; i < len; i++) {
    let index = Math.floor(Math.random() * str.length);
    genChunk += str[index];
  }

  return genChunk;
} //For each type of char, a random chunk is created as a part of the pwd. The chunks will finally be put together to form the password.

function satisfyCriteria(typeOfChar) {
  return confirm(`Do you want to include ${typeOfChar} in the password?`);
} //Create prompt to ask for the selection of the type of char, and validate the input.

function needCheckRepeat() {
  return confirm(
    `Do you require no three consecutive characters in the password the same?`
  );
} //Ask whether the user want extra security by avoiding the creation of pwd with more than 2 repetitive characters, for example abcd1111.

function isRepeatThree(chunk) {
  let len = chunk.length;
  let repeat = 1;

  for (var i = 1; i < len; i++) {
    if (chunk[i] === chunk[i - 1]) {
      repeat += 1;
      if (repeat === 3) {
        return true;
      }
    } else {
      repeat = 1;
    }
  }

  return false;
}

function genNumOfTypes() {
  let remain = length;
  let lenOfTypes = [0, 0, 0, 0];
  let numOfRemainingTypes = numOfTypes;

  for (var i = 0; i < types.length; i++) {
    if (includeTypes[i]) {
      let lenOfType;

      if (numOfRemainingTypes > 1) {
        lenOfType =
          Math.floor(Math.random() * (remain - numOfRemainingTypes)) + 1;
        remain -= lenOfType;
        numOfRemainingTypes -= 1;
      } else {
        lenOfType = remain;
      }

      lenOfTypes[i] = lenOfType;
    }
  }

  return lenOfTypes;
}

function generatePassword() {
  let isOutOfRange = true;

  let password = "";
  length = 0;
  numOfTypes = 0;

  while (isOutOfRange) {
    length = prompt("What is the length of the password? (8-128)", 8);
    if (length >= 8 && length <= 128) {
      isOutOfRange = false;
    } else {
      alert("Out of range or your input is not a number. Please enter again.");
    }
  }

  let noneIsSelected = true;

  while (noneIsSelected) {
    for (var i = 0; i < types.length; i++) {
      response = satisfyCriteria(types[i]);
      includeTypes[i] = response;
      if (response) {
        numOfTypes += 1;
      }
    }

    if (numOfTypes > 0) {
      noneIsSelected = false;
    } else {
      alert("You have to choose at least one type of character!");
    }
  }

  let lenOfTypes = genNumOfTypes();

  if (needCheckRepeat()) {
    let RepeatThree = true;

    while (RepeatThree) {
      for (var i = 0; i < types.length; i++) {
        password += randomChunk(listOfAvaChar[i], lenOfTypes[i]);
      }

      password = shuffle(password);
      RepeatThree = isRepeatThree(password);
    }
  } else {
    for (var i = 0; i < types.length; i++) {
      password += randomChunk(listOfAvaChar[i], lenOfTypes[i]);
    }

    password = shuffle(password);
  }

  return password;
}

function regenerate() {
  let password = "";
  let lenOfTypes = genNumOfTypes();

  for (var i = 0; i < types.length; i++) {
    password += randomChunk(listOfAvaChar[i], lenOfTypes[i]);
  }

  var passwordText = document.querySelector("#password");

  passwordText.value = shuffle(password);
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
  regenerateBtn.disabled = false;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
regenerateBtn.addEventListener("click", regenerate);
