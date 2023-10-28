"use client";

import React, { useRef } from "react";
import { Midi } from "@tonejs/midi";

function MidiFileReader() {
  const fileInputRef = useRef(null);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const midi = new Midi(arrayBuffer);

      midi.tracks.forEach((track) => {
        track.notes.forEach((note) => {
          console.log(
            `Note: ${note.name}${note.octave}, Duration: ${note.duration} seconds, Time: ${note.time} seconds`
          );
        });
      });
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
    </div>
  );
}

export default MidiFileReader;
