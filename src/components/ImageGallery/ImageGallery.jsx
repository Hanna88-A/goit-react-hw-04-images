// import { render } from '@testing-library/react';
import React, { Component } from 'react';
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

class ImageGallery extends Component {
    state = {
        images: [],
        error: null,
        status: Status.IDLE,
    }
   
    componentDidUpdate(prevProps, prevState) {
        const prevName = prevProps.imageName;
        const nextName = this.props.imageName;
        
        if (prevName !== nextName) {
            this.setState({ images: [], status: Status.PENDING});
             
            imagesApi
                .fetchImages(nextName, this.props.page)
                .then(images => {
                    if (images.hits.length === 0) {
                        return Promise.reject(new Error(Notify.warning("Sorry, there are no images matching your search query. Please try again.")));
                    }
                    this.setState(prevState => ({
                        images: [...prevState.images, ...images.hits],
                        status: Status.RESOLVED,
                        page: 2
                   }))      
                })
                .catch(error => this.setState({ error, status: Status.REJECTED }))
        };
    }

    handleButtonClick = () => {
       this.setState({ images: [], status: Status.PENDING });
       imagesApi
                .fetchImages(this.props.imageName, this.state.page)
                .then(images => {
                  
                    this.setState(prevState => ({
                        images: [...prevState.images, ...images.hits],
                        status: Status.RESOLVED,
                        page: prevState.page + 1
                   }))      
    
                })
                .catch(error => this.setState({ error, status: Status.REJECTED }))
    }

    render() {
        const { images, error, status } = this.state
        const { togleModal, handleImageClick } = this.props
       
        if (status === Status.IDLE) {
            return <div></div>
        }
        if (status === Status.PENDING) {
            return  <div className={s.loader}><Loader /></div>   
        }
        if (status === Status.REJECTED) {
            return <h1>{error.message}</h1>
        }
        if (status === Status.RESOLVED) {
            return (
                <>
                    <ul className={s.imageGallery}>
                        {images && images.map(image => (<ImageGalleryItem key={image.id} image={image} togleModal={togleModal} handleImageClick={handleImageClick}/>)) }
                    </ul>
                    {images && <Button handleButtonClick={this.handleButtonClick }/>}
                </>
            )
        }  
       
    }
    
};
export default ImageGallery;