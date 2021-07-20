import React, { useRef, useEffect } from "react";
import { getRandomInt } from "../../utils/getRandomInt";
import cls from "classnames";
import { useSelector } from "react-redux";
import { colors } from "../../utils/colors";
const Background = () => {
  const { theme, username, lose } = useSelector((state) => state);

  const backGroundClass = cls({
    "PlayGround-container Background": true,
    [`${theme}`]: true,
  });

  const canvasRef = useRef(null);

  useEffect(() => {
    const drawBackground = () => {
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
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      blocks.forEach((row, j) =>
        row.forEach((block, i) => {
          context.fillStyle = colors[block];
          let rectWidth = 30;
          let rectHeight = 30;
          if (blocks[j + 1] !== undefined && blocks[j + 1][i] === block)
            rectHeight = 31;

          if (blocks[j][i + 1] !== undefined && blocks[j][i + 1] === block)
            rectWidth = 31;
          context.fillRect(i * 30 + i, j * 30 + j, rectWidth, rectHeight);
        })
      );
    };
    drawBackground();
    window.addEventListener("resize", drawBackground);
    return window.removeEventListener("resize", drawBackground);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.innerWidth, window.innerHeight, theme, username, lose]);

  return (
    <div className={backGroundClass}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Background;
