import { useState, useEffect } from "react";
import axios from "axios";

function useFlip(initialFlipState = true) {
    
    const [flipped, setFlipped] = useState(initialFlipState);

    const flip = () => {
        setFlipped(isUp => !isUp);
    };

    return [flipped, flip];
}

function useAxios(loacalStorageKey, baseURL) {

    const [responses, setResponses] = useLocalStorage(loacalStorageKey);

    const addResponseData = async (formatting = data => data, restOfURL = "") => {
      const response = await axios.get(`${baseURL}${restOfURL}`);
      setResponses(data => [...data, formatting(response.data)]);
    };
  
    const clearResponses = () => setResponses([]);
  
    return [responses, addResponseData, clearResponses];
  }
  
  function useLocalStorage(key, initialValue = []) {
    if (localStorage.getItem(key)) {
      initialValue = JSON.parse(localStorage.getItem(key));
    }
    const [value, setValue] = useState(initialValue);
  
    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);
  
    return [value, setValue];
  }
  
export default useLocalStorage;


export { useFlip, useAxios, useLocalStorage };