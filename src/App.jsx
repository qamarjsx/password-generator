import { useEffect, useState } from "react";

export default function App() {
  const [from, setFrom] = useState("aud");
  const [to, setTo] = useState("pkr");
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(0);
  const [rates, setRates] = useState({});
  const [convertedAmount, setConvertedAmount] = useState(0);

  function convert() {
    console.log(rates);
    setConvertedAmount(amount * rates[to]);
  }

  useEffect(() => convert(), [to, from, rates]);

  function swap() {
    setFrom(to);
    setTo(from);
    // console.log(to);
    // console.log(from);
  }

  useEffect(() => {
    (async function fetchCurrencyAPI() {
      try {
        const response = await fetch(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`
        );
        const data = await response.json();
        // console.log(typeof data);
        // Object.keys(data).forEach((key) => {
        //   console.log(data[key]);
        //   setCurrencies((prev) => [...prev, data[key]]);
        // });
        // console.log(data[from]);
        setRates(data[from]);
        // console.log(Object.keys(data[from]));
        setCurrencies(Object.keys(data[from]));
      } catch (error) {
        console.log("Error: ", error);
      }
    })();
  }, [from, to]);

  return (
    <div
      className="bg-cover bg-center h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage:
          'url("https://res.cloudinary.com/dm4rvbu7y/image/upload/v1710450157/ReactPractice/wvjxhk0bfnuad2j3lw88.jpg")',
      }}
    >
      <h1 className="text-[#E9F1F7] glass my-5 text-3xl font-bold w-4/5 sm:w-3/5 md:w-1/2 lg:w-2/5 xl:w-1/3 2xl:w-1/4 text-center rounded">
        Currency Converter
      </h1>
      <div className="glass w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-1/2 h-1/3 p-3 rounded-lg">
        <div className="h-1/3 p-2">
          <div className="flex justify-between items-center mb-5">
            <p className="text-[#E9F1F7] text-xl">From</p>
            <p className="text-[#E9F1F7] text-xl">Currency Type</p>
          </div>
          <div className="flex justify-between items-center">
            <input
              className="appearance-none outline-none px-2 text-lg text-[#E7DFC6] w-1/3 bg-inherit border-b border-solid border-b-[#131B23]"
              type="number"
              min={0}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-20 px-1 py-1 border border-solid border-[#E7DFC6] rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2274A5]"
            >
              <option value={from}>{from.toUpperCase()}</option>
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="h-1/3 p-2">
          <div className="flex justify-between items-center mb-5">
            <p className="text-[#E9F1F7] text-xl">To</p>
            <p className="text-[#E9F1F7] text-xl">Currency Type</p>
          </div>
          <div className="flex justify-between items-center">
            <input
              className="appearance-none outline-none px-2 text-lg text-[#E7DFC6] w-1/3 bg-inherit border-b border-solid border-b-[#131B23]"
              type="number"                             
              min={0}
              value={convertedAmount}
              readOnly
            />
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-20 px-1 py-1 border border-solid border-[#E7DFC6] rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2274A5]"
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="h-1/3 flex justify-center items-center">
          <button
            onClick={convert}
            className="text-[#E9F1F7] font-medium w-4/6 h-1/2 mr-5 bg-[#2274A5] shadow-2xl outline outline-offset-2 outline-1 outline-[#2274A5] hover:scale-[1.03] hover:outline-none duration-300 active:scale-[0.99]"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()}
          </button>
          <button
            onClick={swap}
            className="text-[#E9F1F7] font-medium w-1/6 h-1/2 ml-5 bg-[#816C61] shadow-2 outline outline-offset-2 outline-1 outline-[#fff] hover:scale-[1.03] hover:outline-none duration-300 active:scale-[0.99]"
          >
            Swap
          </button>
        </div>
      </div>
    </div>
  );
}
