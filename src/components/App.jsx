import React, { Component } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
// import Loader from './Loader/Loader';
// import Button from './Button/Button';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    showModal: false,
    images: null,
    imageName: ''
  };
  
  handleFormSubmit = imageName => {
    this.setState({ imageName });
  };


  togleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal
    }));
    
  };
 

  componentDidMount() {
   

    fetch('https://pixabay.com/api/?q=cat&page=1&key=24819311-d2b7ac0921a0ad572da5f837a&image_type=photo&orientation=horizontal&per_page=12')
      .then(res => res.json())
      .then(images => this.setState({ images }));
  };

  render() {
    console.log(this.state.images)
    const { showModal, images } = this.state
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit}/>
        <ImageGallery>
          {images && images.hits.map(image => (<ImageGalleryItem key={image.id} img={image} />)) }
        </ImageGallery>
        
        {/* <Loader/> */}
        {/* <Button/> */}
        {showModal && <Modal><img src="" alt="" /></Modal>}
        {/* <ToastContainer autoClose={3000} position="top-center"/> */}
      </div>
    )
  };
};
