import React, { useRef, useEffect } from "react";
import { getRandomInt } from "../../utils/getRandomInt";
import cls from "classnames";
import { useSelector } from "react-redux";
import { colors } from "../../utils/colors";
const Background = () => {
  const { theme, moveInterval } = useSelector((state) => state);

  const backGroundClass = cls({
    "PlayGround-container Background theme": true,
  });

  const canvasRef = useRef(null);

  useEffect(() => {
    let lastColor = getRandomInt(9);
    const blocks = Array.from({ length: 100 }, () =>
      Array.from({ length: 100 }, () => {
        const rand = Math.random();
        if (rand > 0.85) lastColor = getRandomInt(9);
        return lastColor;
      })
    );
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const drawBackground = () => {
      requestAnimationFrame(drawBackground);

      const size = 30;
      const gap = 5;

      canvas.width = 2 * window.innerWidth;
      canvas.height = window.innerHeight;
      blocks.forEach((row, j) =>
        row.forEach((block, i) => {
          context.fillStyle = colors[block];

          if (
            blocks[j + 1] !== undefined &&
            blocks[j + 1][i] === block &&
            blocks[j][i + 1] !== undefined &&
            blocks[j][i + 1] === block &&
            blocks[j + 1][i + 1] === block
          )
            context.fillRect(
              i * (size + gap),
              j * (size + gap),
              size + gap,
              size + gap
            );
          if (blocks[j + 1] !== undefined && blocks[j + 1][i] === block)
            context.fillRect(
              i * (size + gap),
              j * (size + gap),
              size,
              size + gap
            );

          if (blocks[j][i + 1] !== undefined && blocks[j][i + 1] === block)
            context.fillRect(
              i * (size + gap),
              j * (size + gap),
              size + gap,
              size
            );
          context.fillRect(i * (size + gap), j * (size + gap), size, size);
        })
      );
    };
    drawBackground();

    window.addEventListener("resize", drawBackground);
    return window.removeEventListener("resize", drawBackground);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.innerWidth, window.innerHeight]);

  return (
    <div
      className={backGroundClass}
      style={{
        filter: theme,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          animationDuration: `${(moveInterval / 1000) * 50}s`,
          animationName: "slideout",
          animationIterationCount: "infinite",
          animationDirection: "alternate",
          animationTimingFunction: "linear",
        }}
      />
    </div>
  );
};

export default Background;
