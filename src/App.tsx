import "./App.css";
import { useState } from "react";

const Colors = {
  Black: "black",
  Red: "red",
  Orange: "orange",
  Yellow: "yellow",
  Green: "green",
  Blue: "blue",
  Indigo: "indigo",
  Purple: "purple",
} as const;

type Color = typeof Colors[keyof typeof Colors];

const FontSizes = { Xs: "XS", S: "S", M: "M", L: "L", Xl: "XL" } as const;

type FontSize = typeof FontSizes[keyof typeof FontSizes];

const App = () => {
  const [color, setColor] = useState<Color>(Colors.Black);
  const [fontSize, setFontSize] = useState<FontSize>(FontSizes.M);
  const [isEnabledStreaming, setIsEnabledStreaming] = useState<boolean>(true);

  const isColor = (value: string): value is Color => {
    return value in Object.values(Colors);
  };

  const handleChangeColor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    if (!isColor(selected)) return;

    setColor(selected);
  };

  const isFontSize = (value: string): value is FontSize => {
    return value in Object.values(FontSizes);
  };

  const handleChangeFontSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    if (!isFontSize(selected)) return;

    setFontSize(selected);
  };

  const handleChangeIsEnabledStreaming = () => {
    setIsEnabledStreaming(!isEnabledStreaming);
  };

  return (
    <div className="container">
      <header>Google Meet Comment Flow</header>
      <main>
        <div className="form-group">
          <label htmlFor="comment-color">Color</label>
          <select
            name="comment-color"
            id="comment-color"
            defaultValue={color}
            onChange={handleChangeColor}
          >
            {Object.values(Colors).map((color) => (
              <option value={color}>{color}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="comment-font-size">Font Size</label>
          <select
            name="comment-font-size"
            id="comment-font-size"
            defaultValue={fontSize}
            onChange={handleChangeFontSize}
          >
            {Object.values(FontSizes).map((fontSize) => (
              <option value={fontSize}>{fontSize}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="comment-enable-streaming">Enable Streaming</label>
          <div id="comment-enable-streaming" className="toggle-btn">
            <input
              id="toggle"
              className="toggle-input"
              type="checkbox"
              checked={isEnabledStreaming}
              onChange={handleChangeIsEnabledStreaming}
            />
            <label htmlFor="toggle" className="toggle-label" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
