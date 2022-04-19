import s from './Button.module.css';
import PropTypes from "prop-types"; 

const Button = ({handleButtonClick}) => {
    return (
        <button type="button" onClick={handleButtonClick} className={s.loadMore}>Load more</button>
    )   
}
export default Button;

Button.propTypes = {
    handleButtonClick: PropTypes.func
   
};
