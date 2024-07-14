const { GoogleGenerativeAI } = require("@google/generative-ai");
const readline = require('readline');
const genAI = new GoogleGenerativeAI("AIzaSyDWt62Ca_C-BvQBfz4E1UFOdhfXu-dLVDM");

async function generateMessageFormat(context) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(`상황: ${context}에 대한 메시지 형식 알려줘`);
    const response = await result.response;
    const text = await response.text();
    const messageStartIndex = text.indexOf("**1.");
    const messageEndIndex = text.indexOf("**추가적으로:");
    const messageExample = text.slice(messageStartIndex, messageEndIndex).trim();
    console.log(messageExample);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('상황을 입력하세요: ', (context) => {
    generateMessageFormat(context);
    rl.close();
});

