"use client";

import React, { useEffect } from "react";
import ABCJS from "abcjs";

function SheetMusic({ notes }) {
  function getABCNoteDuration(midiDuration) {
    const durations = {
      1: "",
      0.5: "2",
      0.25: "4",
      0.125: "8",
      // Add more if needed
    };
    return durations[midiDuration] || "";
  }

  function generateABCFromMIDI(notes) {
    let abcString = "";
    let measureDuration = 0;

    const groupedNotes = {};
    notes.forEach((note) => {
      const time = note.time.toFixed(2);
      if (!groupedNotes[time]) {
        groupedNotes[time] = [];
      }
      groupedNotes[time].push(
        midiToAbcOctave(note.name, note.octave) +
          getABCNoteDuration(note.duration)
      );
    });

    for (const time in groupedNotes) {
      const chordNotes = groupedNotes[time];
      if (chordNotes.length > 1) {
        abcString += `[${chordNotes.join("")}]`;
      } else {
        abcString += `${chordNotes[0]}`;
      }

      measureDuration += parseFloat(time);
      if (measureDuration >= 1) {
        abcString += "|";
        measureDuration = 0;
      } else {
        abcString += " ";
      }
    }

    return abcString;
  }

  useEffect(() => {
    if (!notes.length) return;

    const abcNotation = generateABCFromMIDI(notes);
    const abcString = `X:1\nT:Your Song Title\nM:4/4\nL:1/8\nK:C\n${abcNotation}`;

    console.log(abcString);

    const container = document.getElementById("notation-output");
    if (container) container.innerHTML = "";

    ABCJS.renderAbc("notation-output", abcString);
  }, [notes]);

  function midiToAbcOctave(noteName, midiOctave) {
    let abcNote = noteName.replace("#", "^");

    if (midiOctave <= 3) {
      return (
        abcNote[0].toUpperCase() + ",".repeat(4 - midiOctave) + abcNote.slice(1)
      );
    } else if (midiOctave === 4) {
      return abcNote.toUpperCase();
    } else {
      return (
        abcNote[0].toUpperCase() + "'".repeat(midiOctave - 4) + abcNote.slice(1)
      );
    }
  }

  return <div id="notation-output"></div>;
}

export default SheetMusic;
