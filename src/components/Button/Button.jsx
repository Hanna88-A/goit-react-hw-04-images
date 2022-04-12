import s from './Button.module.css'

const Button = ({handleButtonClick}) => {
    return (
        <button type="button" onClick={handleButtonClick} className={s.loadMore}>Load more</button>
    )   
}
export default Button;
