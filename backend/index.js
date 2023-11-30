const express = require('express');
const app = express();
const axios = require('axios');
const port = 5500;
const cors = require('cors');

app.use(cors());
const api_key = "298f278f-53eb-4ee7-8cfe-ddc532b47285";

// Input validation function
const validateInput = (currency1, currency2, quantity) => {
    return (
        currency1 && currency2 && !isNaN(quantity) && quantity > 0
    );
};

app.get('/api/convert/cryptotocurrency/:currency1/:currency2/:quantity', async (req, res) => {
    const currency1 = req.params.currency1;
    const currency2 = req.params.currency2;
    const quantity = parseFloat(req.params.quantity);

    // Validate input
    if (!validateInput(currency1, currency2, quantity)) {
        return res.status(400).json({ error: 'Invalid input. Please provide valid currencies and a positive quantity.' });
    }

    try {
        const response = await axios.get(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=${currency1}&convert=${currency2}`, {
            headers: {
                'X-CMC_PRO_API_KEY': api_key,
            },
        });

        const currencyData = response.data.data[currency1][0];

        if (!currencyData) {
            return res.status(404).json({ error: 'Currency not found' });
        }

        const conversionData = {
            id: currencyData.id,
            name: currencyData.name,
            symbol: currencyData.symbol,
            convertingFrom: currency1,
            convertingTo: currency2,
            amount: (currencyData.quote[currency2].price * quantity).toFixed(2),
            lastUpdated: currencyData.last_updated,
        };

        res.status(200).json(conversionData);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/convert/currencytocrypto/:currency1/:currency2/:quantity', async (req, res) => {
    const currency1 = req.params.currency1;
    const currency2 = req.params.currency2;
    const quantity = parseFloat(req.params.quantity);

    // Validate input
    if (!validateInput(currency1, currency2, quantity)) {
        return res.status(400).json({ error: 'Invalid input. Please provide valid currencies and a positive quantity.' });
    }

    try {
        const response = await axios.get(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=${currency2}&convert=${currency1}`, {
            headers: {
                'X-CMC_PRO_API_KEY': api_key,
            },
        });

        const currencyData = response.data.data[currency2][0];

        if (!currencyData) {
            return res.status(404).json({ error: 'Currency not found' });
        }

        const cryptoPriceInCurrency = currencyData.quote[currency1].price;
        const amountOfCrypto = quantity / cryptoPriceInCurrency;

        const conversionData = {
            id: currencyData.id,
            name: currencyData.name,
            symbol: currencyData.symbol,
            convertingFrom: currency1,
            convertingTo: currency2,
            amountOfCrypto: amountOfCrypto.toFixed(2),
            lastUpdated: currencyData.last_updated,
        };

        res.status(200).json(conversionData);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/convert/cryptotocrypto/:currency1/:currency2/:quantity', async (req, res) => {
    const currency1 = req.params.currency1;
    const currency2 = req.params.currency2;
    const quantity = parseFloat(req.params.quantity);

    // Validate input
    if (!validateInput(currency1, currency2, quantity)) {
        return res.status(400).json({ error: 'Invalid input. Please provide valid currencies and a positive quantity.' });
    }

    try {
        const response = await axios.get(`https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=${currency1}&convert=${currency2}`, {
            headers: {
                'X-CMC_PRO_API_KEY': api_key,
            },
        });

        const currencyData = response.data.data[currency1][0];

        if (!currencyData) {
            return res.status(404).json({ error: 'Currency not found' });
        }

        const conversionData = {
            id: currencyData.id,
            name: currencyData.name,
            symbol: currencyData.symbol,
            convertingFrom: currency1,
            convertingTo: currency2,
            amount: (currencyData.quote[currency2].price * quantity).toFixed(2),
            lastUpdated: currencyData.last_updated,
        };

        res.status(200).json(conversionData);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
