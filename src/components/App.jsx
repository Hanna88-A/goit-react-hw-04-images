import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
// import Loader from './Loader/Loader';
// import Button from './Button/Button';
import Modal from './Modal/Modal';

export class App extends Component {
   state = {
    showModal: false
  };
  togleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal
    }));
    
  };
  render() {
    const {showModal} = this.state
      return (
      <div>
        <Searchbar/>
        <ImageGallery>
          <ImageGalleryItem/>
        </ImageGallery>
        
        {/* <Loader/>
        <Button/> */}
         {showModal && <Modal><img src="" alt="" /></Modal>}
        
      </div>
    )
  };
};
