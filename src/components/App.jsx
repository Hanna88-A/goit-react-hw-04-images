import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
// import Loader from './Loader/Loader';
// import Button from './Button/Button';
import Modal from './Modal/Modal';

export class App extends Component {
  state = {
    showModal: false,
    image: []
  };



  togleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal
    }));
    
  };
 

  componentDidMount() {
   

    fetch('https://pixabay.com/api/?q=cat&page=1&key=24819311-d2b7ac0921a0ad572da5f837a&image_type=photo&orientation=horizontal&per_page=12')
      .then(res => res.json())
      .then(image => this.setState({ image }));
  };

  render() {
    console.log(this.state.image.hits)
    const { showModal, image } = this.state
    return (
      <div>
        <Searchbar />
        <ImageGallery>
          {image && (<ImageGalleryItem img={image.hits}/>)}
        </ImageGallery>
        
        {/* <Loader/>
        <Button/> */}
        {showModal && <Modal><img src="" alt="" /></Modal>}
        
      </div>
    )
  };
};
