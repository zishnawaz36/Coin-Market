import Header from './Components/Header';
import CryptoList from './Components/CryptoList';
import './index.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Exchange from './Components/Exchange';
import { useState, useEffect } from 'react';
import axios from 'axios';
function App(){
  const [info, setInfo] = useState([]);
    useEffect(() => {

        const fetchdata = async () => {
            try {
                const response = await axios.get("https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest", {
                    headers: {
                        'X-CMC_PRO_API_KEY': '56f87733-313e-48c1-a2ab-4de1ec08f923' 
                    }
                });
                let resData = response.data.data;
                 
                let idString = "";
                resData?.map(data => {
                    if(idString.length) {
                        idString+=`,${data["slug"]}`
                    } else idString =`${data["slug"]}`
                });
                let URI =`https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?slug=${idString}`;
                const logoResponse = await axios.get(URI, {
                    headers: {
                        'X-CMC_PRO_API_KEY': '56f87733-313e-48c1-a2ab-4de1ec08f923' 
                    }
                });
                let logoData = logoResponse?.data?.data
                let overallArray = resData.map(val => {
                    return {...val , "logo": logoData[val.id]["logo"]}
                });
                setInfo(overallArray);
            } catch (err) {
                console.log("Error to connect", err.message);
            }
        };
        fetchdata();
    }, []);
  return(
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/"
         element={<CryptoList info={info} />}/>
         <Route path='/exchange' 
         element={<Exchange info={info} />}></Route>
       
    </Routes>
    </BrowserRouter>
    </>
  )
}
export default App;