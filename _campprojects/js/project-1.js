var firstTimeTyped = true;
var hasPressedSpace = false;
var outputText = document.getElementById("name");

var synth = new simpleSynth();

var active_chord_gain = {};
var active_chord_notes = [];
var active_arp_notes = [];

var c = new chord();

function add_letter(letterCode){
  //if(firstTimeTyped){
    c.setupRoot(letterCode);
    add_chordnote(synth.noteFreq[3][c.root])
}
function remove_letter(){
  //remove_chordnote
}

function add_chordnote(freq){
  synth.play_short(freq);
}
function remove_chordnote(freq){
  active_chord_notes.pop();
  if(!active_chord_notes.includes(freq)){
    active_chord_gain[freq].gain.exponentialRampToValueAtTime(CHORD_LEVEL, audioCtx.current +2);
    active_chord_gain.pop();
  }
}

document.addEventListener('keydown', onKeyPress);

function onKeyPress(e){
  if (event.key.length === 1)
  {
    var keyTyped = event.key.toLowerCase();
    if(event.keyCode === 32){
      document.getElementById("name").innerHTML += keyTyped;
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
