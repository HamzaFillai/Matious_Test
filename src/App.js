import React, { useState , useEffect} from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

export default function App() {

  const[products,setPrduct] = useState();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
    .then(response=>response.json())
    .then(data=>{
      setPrduct(data)
    })
  }, []);

  function imageFormatter(cell){
    return (<img style={{width:80}} src={cell}/>) ;
  }

  const productsGenerator = () => {
    const items = [];
    if(products!== undefined)
    {
      for (let i = 0; i < products.length; i++) {
        items.push({ 
          image : imageFormatter(products[i].image),
          title: products[i].title, 
          description: products[i].description, 
          category : products[i].category,
          price: products[i].price,
          rating: products[i].rating.rate});
      }
    }
    return items;
  };
  
  const product = productsGenerator();

  const columns = [
    {
      dataField: "image",
      text: "Image",
      headerStyle: { backgroundColor: '#632626' ,color : "white"},
      style : {backgroundColor : "#9D5353",color:"white"},
      headerAlign: 'center',
      dataFormat : {imageFormatter},
      align: 'center'
    },
    {
      dataField: "title",
      text: "Title",
      headerStyle: { backgroundColor: '#632626' ,color : "white" ,width : "400px"},
      style : {backgroundColor : "#9D5353",color:"white"},
      headerAlign: 'center',
    },
    {
      dataField: "description",
      text: "Description",
      headerAlign: 'center',
      headerStyle: { backgroundColor: '#632626' ,color : "white" ,width : "600px"},
      style : {backgroundColor : "#9D5353",color:"white"}
    },
    {
      dataField: "category",
      text: "Category",
      sort: true,
      headerAlign: 'center',
      headerStyle: { backgroundColor: '#632626' ,color : "white" ,width : "130px"},
      style : {backgroundColor : "#9D5353",color:"white"},
      align: 'center'
    },
    {
      dataField: "price",
      text: "Price",
      sort : true,
      headerAlign: 'center',
      align: 'center',
      headerStyle: { backgroundColor: '#632626' ,color : "white" ,width : "80px"},
      style : {backgroundColor : "#9D5353",color:"white"}
    },
    {
      dataField: "rating",
      text: "Rate",
      sort : true,
      headerAlign: 'center',
      align: 'center',
      headerStyle: { backgroundColor: '#632626' ,color : "white" ,width : "80px"},
      style : {backgroundColor : "#9D5353",color:"white"}
    }
  ];

  return (
    <div className="App">
      <h1>List Of Products</h1>
      <BootstrapTable
        bootstrap4
        keyField="id"
        data={product}
        columns={columns}
        pagination={paginationFactory({ sizePerPage: 5 })}
      />
    </div>
  );
}