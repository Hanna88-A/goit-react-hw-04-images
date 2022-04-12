import React, { Component } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import s from './Searchbar.module.css';

class Searchbar extends Component {
    state = {
        imageName: '',
        
    };

    handleNameChange = evt => {
        this.setState({ imageName: evt.currentTarget.value.toLowerCase() });
    };

    handleSubmit = evt => {
        evt.preventDefault();
        
        if (this.state.imageName.trim() === '') {
            Notify.failure('Еnter the name of the image!');
           return
        
           
        };

        this.props.onSubmit(this.state.imageName);
        this.setState({ imageName: ''});
    };
   
    render() {
        return (
            <header className={s.searchbar}>
                <form onSubmit={this.handleSubmit} className={s.searchForm}>
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
                        value={this.state.imageName}
                        onChange={this.handleNameChange}
                    />
                </form>
            </header>
        );
    };
};

export default Searchbar;