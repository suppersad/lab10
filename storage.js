// Адрес контракта в сети Sepolia
const contractAddress = "0xEdC845c66257dcC6117e21ec174f83BF72e65321";

// ABI, который ты прислал
const contractAbi = [
  {
    "inputs": [],
    "name": "getMessage",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_message",
        "type": "string"
      }
    ],
    "name": "setMessage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Проверяем наличие MetaMask
if (typeof window.ethereum === "undefined") {
  alert("MetaMask не найден! Установите MetaMask.");
}

// Провайдер и signer появятся после подключения
let provider;
let signer;
let contract;

// Подключение MetaMask
document.getElementById("connectButton").onclick = async () => {
  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });

    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractAbi, signer);

    alert("MetaMask успешно подключён!");
  } catch (err) {
    console.error("Ошибка подключения:", err);
    alert("Ошибка подключения к MetaMask.");
  }
};

// Чтение сообщения
document.getElementById("getMessageButton").onclick = async () => {
  if (!contract) return alert("Сначала подключите MetaMask!");

  try {
    const message = await contract.getMessage();
    document.getElementById("messageDisplay").innerText = message;
  } catch (err) {
    console.error("Ошибка чтения:", err);
    alert("Не удалось получить сообщение.");
  }
};

// Запись сообщения
document.getElementById("setMessageButton").onclick = async () => {
  if (!contract) return alert("Сначала подключите MetaMask!");

  const newMessage = document.getElementById("messageInput").value.trim();
  if (newMessage.length === 0) return alert("Введите сообщение!");

  try {
    const tx = await contract.setMessage(newMessage);
    alert("Транзакция отправлена: " + tx.hash);

    await tx.wait();
    alert("Сообщение обновлено в блокчейне!");

  } catch (err) {
    console.error("Ошибка транзакции:", err);
    alert("Ошибка при отправке транзакции.");
  }
};
