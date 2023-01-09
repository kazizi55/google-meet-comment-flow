import "./App.css";
import { useEffect, useState } from "react";

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
  const [color, setColor] = useState<Color>(Colors.Green);

  const [fontSize, setFontSize] = useState<FontSize>(FontSizes.L);
  const [isEnabledStreaming, setIsEnabledStreaming] = useState<boolean>(false);

  const isColor = (value: string): value is Color => {
    return Object.values(Colors).some((color) => color === value);
  };

  const handleChangeColor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!isColor(value)) return;

    setColor(value);
    chrome.runtime.sendMessage({
      method: "setColor",
      value,
    });
  };

  const isFontSize = (value: string): value is FontSize => {
    return Object.values(FontSizes).some((fontSize) => fontSize === value);
  };

  const handleChangeFontSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (!isFontSize(value)) return;

    setFontSize(value);
    chrome.runtime.sendMessage({
      method: "setFontSize",
      value,
    });
  };

  const handleChangeIsEnabledStreaming = () => {
    const value = !isEnabledStreaming;

    setIsEnabledStreaming(value);
    chrome.runtime.sendMessage({
      method: "setIsEnabledStreaming",
      value,
    });
  };

  useEffect(() => {
    const setDataFromLocalStorage = async () => {
      try {
        const storedColorMessage = chrome.runtime.sendMessage({
          method: "getColor",
        });
        const storedFontSizeMessage = chrome.runtime.sendMessage({
          method: "getFontSize",
        });
        const storedIsEnabledStreamingMessage = chrome.runtime.sendMessage({
          method: "getIsEnabledStreaming",
        });

        const fetchedData = await Promise.all([
          storedColorMessage,
          storedFontSizeMessage,
          storedIsEnabledStreamingMessage,
        ]);

        const storedColor = fetchedData[0];
        const storedFontSize = fetchedData[1];
        const storedIsEnabledStreaming = fetchedData[2];

        if (storedColor && isColor(storedColor)) {
          setColor(storedColor);
        }

        if (storedFontSize && isFontSize(storedFontSize)) {
          setFontSize(storedFontSize);
        }

        if (typeof storedIsEnabledStreaming === "boolean") {
          setIsEnabledStreaming(storedIsEnabledStreaming);
        }
      } catch (e) {
        console.error(e);
      }
    };

    setDataFromLocalStorage();
  }, []);

  return (
    <div className="container">
      <header>Google Meet Comment Flow</header>
      <main>
        <div className="form-group">
          <label htmlFor="comment-color">Color</label>
          <select
            name="comment-color"
            id="comment-color"
            value={color}
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
            value={fontSize}
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
