const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI("AIzaSyDWt62Ca_C-BvQBfz4E1UFOdhfXu-dLVDM");

app.post('/generate', async (req, res) => {
    const { context } = req.body;
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(`상황: ${context}에 대한 메시지 형식 알려줘`);
        const response = await result.response;
        const text = await response.text();
        const messageStartIndex = text.indexOf("**1.");
        const messageEndIndex = text.indexOf("**추가적으로:");
        const messageExample = text.slice(messageStartIndex, messageEndIndex).trim();
        res.json({ message: messageExample });
    } catch (error) {
        console.error("Error generating message format:", error);
        res.status(500).send("Error generating message format");
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
