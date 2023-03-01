import { useEffect } from "react";
import { themeChange } from "theme-change";
const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
];
export default function BaysPage() {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <div className="container mx-auto">
      <label className="label">
        <span className="label-text">Pick a theme</span>
      </label>
      <select
        className="select select-primary  w-full max-w-xs my-4"
        data-choose-theme
      >
        {themes.map((theme, i) => (
          <option key={i} value={theme}>
            {theme}
          </option>
        ))}
      </select>
    </div>
  );
}
