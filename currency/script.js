document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('convertButton').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default form submission

    const sourceCurrency = document.getElementById('fromCurrency').value;
    const targetCurrency = document.getElementById('toCurrency').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (!amount) {
      alert('Please enter a valid amount');
      return;
    }

    convertCurrency(amount, sourceCurrency, targetCurrency);
  });
});

function convertCurrency(amount, sourceCurrency, targetCurrency) {
  const accessKey = '4b1d5a10f14f20ee7714faf4b6eff17d';
  const url = `http://data.fixer.io/api/latest?access_key=${accessKey}`; // Use HTTPS

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        const exchangeRates = data.rates;
        const sourceRate = exchangeRates[sourceCurrency];
        const targetRate = exchangeRates[targetCurrency];
        if (sourceRate && targetRate) {
          document.getElementById('sourceRate').innerText = `${sourceCurrency} ${sourceRate.toFixed(2)}`;
          document.getElementById('equals').innerText = '=';
          document.getElementById('targetRate').innerText = `${targetCurrency} ${targetRate.toFixed(2)}`;
          const convertedAmount = (amount / sourceRate) * targetRate;
          document.getElementById('result').innerText = `${amount} ${sourceCurrency} is approximately ${convertedAmount.toFixed(2)} ${targetCurrency}`;
        } else {
          alert('Error: Unable to find rates for the selected currencies');
        }
      } else {
        alert(`Error: ${data.error.type}`);
      }
    })
    .catch(error => {
      alert(`Error: ${error}`);
    });
}
