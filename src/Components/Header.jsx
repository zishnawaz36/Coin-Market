import { Link } from "react-router-dom";

function Header() {
    return (
        <>
            <div className="bg-gray-100 h-20 header flex items-center justify-between px-10">
               
                <h1 className="text-xl font-bold">CoinMarket</h1>

                
                <ul className="flex space-x-32 mr-10">
                    <li>
                        <Link to="/" className="hover:text-blue-600 text-lg"><b>Home</b></Link>
                    </li>
                    <li>
                        <Link to="/exchange" className="hover:text-blue-600 text-lg"><b>Exchange</b></Link>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default Header;
