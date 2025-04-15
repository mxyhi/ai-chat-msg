# AI Chat Prediction Tool

![License](https://img.shields.io/badge/license-MIT-blue.svg)

A powerful AI-based chat prediction tool that generates potential responses based on conversation context. This tool leverages the OpenRouter API (compatible with OpenAI format) to provide intelligent predictions for your conversations.

[中文文档](./README_zh.md)

## ✨ Features

- Input conversation context and background
- Choose prediction type: predict your own response or the other party's response
- Generate three potential responses (positive, neutral, negative)
- Support for multiple AI models through OpenRouter
- Real-time streaming responses
- Local network support

## 🚀 Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/ai-chat-msg.git
   cd ai-chat-msg
   ```

2. Install dependencies
   ```bash
   pnpm install
   ```

3. Configure environment variables
   - Copy `.env` to `.env.local`
   - Set your OpenRouter API key in `.env.local`:
     ```
     VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
     ```

4. Start the development server
   ```bash
   pnpm dev
   ```

5. Access the application in your browser at `http://localhost:5173`

## 📖 Usage

1. Enter the chat context and background in the "Chat Context" text area
2. In the "New Message" section, select the type of prediction you want (your response or the other party's response)
3. Enter the latest message in the text box below
4. Click the "Generate Predictions" button
5. View the three generated prediction results

## ⚙️ Configuration

The application supports various AI models through OpenRouter:

- GPT-3.5 Turbo
- GPT-4
- Claude 3 Opus
- Claude 3 Sonnet
- Claude 3.7 Sonnet (default)
- Claude 3 Haiku
- Gemini Pro
- Llama 3 70B
- DeepSeek R1
- DeepSeek R1 Instruct

You can select your preferred model in the configuration panel.

## 🛠️ Technology Stack

- React 19
- Vite 6
- Axios (for API requests)
- OpenRouter API

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.
