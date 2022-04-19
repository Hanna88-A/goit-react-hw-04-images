import { useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';


export function App() {
  const [showModal, setShowMopdal] = useState(false);
  const [imageName, setImageName] = useState('');
  const [bigImage, setBigImage] = useState(null);
  const [tags, setTages] = useState('');
  const [pageDefault] = useState(1);

  const handleFormSubmit = (imageName) => {
    setImageName(imageName)
  };

  const handleImageClick = (bigImage, tags) => {
    setBigImage(bigImage)
    setTages(tags)
  };

  const togleModal = () => {
    setShowMopdal(prevState => !prevState)
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} pageDefault={pageDefault} />
      <ImageGallery imageName={imageName} togleModal={togleModal} handleImageClick={handleImageClick} />

      {showModal && <Modal onClose={togleModal}><img src={bigImage} alt={tags} width={900}/></Modal>}

    </div>
  )
}

