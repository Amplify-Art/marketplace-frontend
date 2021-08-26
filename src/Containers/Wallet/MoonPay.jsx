import jwt from 'jsonwebtoken';

const MoonPay = () => {
    let user = jwt.decode(localStorage.getItem('amplify_app_token'))
    return <iframe src={`https://buy-staging.moonpay.com?apiKey=pk_test_Atula0B14cvDEjG2VohLCsa2bmhInRk&currencyCode=eth&email=${encodeURIComponent(user.email)}&walletAddress=${user.near_account_id}`} />
}
export default MoonPay;