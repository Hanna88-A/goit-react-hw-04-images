import s from './ImageGalleryItem.module.css'
const ImageGaleryItem = ({img}) => {
    console.log(img)
    return (
        <li className={s.galleryItem}>
            <img className={s.imageGalleryItem} src={img.webformatURL} alt='' />
        </li>
    )
}
export default ImageGaleryItem;