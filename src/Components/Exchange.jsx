import axios from "axios";
import { useState } from "react";

function Exchange({ info }) {
  const [exchange, setExchange] = useState({});
  const [amount, setAmount] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleInputChange = (event) => {
    setAmount(event.target.value);
  };

  const fetchExchange = async (event) => {
    event.preventDefault();
    try {
        setLoading(true);
      const response = await axios.get(
        `https://coin-market-service.vercel.app/api/exchange/${amount}/${selectedValue}`
      );
      setExchange(response.data);
    } catch (err) {
      console.log("Error to connect", err.message);
      setLoading(false);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={fetchExchange} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Crypto Converter</h2>
        <div className="mb-4">
          <label htmlFor="amount" className="block text-gray-700 mb-2">Amount</label>
          <input
            type="number"
            id="amount"
            placeholder="Enter Amount"
            value={amount}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="coin" className="block text-gray-700 mb-2">Select a Coin</label>
          <select
            value={selectedValue}
            onChange={handleSelectChange}
            className="border border-gray-300 p-2 w-full rounded focus:outline-none focus:ring focus:ring-blue-500"
          >
            <option value="" disabled>Select a coin</option>
            {info.map((val) => (
              <option key={val.id} value={val.id}>
                {val.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center">
          <button 
            type="submit" 
            disabled={!selectedValue || !amount}
            className={`bg-blue-500 text-white py-2 px-4 rounded focus:outline-none hover:bg-blue-600 transition duration-200 ${(!selectedValue || !amount || amount < 0) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Convert
          </button>
        </div>
      </form>
      {exchange?.quote ? (
        <div className="mt-4 bg-white p-4 rounded shadow-md w-80 text-center">
          <div className="text-lg font-semibold">
            Converted Price in USD: ${exchange.quote.USD.price.toFixed(2)}
          </div>
        </div>
      ) : (
        <p className="mt-4 text-gray-600">Nothing to show</p>
      )}
      {loading && <div className="loader">Loading...</div>}
    </div>
  );
}

export default Exchange;
