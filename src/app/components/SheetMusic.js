"use client";

import React, { useEffect } from "react";
import ABCJS from "abcjs";

function SheetMusic({ abcNotation }) {
  useEffect(() => {
    const visualObj = ABCJS.renderAbc("notation-output", abcNotation);

    ABCJS.synth.createSynth().then(function (synth) {
      synth
        .init()
        .then(function () {
          synth.prime(() => {
            synth.start();
            ABCJS.synth.startPlaying(visualObj[0]);
          });
        })
        .catch(function (error) {
          console.warn("Audio problem:", error);
        });
    });
  }, [abcNotation]);

  return <div id="notation-output"></div>;
}

export default SheetMusic;
