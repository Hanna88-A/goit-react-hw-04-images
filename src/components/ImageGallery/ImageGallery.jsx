// import { render } from '@testing-library/react';
import { useState, useEffect } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import s from './ImageGallery.module.css';
import imagesApi from '../../services/images-api';
import Button from '../Button/Button';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const Status = {
    IDLE: 'idle',
    PENDING: 'pending',
    REJECTED: 'rejected',
    RESOLVED: 'resolved'
};

export default function ImageGallery({ togleModal, handleImageClick, imageName }) {
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(Status.IDLE);
    const [page, setPage] = useState(1)
    const [startPage] = useState(1)
    

    useEffect(() => {
        
            if (imageName === '') {
                return
            };
            
            setStatus(Status.PENDING);
            setPage(1)

            imagesApi
                
                .fetchImages(imageName, startPage)
                .then(images => {
                    if (images.hits.length === 0) {
                        return Promise.reject(new Error(Notify.warning("Sorry, there are no images matching your search query. Please try again.")));
                    }
                    setImages([...images.hits]);
                    setPage(prevState => prevState + 1);
                    setStatus(Status.RESOLVED);
                
                })
                .catch(error => {
                    setError(error)
                    setStatus(Status.REJECTED)
                });
            
    }, [imageName, startPage]);

      
    const handleButtonClick = () => {
       imagesApi
            .fetchImages(imageName, page)
            .then(images => {
                if (images.hits.length === 0) {
                    return Promise.reject(new Error(Notify.warning("Sorry, there are no images matching your search query. Please try again.")));
                }
                setImages(prevState=> [...prevState,...images.hits]);
                setStatus(Status.RESOLVED);
                setPage(prevState=> prevState +1)
                
            })
            .catch(error => {
                setError(error)
                setStatus(Status.REJECTED)
            });
    }
       
    if (status === Status.IDLE) {
        return <div></div>
    }
    if (status === Status.PENDING) {
        return <div className={s.loader}><Loader /></div>
    }
    if (status === Status.REJECTED) {
        return <h1>{error.message}</h1>
    }
    if (status === Status.RESOLVED) {

        return (
            <>
                <ul className={s.imageGallery}>
                    {images && images.map(image => (<ImageGalleryItem key={image.id} image={image} togleModal={togleModal} handleImageClick={handleImageClick} />))}
                </ul>
                {images && <Button handleButtonClick={handleButtonClick} />}
            </>
            
        )
    };
};

