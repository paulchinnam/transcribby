"use client";
import React, { useRef, useState } from "react";
import { Midi } from "@tonejs/midi";
import SheetMusic from "./SheetMusic";

function MidiFileReader() {
  const fileInputRef = useRef(null);
  const [midiNotes, setMidiNotes] = useState([]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const midi = new Midi(arrayBuffer);
      const parsedNotes = [];

      midi.tracks.forEach((track) => {
        track.notes.forEach((note) => {
          // Adjusting note name for ABC notation octave
          let noteName = note.name.toLowerCase();
          if (note.octave < 4) {
            for (let i = 0; i < 4 - note.octave; i++) {
              noteName += ",";
            }
          } else if (note.octave > 4) {
            for (let i = 0; i < note.octave - 4; i++) {
              noteName += "'";
            }
          }

          parsedNotes.push({
            name: noteName,
            duration: note.duration, // Directly pass the duration for further conversion in SheetMusic component
            time: note.time,
          });
        });
      });

      setMidiNotes(parsedNotes);
    }
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".midi, .mid"
      />
      <SheetMusic notes={midiNotes} />
    </div>
  );
}

export default MidiFileReader;
