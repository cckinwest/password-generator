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
        //'repeat' count the number of repeated characters
        return true;
      }
    } else {
      repeat = 1;
      //once there is a chunk of repeated two characters, and the thrid is another, then the 'repeat' will reinitialize.
    }
  }

  return false;
}

function genNumOfTypes() {
  let remain = length; //'remain' count the number of remaining digits of the pwd to be allocated.
  let lenOfTypes = [0, 0, 0, 0];
  let numOfRemainingTypes = numOfTypes;

  for (var i = 0; i < types.length; i++) {
    if (includeTypes[i]) {
      let lenOfType;

      if (numOfRemainingTypes > 1) {
        lenOfType =
          Math.floor(Math.random() * (remain - numOfRemainingTypes)) + 1;
        // create a random number of characters for each type of characters selected
        // '+1' to ensure that the number of characters is at least one.
        remain -= lenOfType;
        numOfRemainingTypes -= 1;
      } else {
        lenOfType = remain; //if it's the last type selected
      }

      lenOfTypes[i] = lenOfType;
    }
  }

  return lenOfTypes;
}

function generatePassword() {
  let password = "";
  length = 0;
  numOfTypes = 0;

  let isOutOfRange = true;

  while (isOutOfRange) {
    length = prompt("What is the length of the password you want to generate?");

    if (length >= 8 && length <= 128) {
      isOutOfRange = false;
    } else {
      alert("Out of range! Please enter again.");
    } //validate the length to be within the range 8-128
  }

  let noneIsSelected = true;

  while (noneIsSelected) {
    for (var i = 0; i < types.length; i++) {
      response = satisfyCriteria(types[i]);
      includeTypes[i] = response;
      if (response) {
        numOfTypes += 1; //count the number of types selected
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
      } //generate a random chunk for each type of selected character, then concat

      password = shuffle(password);
      //otherwise characters of the same type will be put together which is not good for security
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
} //if the user does not like the password generated, use it to regenerate using the same criteria.

// Write password to the #password input
function writePassword() {
  const timeout = setTimeout(() => {
    var password = generatePassword();
    var passwordText = document.querySelector("#password");

    passwordText.value = password;
    regenerateBtn.disabled = false;
  }, 500); //it delays the main part of the code by 0.5s, so that the regenerate button is disabled first.

  regenerateBtn.disabled = true;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
regenerateBtn.addEventListener("click", regenerate);
