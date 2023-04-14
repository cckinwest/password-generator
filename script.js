// Assignment Code
var generateBtn = document.querySelector("#generate");

function shuffle(text) {
  let remainText = text;
  let newText = ""
  let textLen = text.length;

  for (var i = 0; i < textLen; i++){
    let index = Math.floor(Math.random()*remainText.length);
    newText += remainText[index];
    remainText = remainText.slice(0, index) + remainText.slice(index + 1, textLen);
  }

  return newText;
}

function randomChunk(str, len) {
  genChunk = ""

  for (var i = 0; i < len; i++) {
    let index = Math.floor(Math.random()*str.length);
    genChunk += str[index];
  }

  return genChunk;
}

function satisfyCriteria(typeOfChar) {
  let isInvalid = true;
  while (isInvalid) {
    let response = prompt(`Does the password include ${typeOfChar}? (y/n)`)
    if (response === "y") {
      isInvalid = false;
      return true;
    } else if (response === "n") {
      isInvalid = false;
      return false;
    } else {
      alert("Your responses can only be 'y' or 'n'.")
    }
  }
}

function needCheckRepeat() {
  let isInvalid = true;
  while (isInvalid) {
    let response = prompt(`Do you require the password to have no three consecutive characters the same? (y/n)`)
    if (response === "y") {
      isInvalid = false;
      return true;
    } else if (response === "n") {
      isInvalid = false;
      return false;
    } else {
      alert("Your responses can only be 'y' or 'n'.")
    }
  }
}

function isRepeatThree(chunk) {
  let len = chunk.length;
  let repeat = 1;

  for (var i = 1; i < len; i++) {
    if (chunk[i] === chunk[i-1]) {
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

function generatePassword() {
  let isOutOfRange = true;
  let length = 8;

  while (isOutOfRange) {
    length = prompt("What is the length of the password? (8-128)");
    if ((length >= 8) && (length <= 128)) {
      isOutOfRange = false;
    } else {
      alert("Out of range! Please enter again.")
    }  
  }
  
  let remain = length;
  let numOfTypes = 0;
  let password = "";
  let noneIsSelected = true;

  const lowerCaseCharacters = "abcdefghijklmnopqrstuvwxyz";
  const upperCaseCharacters = "ABCDEFGJHIJKLMNOPQRSTUVWXYZ";
  const numerics = "0123456789";
  const specialCharacters = "!()-.?[]_`~;:!#$%^&*+=";

  const types = ["lowercase", "uppercase", "numeric", "special"];
  const listOfAvaChar = [lowerCaseCharacters, upperCaseCharacters, numerics, specialCharacters];
  let includeTypes

  while (noneIsSelected) {
    includeTypes = [];

    for (var i = 0; i < types.length; i++) {
      response = satisfyCriteria(types[i]);
      includeTypes.push(response);
      if(response) {
        numOfTypes += 1;
      }
    }

    if (numOfTypes > 0) {
      noneIsSelected = false;
    } else {
      alert("You have to choose at least one type of character!")
    }
  }

  let lenOfTypes = [];

  for (var i = 0; i < types.length; i++) {
    if (includeTypes[i]) {
      let lenOfType;

      if (numOfTypes > 1) {
        lenOfType = Math.floor(Math.random()*(remain - numOfTypes)) + 1;
        remain -= lenOfType;
        numOfTypes -= 1;        
      } else {
        lenOfType = remain;
      }

      lenOfTypes.push(lenOfType);

    } else {
      lenOfTypes.push(0);
    }
  }

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

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
