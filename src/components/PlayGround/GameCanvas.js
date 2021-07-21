import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { colors } from "../../utils/colors";
const GameCanvas = () => {
  const { playGround, predictedShape, color } = useSelector((state) => state);

  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const size = playGround[0].length > 30 ? 900 / playGround[0].length : 25;
    const gap = 5;
    canvas.height = playGround.length * (size + gap);

    canvas.width = playGround[0].length * (size + gap);
    canvas.background = "#f1f0d4";
    playGround.forEach((row, j) =>
      row.forEach((block, i) => {
        if (block > 0) {
          context.fillStyle =
            block > 10 ? colors[block - 11] : colors[block - 1];
          //   (() => {
          //       const my_gradient = context.createLinearGradient(
          //         i * size + i * gap,
          //         0,
          //         i * size + i * gap + size,
          //         0
          //       );
          //       if (block > 0) {
          //         my_gradient.addColorStop(0, colors[block - 1]);
          //         my_gradient.addColorStop(0.5, colors[block - 1]);
          //         my_gradient.addColorStop(1, "white");
          //       }
          //       return my_gradient;
          //     })();
        } else if (predictedShape.some((el) => el.i === j && el.j === i)) {
          context.fillStyle = colors[color - 1];
          context.fillStyle += "5F";
        } else context.fillStyle = "lightgray";

        if (block > 0 && block < 10) {
          if (
            playGround[j + 1] !== undefined &&
            playGround[j + 1][i] === block &&
            playGround[j][i + 1] !== undefined &&
            playGround[j][i + 1] === block &&
            playGround[j + 1][i + 1] === block
          )
            context.fillRect(
              i * (size + gap),
              j * (size + gap),
              size + gap,
              size + gap
            );
          if (playGround[j + 1] !== undefined && playGround[j + 1][i] === block)
            context.fillRect(
              i * (size + gap),
              j * (size + gap),
              size,
              size + gap
            );

          if (
            playGround[j][i + 1] !== undefined &&
            playGround[j][i + 1] === block
          )
            context.fillRect(
              i * (size + gap),
              j * (size + gap),
              size + gap,
              size
            );
          context.fillRect(i * (size + gap), j * (size + gap), size, size);
        }
        //context.fillRect(i * size + i * gap, j * size + j * gap, size, size);
        context.fillRect(i * size + i * gap, j * size + j * gap, size, size);
      })
    );
  });

  return <canvas ref={canvasRef} />;
};

export default GameCanvas;
