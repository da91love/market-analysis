export const getColor = (color, opacity = 1) => {
  return color ? `rgba(${color.r},${color.g},${color.b},${opacity})` : undefined;
};

export const rgbaToRgb = (rgba) => {
  const inParts = rgba.substring(rgba.indexOf("(")).split(","),
    r = parseInt(trim(inParts[0].substring(1)), 10),
    g = parseInt(trim(inParts[1]), 10),
    b = parseInt(trim(inParts[2]), 10),
    a = parseFloat(trim(inParts[3]));

  const alpha = 1 - a;
  const red = Math.round((a * (r / 255) + alpha) * 255);
  const green = Math.round((a * (g / 255) + alpha) * 255);
  const blue = Math.round((a * (b / 255) + alpha) * 255);

  return `rgb(${red}, ${green}, ${blue})`
}

function trim (str) {
  return str.replace(/^\s+|\s+$/gm,'');
}

