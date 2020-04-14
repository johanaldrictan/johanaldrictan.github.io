var firstTimeTyped = true;
var hasPressedSpace = false;
var outputText = document.getElementById("name");

var synth = new simpleSynth();
var c = new chord();

function add_letter(letterCode){
  if(!hasPressedSpace){
    if(firstTimeTyped){
      c.setupRoot(letterCode);
      var values = c.getNextNote();
      synth.add_chordnote(synth.noteFreq[values[1]+c.octave][values[0]]);
    }
    else{
      var values = c.getNextNote();
      synth.add_chordnote(synth.noteFreq[values[1]+c.octave][values[0]]);
    }
  }
  else{
    var values = c.pickRandomFromScale();
    synth.add_arpnote(synth.noteFreq[5][values[0]])
  }
}
function remove_letter(){
  if(!hasPressedSpace){
    c.removeLastNote();
    synth.remove_chordnote();
  }
  else{
    synth.remove_arpnote();
  }
}

document.addEventListener('keydown', onKeyPress);

function onKeyPress(e){
  if (event.key.length === 1)
  {
    var keyTyped = event.key.toLowerCase();
    if(event.keyCode === 32){
      document.getElementById("name").innerHTML += keyTyped;
      hasPressedSpace = true;
      return;
    }
    if (event.keyCode >= 65 && event.keyCode <= 90){
      add_letter(event.keyCode);
      if(firstTimeTyped) {
        document.getElementById("name").innerHTML = "";
        firstTimeTyped = false;
      }
      document.getElementById("name").innerHTML += keyTyped;
    }
  }
  else if(event.key === "Backspace" && !firstTimeTyped){
    text = document.getElementById("name").innerHTML;
    if(text.charAt(text.length - 1) === " "){
      hasPressedSpace = false;
    }
    remove_letter();
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
