import React from 'react';
import banner from '../images/banner.png';

function PageTitle() {
    return (
        <h1 id="title">
            {"\n"}
            <img src={banner} class="img-fluid" alt="Responsive image"></img>
            {"\n"}
        </h1>
    );
};

export default PageTitle;