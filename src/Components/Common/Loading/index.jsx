import LoadingOverlay from 'react-loading-overlay';
import { connect } from 'react-redux';
import './loader.scss';

const LO = ({ children, active, text }) => {
  return (
    <LoadingOverlay
      active={active}
      spinner
      className={`loader ${active ? 'active' : ''}`}
      text={text}
    >
      {children}
    </LoadingOverlay>
  )
}
export default connect(state => {
  return {
    active: state.global.loading_overlay
  }
})(LO);
