import React, { useEffect } from "react";

function MidiInput() {
  useEffect(() => {
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
    } else {
      console.log("WebMIDI is not supported in this browser.");
    }

    function onMIDISuccess(midiAccess) {
      const inputs = midiAccess.inputs.values();
      for (
        let input = inputs.next();
        input && !input.done;
        input = inputs.next()
      ) {
        input.value.onmidimessage = onMIDIMessage;
      }
    }

    function onMIDIFailure() {
      console.log("Could not access your MIDI devices.");
    }

    function onMIDIMessage(message) {
      const [status, noteNumber, velocity] = message.data;

      if (status === 0x90 && velocity > 0) {
        const noteName = getNoteName(noteNumber);
        console.log(`Note played: ${noteName}, Velocity: ${velocity}`);
      }
    }

    function getNoteName(noteNumber) {
      const noteNames = [
        "C",
        "C#",
        "D",
        "D#",
        "E",
        "F",
        "F#",
        "G",
        "G#",
        "A",
        "A#",
        "B",
      ];
      return noteNames[noteNumber % 12] + Math.floor(noteNumber / 12);
    }
  }, []);

  return (
    <div>
      <p>Waiting for MIDI input...</p>
    </div>
  );
}

export default MidiInput;
