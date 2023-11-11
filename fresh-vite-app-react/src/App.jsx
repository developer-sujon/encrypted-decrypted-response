import axios from "axios";
import CryptoJS from "crypto-js";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch the encrypted data from the server
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5000");
        const { encryptedData } = response.data;

        // Decryption key (stored in an environment variable)
        const secretKey = "your-secret-key";

        // Decrypt the data
        const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
        const decryptedData = decryptedBytes.toString(CryptoJS.enc.Utf8);

        // Parse the JSON string to an array of objects
        const decryptedArray = JSON.parse(decryptedData);

        setData(decryptedArray);
      } catch (error) {
        console.error("Error fetching or decrypting data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Decrypted Data</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
