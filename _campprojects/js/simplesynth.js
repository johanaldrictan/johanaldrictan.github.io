const CHORD_LEVEL = .1; //volume of the individual notes
const ARP_LEVEL = .005;

const CHORD_LEVEL_START = .00001;
const ARP_LEVEL_START = .00001;

function simpleSynth(){
  this.createNoteTable = function() {
    let noteFreq = [];
    for (let i=0; i< 9; i++) {
      noteFreq[i] = [];
    }

    noteFreq[0][9] = 27.50000;
    noteFreq[0][10] = 29.13523;
    noteFreq[0][11] = 30.86770;

    noteFreq[1][0] = 32.70319;
    noteFreq[1][1] = 34.64782;
    noteFreq[1][2] = 36.70809;
    noteFreq[1][3] = 38.89087;
    noteFreq[1][4] = 41.20344;
    noteFreq[1][5] = 43.65352;
    noteFreq[1][6] = 46.24930;
    noteFreq[1][7] = 48.99942;
    noteFreq[1][8] = 51.91308;
    noteFreq[1][9] = 55.00000;
    noteFreq[1][10] = 58.27047;
    noteFreq[1][11] = 61.73541;

    noteFreq[2][0] = 65.40639; //C
    noteFreq[2][1] = 69.29566; //C#
    noteFreq[2][2] = 73.41619; //D
    noteFreq[2][3] = 77.78175; //D#
    noteFreq[2][4] = 82.40689; //E
    noteFreq[2][5] = 87.30706; //F
    noteFreq[2][6] = 92.49861; //F#
    noteFreq[2][7] = 97.99886; //G
    noteFreq[2][8] = 103.8262; //G#
    noteFreq[2][9] = 110.0000; //A
    noteFreq[2][10] = 116.5409; //A#
    noteFreq[2][11] = 123.4708; //B

    noteFreq[3][0] = 130.8128;
    noteFreq[3][1] = 138.5913;
    noteFreq[3][2] = 146.8324;
    noteFreq[3][3] = 155.5635;
    noteFreq[3][4] = 164.8138;
    noteFreq[3][5] = 174.6141;
    noteFreq[3][6] = 184.9972;
    noteFreq[3][7] = 195.9977;
    noteFreq[3][8] = 207.6523;
    noteFreq[3][9] = 220.0000;
    noteFreq[3][10] = 233.0819;
    noteFreq[3][11] = 246.9417;

    noteFreq[4][0] = 261.6256;
    noteFreq[4][1] = 277.1826;
    noteFreq[4][2] = 293.6648;
    noteFreq[4][3] = 311.1270;
    noteFreq[4][4] = 329.6276;
    noteFreq[4][5] = 349.2282;
    noteFreq[4][6] = 369.9944;
    noteFreq[4][7] = 391.9954;
    noteFreq[4][8] = 415.3047;
    noteFreq[4][9] = 440.0000;
    noteFreq[4][10] = 466.1638;
    noteFreq[4][11] = 493.8833;

    noteFreq[5][0] = 523.2511;
    noteFreq[5][1] = 554.3653;
    noteFreq[5][2] = 587.3295;
    noteFreq[5][3] = 622.2540;
    noteFreq[5][4] = 659.2551;
    noteFreq[5][5] = 698.4565;
    noteFreq[5][6] = 739.9888;
    noteFreq[5][7] = 783.9909;
    noteFreq[5][8] = 830.6094;
    noteFreq[5][9] = 880.0000;
    noteFreq[5][10] = 932.3275;
    noteFreq[5][11] = 987.7666;

    noteFreq[6][0] = 1046.502;
    noteFreq[6][1] = 1108.731;
    noteFreq[6][2] = 1174.659;
    noteFreq[6][3] = 1244.508;
    noteFreq[6][4] = 1318.510;
    noteFreq[6][5] = 1396.913;
    noteFreq[6][6] = 1479.978;
    noteFreq[6][7] = 1567.982;
    noteFreq[6][8] = 1661.219;
    noteFreq[6][9] = 1760.000;
    noteFreq[6][10] = 1864.655;
    noteFreq[6][11] = 1975.533;

    return noteFreq;
  }

  this.noteFreq = this.createNoteTable();
  this.audioCtx = new AudioContext();

  this.play_long = function(freq){
    var osc = this.audioCtx.createOscillator();
    osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
    osc.type = "sine";

    var noteGain = this.audioCtx.createGain();
    osc.connect(noteGain);
    noteGain.connect(this.audioCtx.destination);
    noteGain.gain.setValueAtTime(CHORD_LEVEL_START, this.audioCtx.currentTime);

    osc.start();
    noteGain.gain.exponentialRampToValueAtTime(CHORD_LEVEL, this.audioCtx.currentTime + .125)
    return noteGain;
  }
  this.play_short = function(freq){
    var osc = this.audioCtx.createOscillator();
    osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
    osc.type = "triangle";

    var noteGain = this.audioCtx.createGain();
    osc.connect(noteGain);
    noteGain.connect(this.audioCtx.destination);
    var start_time = this.audioCtx.currentTime;
    osc.start(start_time);
    noteGain.gain.exponentialRampToValueAtTime(CHORD_LEVEL_START, start_time + 3);
  }
}

function chord(){
  this.root;
  this.isMajor;

  this.setupRoot = function(letterCode){
    var offsetFromA = letterCode - 65;
    if(offsetFromA < 12){
      this.root = offsetFromA;
      this.isMajor = true;
    }
    else{
      var offsetFromM = offsetFromA - 12;
      if(offsetFromM < 12){
        this.root = offsetFromM;
        this.isMajor = false;
      }
      else{
        var offsetFromY = offsetFromM - 12;
        this.root = offsetFromY;
        this.isMajor = true;
      }
    }
  }

}
