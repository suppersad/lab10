// Вставьте адрес вашего контракта
const contractAddress = 'CONTRACT_ADDRESS_HERE';

// Вставьте ABI вашего контракта (скопируйте из Remix)
const contractAbi = [
  {
    "inputs": [{"internalType":"string","name":"_message","type":"string"}],
    "name":"setMessage","outputs":[],"stateMutability":"nonpayable","type":"function"
  },
  {
    "inputs": [], "name": "getMessage",
    "outputs":[{"internalType":"string","name":"","type":"string"}],
    "stateMutability":"view","type":"function"
  }
];

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, contractAbi, signer);

document.getElementById('setMessageButton').onclick = async () => {
  try {
    const message = document.getElementById('messageInput').value;
    const tx = await contract.setMessage(message);
    // ждем майнинга
    await tx.wait();
    alert('Сообщение установлено. Транзакция: ' + tx.hash);
  } catch (err) {
    console.error(err);
    alert('Ошибка: ' + (err.message || err));
  }
};

document.getElementById('getMessageButton').onclick = async () => {
  try {
    const message = await contract.getMessage();
    document.getElementById('messageDisplay').innerText = message;
  } catch (err) {
    console.error(err);
    alert('Ошибка чтения: ' + (err.message || err));
  }
};
