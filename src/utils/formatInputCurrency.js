export default function formatPriceInput(value) {
  if (!value) return "";

  const number = value.replace(/\D/g, "");

  return new Intl.NumberFormat("en-NG").format(number);
}
