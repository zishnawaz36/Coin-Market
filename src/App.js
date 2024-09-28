import Header from './Components/Header';
import CryptoList from './Components/CryptoList';
import './index.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Exchange from './Components/Exchange';
import { useState, useEffect } from 'react';
import axios from 'axios';
function App(){
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(false);
    useEffect(() => {

        const fetchdata = async () => {
            setLoading(true);
            try {
                const response = await axios.get("https://coin-market-service.vercel.app/api/listings/latest");
                
                let resData = response.data;
                let idString = "";
                resData?.map(data => {
                    if(idString.length) {
                        idString+=`,${data["slug"]}`
                    } else idString =`${data["slug"]}`
                });
                
                let URI =`https://coin-market-service.vercel.app/api/cryptocurrency/info/${idString}`;
                const logoResponse = await axios.get(URI);
                let logoData = logoResponse?.data
                let overallArray = resData.map(val => {
                    return {...val , "logo": logoData[val.id]["logo"]}
                });
                setInfo(overallArray);
            } catch (err) {
                console.log("Error to connect", err.message);
                setLoading(false);
            } finally {
              setLoading(false);
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
    {loading && <div className="loader">Loading...</div>}
    </>
  )
}
export default App;