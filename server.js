const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON bodies

// POST endpoint
app.post('/bfhl', (req, res) => {
    const data = req.body.data;
    const numbers = data.filter(item => !isNaN(parseFloat(item)) && isFinite(item)); // Corrected filtering logic for numbers
    const alphabets = data.filter(item => isNaN(parseFloat(item)) && /^[a-zA-Z]+$/.test(item)); // Enhanced regex to ensure only alphabetic characters are considered

    // Sorting and finding the highest lowercase alphabet
    const highestLowercase = alphabets
        .filter(char => char === char.toLowerCase())
        .sort()
        .pop(); // Getting the highest lowercase alphabet

    // Construct the response object
    const response = {
        is_success: true,
        user_id: "vibhanshu_shukla", // Example user ID, replace with actual
        email: "vibhanshu.shukla2021@vitstudent.ac.in", // Example email, replace with actual
        roll_number: "21BCE2600", // Example roll number, replace with actual
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : []
    };

    // Log the response for debugging
    console.log("Response:", JSON.stringify(response, null, 2));

    // Send the JSON response
    res.json(response);
});

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


