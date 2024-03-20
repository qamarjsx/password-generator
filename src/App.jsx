import { useCallback, useRef, useState } from "react";

const generateRandomPassword = (
  length,
  includeSpCharacters,
  includeNumbers,
  setPassword
) => {
  let characterPool = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  const spCharacters = "!@#$%^&*()_+-=";
  let password = "";

  if (includeNumbers) characterPool += digits;
  if (includeSpCharacters) characterPool += spCharacters;

  for (let i = 0; i < length; i++) {
    password += characterPool.charAt(
      Math.floor(Math.random() * characterPool.length)
    );
  }
  setPassword(password);
  console.log(password);
};

const copyPasswordToClipboard = (password, passwordRef) => {
  // console.log(window.navigator.clipboard);
  passwordRef.current.select();
  window.navigator.clipboard.writeText(password);
};

export default function App() {
  const [length, setLength] = useState(8);
  const [spCharAllowed, setSpCharAllowed] = useState(false);
  const [numAllowed, setNumAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  useCallback(generateRandomPassword);
  useCallback(copyPasswordToClipboard);

  const handleCharacterCheckbox = () => {
    setSpCharAllowed((prevIsCharacter) => !prevIsCharacter);
  };

  const handleNumberCheckbox = () => {
    setNumAllowed((prevIsNumber) => !prevIsNumber);
  };

  return (
    <div
      className="bg-cover bg-center h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage:
          'url("https://res.cloudinary.com/dm4rvbu7y/image/upload/v1710973426/ReactPractice/ns0saua800ugvtycuvfc.jpg")',
      }}
    >
      <h1 className="my-5 text-3xl font-bold w-4/5 sm:w-3/5 md:w-1/2 lg:w-2/5 xl:w-1/3 2xl:w-1/4 text-center rounded glass text-[#307473]">
        Password Generator
      </h1>
      <div className="glass flex flex-col justify-between w-11/12 sm:w-10/12 md:w-9/12 lg:w-8/12 xl:w-1/2 h-1/5 p-3 rounded-lg text-[#F9F9F9]">
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
        <div className="flex justify-evenly mb-4">
          <div className="flex items-center">
            <input
              className="mx-1"
              type="range"
              defaultValue={8}
              min={8}
              max={20}
              onChange={(e) => setLength(e.target.value)}
            ></input>
            <span>Length: {length}</span>
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
        </div>
        <button
          onClick={() =>
            generateRandomPassword(
              length,
              spCharAllowed,
              numAllowed,
              setPassword
            )
          }
          className="bg-[#307473] w-1/4 self-center h-9 rounded cursor-pointer"
        >
          Generate
        </button>
      </div>
    </div>
  );
}
