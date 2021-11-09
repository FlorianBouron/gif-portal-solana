import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [gifList, setGifList] = useState([]);

  const TEST_GIFS = [
    "https://64.media.tumblr.com/tumblr_m23fw6na0N1qb8a3ro1_500.gifv",
    "https://media1.giphy.com/media/fSvqyvXn1M3btN8sDh/giphy.gif?cid=790b761106a3606a9cc8fa93b1d5f9ada17c64a2bcc3df15&rid=giphy.gif&ct=g",
    "https://media4.giphy.com/media/10LKovKon8DENq/giphy.gif?cid=790b7611ee42d00e3788b771d89cc26bb506157550ead1b9&rid=giphy.gif&ct=ghttps://media4.giphy.com/media/10LKovKon8DENq/giphy.gif?cid=790b7611ee42d00e3788b771d89cc26bb506157550ead1b9&rid=giphy.gif&ct=g",
    "https://media1.giphy.com/media/0ZufpQKEBuCKnmnKe8/giphy.gif?cid=790b7611b5876e6ae630469834090e81a1ae1175891244c9&rid=giphy.gif&ct=g",
  ];

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana) {
        if (solana.isPhantom) {
          const response = await solana.connect({
            onlyIfTrusted: true,
          });
          setWalletAddress(response.publicKey.toString());
        }
      } else {
        alert("Solana object not found! Get a Phantom Wallet 👻");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    const { solana } = window;
    if (solana) {
      const response = await solana.connect();
      console.log(
        "Connected with Public Key:",
        response.publicKey.toString()
      );
      setWalletAddress(response.publicKey.toString());
    }
  };

  const onInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const sendGif = async () => {
    if (inputValue.length > 0) {
      console.log('Gif link:', inputValue);
    } else {
      console.log('Empty input. Try again.');
    }
  };

  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  const renderConnectedContainer = () => (
    <div className="connected-container">
      <input
        type="text"
        placeholder="Enter gif link"
        value={inputValue}
        onChange={onInputChange}
      />
      <button className="cta-button submit-gif-button" onClick={sendGif}>
        Submit
      </button>
      <div className="gif-grid">
        {gifList.map((gif) => (
          <div className="gif-item" key={gif}>
            <img src={gif} alt={gif} />
          </div>
        ))}
      </div>
    </div>
  );

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener("load", onLoad);
    return () => window.removeEventListener("load", onLoad);
  }, []);

  useEffect(() => {
    if (walletAddress) {
      console.log('Fetching GIF list...');
      
      // Call Solana program here.
      setGifList(TEST_GIFS);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAddress]);

  return (
    <div className="App">
      <div className={walletAddress ? "authed-container" : "container"}>
        <div className="header-container">
          <p className="header">🖼 GIF Portal</p>
          <p className="sub-text">
            View your GIF collection in the metaverse ✨
          </p>
          {walletAddress
            ? renderConnectedContainer()
            : renderNotConnectedContainer()}
        </div>
      </div>
    </div>
  );
};

export default App;
