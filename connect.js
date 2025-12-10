const connectButton = document.getElementById('connectButton');
const accountInfo = document.getElementById('accountInfo');

if (typeof window.ethereum !== 'undefined') {
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  connectButton.addEventListener('click', async () => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);

      accountInfo.innerHTML = `
        <p>Адрес кошелька: <code>${address}</code></p>
        <p>Баланс (Wei): <code>${balance.toString()}</code></p>
        <p>Баланс (Ether): <strong>${ethers.utils.formatEther(balance)}</strong></p>
      `;
    } catch (error) {
      console.error("Ошибка при подключении:", error);
      accountInfo.innerText = 'Ошибка при подключении к кошельку. Посмотрите консоль.';
    }
  });
} else {
  accountInfo.innerHTML = '<p>Пожалуйста, установите MetaMask или другой Web3-кошелёк.</p>';
}
