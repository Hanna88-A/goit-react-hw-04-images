import { useState } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import s from './Searchbar.module.css';
import PropTypes from "prop-types"; 



export default function Searchbar({onSubmit}) {
    const [imageName, setImageName] = useState('');
   
    

    const handleNameChange = evt => {
        setImageName(evt.currentTarget.value.toLowerCase());
    };

    const handleSubmit = evt => {
        evt.preventDefault();
        
        if (imageName.trim() === '') {
            Notify.failure('Еnter the name of the image!');
           return
        };
        onSubmit(imageName);
        setImageName('');
       
        
       
    };
   
    return (
        <header className={s.searchbar}>
            <form onSubmit={handleSubmit} className={s.searchForm}>
                <button type="submit" className={s.searchButton}>
                    <span className={s.searchButtonLabel}>Search</span>
                </button>
                <input
                    className={s.searchFormInput}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    name='imageName'
                    value={imageName}
                    onChange={handleNameChange}
                />
            </form>
        </header>
    )
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func
   
};

