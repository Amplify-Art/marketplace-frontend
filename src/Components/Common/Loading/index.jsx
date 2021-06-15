import LoadingOverlay from 'react-loading-overlay';
import { connect } from 'react-redux';
import './loader.scss';

const LO = ({ children, active, text }) => {
    console.log(children)
    return (
        <LoadingOverlay
            active={active}
            spinner
            className="loader"
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
