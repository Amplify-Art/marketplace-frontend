import jwt from "jsonwebtoken";

const MoonPay = ({ amontToConvert, type, signature }) => {
  let user = jwt.decode(localStorage.getItem("amplify_app_token"));
  let url =
    type === "buy"
      ? "https://buy-staging.moonpay.com"
      : "https://sell-staging.moonpay.com";
  if (!signature) {
    return <></>;
  }
  return (
    <iframe
      title="Moon Pay"
      src={`${url}?apiKey=pk_test_Atula0B14cvDEjG2VohLCsa2bmhInRk&currencyCode=near&email=${encodeURIComponent(
        user.email
      )}&walletAddress=${
        user.near_account_id
      }&baseCurrencyAmount=${amontToConvert}&colorCode=%23000&baseCurrencyCode=usd&signature=${encodeURIComponent(
        signature
      )}`}
    />
  );
};
export default MoonPay;
