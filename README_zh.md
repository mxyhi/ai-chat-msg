# AI 聊天预测工具

![License](https://img.shields.io/badge/license-MIT-blue.svg)

这是一个基于 AI 的聊天预测工具，可以根据聊天上下文预测可能的回复。该工具使用 OpenRouter API（兼容 OpenAI 格式）来生成智能预测。

[English Documentation](./README.md)

## ✨ 功能

- 输入聊天上下文背景
- 选择预测类型：预测自己的回复或预测对方的回复
- 生成三种可能的回复（积极、中立、消极）
- 通过 OpenRouter 支持多种 AI 模型
- 实时流式响应
- 本地网络支持

## 🚀 安装与运行

1. 克隆仓库

   ```bash
   git clone https://github.com/yourusername/ai-chat-msg.git
   cd ai-chat-msg
   ```

2. 安装依赖

   ```bash
   pnpm install
   ```

3. 配置环境变量

   - 复制`.env`文件为`.env.local`
   - 在`.env.local`中设置您的 OpenRouter API 密钥：
     ```
     VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
     ```

4. 启动开发服务器

   ```bash
   pnpm dev
   ```

5. 在浏览器中访问 `http://localhost:5173`

## 📖 使用方法

1. 在"聊天上下文"文本框中输入聊天的背景和历史
2. 在"新消息"部分选择您想要预测的类型（自己的回复或对方的回复）
3. 在下方文本框中输入最新的消息
4. 点击"生成预测"按钮
5. 查看生成的三条预测结果

## ⚙️ 配置

应用程序通过 OpenRouter 支持多种 AI 模型：

- GPT-3.5 Turbo
- GPT-4
- Claude 3 Opus
- Claude 3 Sonnet
- Claude 3.7 Sonnet（默认）
- Claude 3 Haiku
- Gemini Pro
- Llama 3 70B
- DeepSeek R1
- DeepSeek R1 Instruct

您可以在配置面板中选择您偏好的模型。

## 🛠️ 技术栈

- React 19
- Vite 6
- Axios（用于 API 请求）
- OpenRouter API

## 📄 许可证

本项目采用 MIT 许可证 - 详情请参阅 LICENSE 文件。

## 🤝 贡献

欢迎贡献、提出问题和功能请求！请随时查看 issues 页面。
