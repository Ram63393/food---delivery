import { createContext, useEffect, useState } from 'react';
// import { food_list } from '../assets/assets';
export const StoreContext = createContext(null);
import axios from 'axios';
// changed folder case
const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const backendURL = "https://fooddelivery-backend1-di33.onrender.com";
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);


    const addToCart =async (itemId) => {
        console.log(itemId);
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if(token){
            await axios.post(backendURL+"/api/cart/add",{itemId},{headers:{token}});

        }
        console.log(cartItems);
    }
    const removeFromCart =async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if(token){
            await axios.post(backendURL+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }
    //    useEffect(()=>{
    //     console.log(cartItems);
    //    },[cartItems])


    const getTotalCartAmount = () => {
        let totalAmount = 0;
        // debugger;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                // debugger;
                let itemInfo = food_list.find((product) => product._id === item);
                console.log(itemInfo);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        // console.log(totalAmount)
        return totalAmount;
    }

    const fetchFoodList = async () => {
        const response = await axios.get(backendURL + '/api/food/list');
        setFoodList(response.data.data);
    }

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(backendURL + "/api/cart/get", {}, { headers: { token } });
            setCartItems(response.data.cartData || {}); // Ensure it's always an object
        } catch (error) {
            console.error("Error loading cart data:", error);
            setCartItems({}); // Fallback to empty object
        }
    };
    

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem('token')) {
                setToken(localStorage.getItem('token'));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])



    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount, backendURL
        , token, setToken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;