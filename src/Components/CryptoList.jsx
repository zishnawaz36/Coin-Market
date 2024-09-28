import axios from "axios";
import { useState, useEffect } from "react";

function CryptoList({info}) {
    
    return (
        <div className="w-full h-full bg-gray-100 my-2"> 
            <table className="border border-gray-400 shadow-xl w-full"> 
                <thead className="border border-gray-50">
                    <tr className="border border-gray-300">
                        <th className="border border-gray-300 w-96">Name</th>
                        <th className="border border-gray-300">Price</th>
                        <th className="border border-gray-300">24h Change (%)</th>
                        <th className="border border-gray-300">7d Change (%)</th>
                    </tr>
                </thead>
                <tbody className="py-32">
                    {info.map((item, idx) => (
                        <tr className=" border border-gray-100 my-6 " key={item.id}>
                            <td className="px-8 py-3"><div className="flex flex-row"><img className="h-6 px-2" src={item["logo"]} alt={item.name} />{item.name}</div></td>
                            
                            <td className="px-5 text-center">${item.quote.USD.price.toFixed(2)}</td>
                            <td className={item.quote.USD.percent_change_24h > 0 ? "text-green-400 text-center" : "text-red-500 text-center " } >{item.quote.USD.percent_change_24h.toFixed(2)}%</td>
                            <td className="text-center">{item.quote.USD.percent_change_7d.toFixed(2)}%</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CryptoList;
