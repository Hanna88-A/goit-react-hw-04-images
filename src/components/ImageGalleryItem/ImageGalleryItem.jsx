import s from './ImageGalleryItem.module.css';
import PropTypes from "prop-types"; 

const ImageGaleryItem = ({ image:{webformatURL, tags, largeImageURL}, togleModal, handleImageClick}) => {

    return (
        <li  className={s.galleryItem}>
            <img
                className={s.imageGalleryItem}
                onClick={() => {
                    togleModal()
                    handleImageClick(largeImageURL, tags)
                }}
                
                src={webformatURL}
                alt={tags} />
        </li>
    )

}
export default ImageGaleryItem;

ImageGaleryItem.propTypes = {
    image: PropTypes.object,
    togleModal: PropTypes.func,
    handleImageClick: PropTypes.func
};