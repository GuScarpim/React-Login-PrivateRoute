import React, { Component } from 'react';


import Imagem from '../img/logo.png';

export default props => {
    return (
        <img src={Imagem} className={props.className} />
    )
}