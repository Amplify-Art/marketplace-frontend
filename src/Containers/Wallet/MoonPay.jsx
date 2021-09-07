import jwt from 'jsonwebtoken';

const MoonPay = ({ amontToConvert, type }) => {
    console.log(amontToConvert, 'amontToConvert')
    let user = jwt.decode(localStorage.getItem('amplify_app_token'))
    let url = type === 'buy' ? 'https://buy-staging.moonpay.com' : 'https://sell-staging.moonpay.com'
    return <iframe src={`${url}?apiKey=pk_test_Atula0B14cvDEjG2VohLCsa2bmhInRk&currencyCode=eth&email=${encodeURIComponent(user.email)}&walletAddress=${user.near_account_id}&baseCurrencyAmount=${amontToConvert}&colorCode=%23000`} />
}
export default MoonPay;