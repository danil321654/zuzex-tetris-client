import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ShapePreview from "./ShapePreview";
import { themes } from "../../utils/themes";
import { changeTheme } from "../../reducers";

const ThemeSelect = () => {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  return (
    <div className="Controls-themeSelect">
      {themes
        .filter((_theme) => _theme !== theme)
        .slice(0, 3)
        .map((_theme, ind) => (
          <ShapePreview
            key={_theme}
            text={_theme}
            onClick={() => dispatch(changeTheme(_theme))}
          />
        ))}
    </div>
  );
};
export default ThemeSelect;
