import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/card';
import {Redirect} from 'react-router';

function Products() {
    const APIurl='http://makeup-api.herokuapp.com/api/v1/products.json?product_type=lip_liner';
    const [list, setList] = useState([]);
    const [activeDetail, setActiveDetail] = useState({active: false, prod: {} })
    
    useEffect(() => {
        getData()
    }, [])

    let getData = async () => {
       const resp = await axios.get(APIurl);
       console.log(resp.data);
       setList(resp.data);
    }

    const handleOnClick = (prod) => {
        console.log("Hice click", prod);
        setActiveDetail({active: true, prod})
    }

    return (
      <>
      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            { list.map((prod)=>{
                   return <Card 
                            key={`prod_${prod.id}`} 
                            {...prod}
                            onClick={()=>handleOnClick(prod)}
                             />
               })}
          </div>
        </div>
      </div>
      { activeDetail.active && <Redirect to={`product/${activeDetail.prod.id}`} />  }
      </>
    );
  }
  
  export default Products;