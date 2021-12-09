
const MoonPay = ({ urlWithSignature }) => {
  if (!urlWithSignature) {
    return <></>;
  }
  return (
    <iframe
      title="Moon Pay"
      src={urlWithSignature}
    />
  );
};
export default MoonPay;
