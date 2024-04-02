import { useCallback, useRef, useState } from "react";

const generateRandomPassword = (
  length,
  includeSpCharacters,
  includeNumbers,
  yourName,
  includeYourName,
  includeRandomName,
  setPassword
) => {
  let characterPool = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  const spCharacters = "!@#$%^&*()_+-=";
  let password = "";

  if (includeNumbers) characterPool += digits;
  if (includeSpCharacters) characterPool += spCharacters;
  if (includeYourName || includeRandomName) {
    password = yourName || randomName;
    for (let i = yourName.length; i < length; i++) {
      password += characterPool.charAt(
        Math.floor(Math.random() * characterPool.length)
      );
    }
    setPassword(password);
    console.log(password);
    return;
  }

  for (let i = 0; i < length; i++) {
    password += characterPool.charAt(
      Math.floor(Math.random() * characterPool.length)
    );
  }
  setPassword(password);
  console.log(password);
  return;
};

const copyPasswordToClipboard = (password, passwordRef) => {
  // console.log(window.navigator.clipboard);
  passwordRef.current.select();
  window.navigator.clipboard.writeText(password);
};

const getRandomName = async () => {};

export default function App() {
  const [length, setLength] = useState(8);
  const [spCharAllowed, setSpCharAllowed] = useState(false);
  const [numAllowed, setNumAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);
  const [yourName, setYourName] = useState("");
  const [yourNameAllowed, setYourNameAllowed] = useState(false);
  const [randomNameAllowed, setRandomNameAllowed] = useState(false);

  useCallback(generateRandomPassword);
  useCallback(copyPasswordToClipboard);

  const handleCharacterCheckbox = () => {
    setSpCharAllowed((prevIsCharacter) => !prevIsCharacter);
  };

  const handleNumberCheckbox = () => {
    setNumAllowed((prevIsNumber) => !prevIsNumber);
  };

  const handleYourNameCheckbox = () => {
    setYourNameAllowed(!yourNameAllowed);
    setRandomNameAllowed(false);
    if (!yourNameAllowed) {
      const name = prompt(`Please enter your name`);
      if (name === null || name === "") setYourNameAllowed(false);
      setYourName(name);
    }
  };

  const handleRandomNameCheckbox = async () => {
    setRandomNameAllowed(!randomNameAllowed);
    setYourNameAllowed(false);
    if (!randomNameAllowed) {
      const res = await fetch("https://randomuser.me/api/");
      const data = await res.json();
      const randomName = data.results[0].name.first;
      console.log(randomName);
      setYourName(randomName);
    }
  };
  return (
    <div
      className="bg-cover bg-center h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundImage:
          'url("https://res.cloudinary.com/dm4rvbu7y/image/upload/v1710973426/ReactPractice/ns0saua800ugvtycuvfc.jpg")',
      }}
    >
      <h1 className="my-5 text-2xl font-bold w-4/5 sm:w-3/5 md:w-1/2 lg:w-2/5 xl:w-1/3 2xl:w-1/4 text-center rounded glass text-[#307473]">
        Password Generator
      </h1>
      <div className="glass flex flex-col justify-between h-2/5 w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-1/2 p-3 rounded-lg text-[#F9F9F9]">
        <div className="flex justify-center">
          <input
            readOnly
            value={password}
            placeholder="Password"
            ref={passwordRef}
            className="w-2/3 h-10 my-5 ml-5 outline-none box-border text-lg border border-solid border-[#FFFAFF] p-2 text-[#474350]"
          ></input>
          <button
            onClick={() => copyPasswordToClipboard(password, passwordRef)}
            className="bg-[#F4B942] h-10 w-1/3 my-5 mr-5 cursor-pointer"
          >
            Copy
          </button>
        </div>
        <div className="flex mb-4 items-center justify-evenly h-3/5 flex-col">
          <div className="flex items-center">
            <input
              className="mx-1"
              type="range"
              defaultValue={8}
              min={8}
              max={20}
              onChange={(e) => setLength(e.target.value)}
            ></input>
            <span className="">Length: {length}</span>
          </div>
          <div className="flex items-center">
            <input
              className="mx-1"
              type="checkbox"
              onChange={handleCharacterCheckbox}
              checked={spCharAllowed}
              name="Sp. Characters"
            />
            <span htmlFor="Sp. Characters">Sp. Characters</span>
          </div>
          <div className="flex items-center">
            <input
              className="mx-1"
              type="checkbox"
              onChange={handleNumberCheckbox}
              checked={numAllowed}
              name="Numbers"
            />
            <span htmlFor="Numbers">Numbers</span>
          </div>
          <div className="flex items-center">
            <input
              className="mx-1"
              type="checkbox"
              onChange={handleYourNameCheckbox}
              checked={yourNameAllowed}
              name="Your Name"
            />
            <span htmlFor="Your Name">Your Name</span>
          </div>
          <div className="flex items-center">
            <input
              className="mx-1"
              type="checkbox"
              onChange={handleRandomNameCheckbox}
              checked={randomNameAllowed}
              name="Random Name"
            />
            <span htmlFor="Random Name">Random Name</span>
          </div>
          {(yourNameAllowed || randomNameAllowed) && <span>{yourName}</span>}
        </div>
        <button
          onClick={() =>
            generateRandomPassword(
              length,
              spCharAllowed,
              numAllowed,
              yourName,
              yourNameAllowed,
              randomNameAllowed,
              setPassword
            )
          }
          className="bg-[#307473] w-1/3 self-center h-12 rounded cursor-pointer"
        >
          Generate
        </button>
      </div>
    </div>
  );
}
