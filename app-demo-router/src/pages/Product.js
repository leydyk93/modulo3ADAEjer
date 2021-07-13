import React from 'react';
import {useParams} from 'react-router-dom';

function Product() {
    const {id} = useParams();
    return (
      <div>
         Producto {id}
      </div>
    );
  }
  
  export default Product;