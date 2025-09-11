const getCountrFlag = (countryCode) =>
  `https://flagcdn.com/w40/${countryCode}.png`;

export const CountryFlag = ({ countryCode, styles, src }) => {
  const flag = getCountrFlag(countryCode);
  return (
    <img src={countryCode ? flag : src} alt="flag" className={`${styles}`} />
  );
};
