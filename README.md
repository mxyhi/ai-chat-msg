# AI Chat Prediction Tool

![License](https://img.shields.io/badge/license-MIT-blue.svg)

A powerful AI-based chat prediction tool that generates potential responses based on conversation context. This tool leverages the OpenRouter API (compatible with OpenAI format) to provide intelligent predictions for your conversations, helping you anticipate how a conversation might develop.

[中文文档](./README_zh.md)

## ✨ Features

- **Contextual Predictions**: Generate AI-powered predictions based on chat history and background context
- **Dual Prediction Modes**: Choose to predict either your own potential responses or the other party's replies
- **Emotional Spectrum**: Generate three distinct response types (positive, neutral, negative) for comprehensive conversation planning
- **Advanced AI Models**: Support for multiple state-of-the-art AI models through OpenRouter
- **Real-time Streaming**: Watch predictions appear in real-time with streaming response technology
- **Reasoning Process**: View the AI's reasoning process to understand how predictions are generated
- **Language Support**: Automatically detects and responds in the language used in the conversation
- **Local Network**: Access the tool on your local network from multiple devices
- **Customizable Configuration**: Easily configure API settings and model selection

## 🚀 Installation

1. Clone the repository

   ```bash
   git clone https://github.com/mxyhi/ai-chat-msg.git
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
   - Note: You can also enter your API key directly in the application's configuration panel

4. Start the development server

   ```bash
   pnpm dev
   ```

5. Access the application in your browser at `http://localhost:5173`

6. For production build
   ```bash
   pnpm build
   pnpm preview  # To test the production build
   ```

## 🌐 GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

1. **Automatic Deployment**: When you push to the `main` branch, the application will automatically build and deploy to GitHub Pages.

2. **Manual Deployment**: You can also manually trigger the deployment from the Actions tab in your GitHub repository.

3. **Access the Live Demo**: Once deployed, your application will be available at `https://[your-username].github.io/ai-chat-msg/`

4. **Custom Domain**: You can configure a custom domain in your GitHub Pages settings if desired.

## 📖 Usage Guide

### Basic Usage

1. **Set Background Context** (Optional)

   - Enter any relevant background information about the conversation in the "Background Context" section
   - This provides context that isn't part of the actual conversation but helps the AI understand the situation

2. **Add Chat Messages**

   - In the "Chat Context" section, add messages exchanged in the conversation
   - For each message, specify whether it's from you ("My message") or the other person ("Other's message")
   - Messages are timestamped automatically to maintain conversation flow

3. **Select Prediction Type**

   - Choose whether you want to predict your own potential responses or the other person's responses
   - This determines the perspective of the generated predictions

4. **Generate Predictions**

   - Click the "Generate Predictions" button to create three different response predictions
   - The system will generate positive, neutral, and negative response variations
   - You can view the AI's reasoning process to understand how it arrived at these predictions

5. **Use the Results**
   - Copy any prediction you find useful by clicking the copy button
   - Use the predictions to prepare for your next message or anticipate the other person's response

### Advanced Features

- **API Configuration**: Configure your OpenRouter API settings in the configuration panel
- **Model Selection**: Choose from various AI models based on your needs and performance requirements
- **Language Switching**: Toggle between English and Chinese interface with the language switcher
- **Data Management**: Clear conversation data, background context, or all data as needed

## ⚙️ Configuration

The application supports various AI models through OpenRouter:

- GPT-3.5 Turbo - Fast and cost-effective for most prediction needs
- GPT-4 - Higher accuracy and reasoning capabilities
- Claude 3 Opus - Advanced reasoning and nuanced understanding
- Claude 3 Sonnet - Good balance of performance and speed
- Claude 3.7 Sonnet (default) - Latest model with enhanced capabilities
- Claude 3 Haiku - Fast responses with good quality
- Gemini Pro - Google's advanced AI model
- Llama 3 70B - Meta's open-source large language model
- DeepSeek R1 - Specialized for code and technical content
- DeepSeek R1 Instruct - Instruction-tuned version of DeepSeek R1

You can select your preferred model in the configuration panel. The application will remember your settings between sessions.

## 🛠️ Technology Stack

- **Frontend**: React 19 with modern hooks and components
- **Build Tool**: Vite 6 for fast development and optimized production builds
- **HTTP Client**: Axios for API requests and response handling
- **API Integration**: OpenRouter API (compatible with OpenAI format)
- **Internationalization**: i18next for multi-language support
- **State Management**: React hooks and localStorage for persistent state
- **Streaming**: Server-sent events for real-time streaming responses

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page or submit pull requests to improve the application.
