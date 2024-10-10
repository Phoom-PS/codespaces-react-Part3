import { useEffect, useState } from 'react';
import './Shop.css';
import axios from 'axios'

function Item(props){
    return (<div key={props.id} onClick={()=>props.callback(props)}>
        <img src={props.img} width={200} height={200} /><br/>
        id : {props.id} <br/>
        name :  {props.name} <br/>
        price : {props.price} <br/>
    </div>);
}

export default function Shop(){

        const [products,setProducts] = useState([]);
        const URL = "https://cuddly-robot-9774gpppj549hxrxr-5000.app.github.dev"
        useEffect(()=>{
            axios.get(URL+'/api/products')
            .then(response=>{
                setProducts(response.data);
            })
            .catch(error=>{
                console.log("error");
            });

        },[]);
        const [cart,setCart] = useState([]);
        const [total,setTotal] = useState(0);
        function addCart(item){
            setCart([...cart,{id:item.id,name:item.name,price:item.price,img:item.img}]);
            setTotal(total+item.price);
           }

        function removeCart(item){
            setTotal(total-item.price);
            setCart(cart.filter(_item => _item !== item));
        }

        const productList=products.map(item=><Item {...item} callback={addCart}/>);
        const cartList=cart.map(item=><li>{item.id} {item.name} {item.price} 
        <button onClick={()=>(removeCart(item))}>Delete</button></li>);
        
    return (<><div className='grid-container'> {productList}</div>
        <h1>Cart</h1>
        
        <button onClick={()=>{setCart([]) ;setTotal([])}}>Clear All</button>
        <ol>{cartList}</ol>
        <h1>Total : {total}</h1>
        
   </>);
}