export const addCommasToNumber = (number) => {
  if (number === null || number === undefined) {
    return null;
  }

  const numberString = number.toString();

  // Split the string into integer and decimal parts (if any)
  const [integerPart, decimalPart] = numberString.split(".");

  // Add commas to the integer part
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );

  // If there is a decimal part, concatenate it back with the formatted integer part
  if (decimalPart) {
    return `${formattedIntegerPart}.${decimalPart}`;
  } else {
    return formattedIntegerPart;
  }
};
