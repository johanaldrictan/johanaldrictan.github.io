const LEVEL = .1; //volume of the individual notes
var firstTimeTyped = true;
var outputText = document.getElementById("name");

var audio = new AudioContext();
document.addEventListener('keydown', logKey);

function logKey(e){
  if (event.key.length === 1)
  {
    if(firstTimeTyped) { document.getElementById("name").innerHTML = ""; firstTimeTyped = false; }
    document.getElementById("name").innerHTML += event.key;
  }
  else if(event.key === "Backspace" && !firstTimeTyped){
    text = document.getElementById("name").innerHTML;
    document.getElementById("name").innerHTML = text.slice(0, -1);
    if(document.getElementById("name").innerHTML == ""){
      document.getElementById("name").innerHTML = "Your name will show up here. Just start typing!";
      firstTimeTyped = true;
    }
  }
  else if(event.keyCode == 16){ //shift key can shift the third of the chord to create a suspended chord
    console.log("Shift pressed");
  }
}
