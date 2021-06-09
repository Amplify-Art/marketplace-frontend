import MenuIcon from '../../../assets/images/menu-icon.svg';
import Logo from '../../../assets/images/logo.svg';
import SearchIcon from '../../../assets/images/search-icon.svg';
import BellIcon from '../../../assets/images/bell-icon.svg';
import Wallet from '../../../assets/images/wallet-icon.svg';
import Harrison from '../../../assets/images/harrison.jpeg';
import './Header.scss';

function Header() {
  return (
    <>
      <header>
        {/* <div className="menu">
          <img src={MenuIcon} alt="Menu Icon" />
        </div> */}
        <div className="logo">
          <img src={Logo} alt="Amplify.Art" />
        </div>
        <div className="search">
          <img src={SearchIcon} alt="Search" />
          <input type="text" placeholder="Search for songs, artists..." />
        </div>

        <div className="right">
          <div className="bell"><img src={BellIcon} alt="Bell" /></div>
          <div className="wallet"><img src={Wallet} alt="wallet" /></div>
          <div className="user">
            <img src={Harrison} />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
