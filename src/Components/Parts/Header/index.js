import MenuIcon from '../../../assets/images/menu-icon.svg';
import Logo from '../../../assets/images/logo.svg';
import SearchIcon from '../../../assets/images/search-icon.svg';
import BellIcon from '../../../assets/images/bell-icon.svg';
import Wallet from '../../../assets/images/wallet-icon.svg';
import Harrison from '../../../assets/images/harrison.jpeg';
import './Header.scss';

function Header( props ) {
  const { path } = props;

  const setBreadCrumbs = () => {
    let currentPage = '';

    switch (true) {
      case path === '/albums':
        currentPage = 'Albums';
        break
      case path === '/my-profile':
        currentPage = 'My Profile';
        break
      case path.includes('/artist/'):
        // Need to pull this from the database response... leaving it hard-coded for now... TODO!!
        currentPage = 'Eminem'
        break
    }

    return currentPage;
  }

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

      <div className="breadcrumbs left-nav-pad">
        Home / <span className="current">{path && setBreadCrumbs()}</span>
      </div>
    </>
  );
}

export default Header;
