import numeral from "numeral";

export const formatNumber = (num) => {
  if (num >= 1e9) {
    return numeral(num).format("0.0a").toUpperCase(); // 'B' for billions
  } else if (num >= 1e6) {
    return numeral(num).format("0.0a").toUpperCase(); // 'M' for millions
  } else if (num >= 1e3) {
    return numeral(num).format("0.0a").toUpperCase(); // 'K' for thousands
  } else {
    return numeral(num).format("0").toUpperCase(); // No suffix for smaller numbers
  }
};
