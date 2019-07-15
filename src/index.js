import { Synth, Transport, context } from 'tone'

let isPlaying = false;
let defaultBpm = 80;

var slider = document.getElementById('controller');
var button = document.getElementById('toggle');

const setup = () => {
  resetSlider();

  //create a synth and connect it to the master output (your speakers)
  var synth = new Synth().toMaster();

  Transport.bpm.value = defaultBpm;
  Transport.scheduleRepeat(time => {
    synth.triggerAttackRelease('C4', '32n', time);
  }, '1n');

  //play a middle 'C' for the duration of an 8th note
  // synth.triggerAttackRelease("C4", "8n");
  context.resume();
}
const resetSlider = () => {
  slider.value = defaultBpm;
  Transport.bpm.value = defaultBpm;
}

const start = () => {
  if (isPlaying) return;

  Transport.start();
  isPlaying = true;
  button.classList.add('active');
}

const stop = () => {
  Transport.stop();
  isPlaying = false;
  button.classList.remove('active');
}

const toggle = () => {
  if (isPlaying) {
    stop();
  } else {
    start();
  }
}

// LISTENERS
button.addEventListener('click', toggle);

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  Transport.bpm.value = this.value;
}

// SETUP
setup();

