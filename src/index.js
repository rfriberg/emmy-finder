import Tone from 'tone'

let isPlaying = false;
let speed = '2n';

var slider = document.getElementById('controller');
var button = document.getElementById('toggle');

const setup = () => {
  //create a synth and connect it to the master output (your speakers)
  var synth = new Tone.Synth().toMaster();

  Tone.Transport.bpm.value = 80;
  Tone.Transport.scheduleRepeat(time => {
    synth.triggerAttackRelease("C4", '8n', time);
  }, '2n');

  //play a middle 'C' for the duration of an 8th note
  // synth.triggerAttackRelease("C4", "8n");
  Tone.context.resume();
}

const start = () => {
  if (isPlaying) return

  Tone.Transport.start();
  isPlaying = true;
  button.classList.add('active')
}

const stop = () => {
  Tone.Transport.stop();
  isPlaying = false;
  button.classList.remove('active')
}

const toggle = () => {
  if (isPlaying) {
    stop();
  } else {
    start();
  }
}
const speedUp = () => {
  Tone.Transport.bpm.value = 200;
}

// LISTENERS
button.addEventListener('click', toggle);

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  Tone.Transport.bpm.value = this.value;
}

// SETUP
setup();

