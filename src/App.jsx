import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { API_CONFIG, STORAGE_KEYS, MESSAGE_TYPES } from "./constants";
import { message } from "./utils";
import useLocalStorage from "./hooks/useLocalStorage";
import useChat from "./hooks/useChat";
import usePredictions from "./hooks/usePredictions";
import MainLayout from "./layouts/MainLayout";
import ThreeColumnLayout from "./layouts/ThreeColumnLayout";
import BackgroundContext from "./components/Chat/BackgroundContext";
import ChatContainer from "./components/Chat/ChatContainer";
import ClearDataButton from "./components/Chat/ClearDataButton";
import PredictionsContainer from "./components/Predictions/PredictionsContainer";
import PredictionTypeConfig from "./components/Predictions/PredictionTypeConfig";
import ApiConfigContainer from "./components/Config/ApiConfigContainer";
import "./styles/index.css";

function App() {
  const { t } = useTranslation();

  // State management
  const [showConfig, setShowConfig] = useState(false);
  const [messageType, setMessageType] = useLocalStorage(
    STORAGE_KEYS.MESSAGE_TYPE,
    MESSAGE_TYPES.OTHER
  );

  // Custom hooks
  const [apiConfig, setApiConfig] = useLocalStorage(STORAGE_KEYS.API_CONFIG, {
    apiKey: API_CONFIG.DEFAULT_API_KEY,
    apiUrl: API_CONFIG.DEFAULT_API_URL,
    model: API_CONFIG.DEFAULT_MODEL,
  });

  const {
    messages,
    backgroundContext,
    setBackgroundContext,
    addMessage,
    deleteMessage,
    getFullContext,
    hasMessages,
    clearMessages,
    clearBackgroundContext,
    clearAll,
  } = useChat();

  const { predictions, loading, streaming, timestamp, generatePredictions } =
    usePredictions();

  // Handle API configuration save
  const handleSaveConfig = (newConfig) => {
    setApiConfig(newConfig);
    setShowConfig(false);
    message.success(t("config.saved"));
  };

  // Handle generate predictions
  const handleGeneratePredictions = () => {
    generatePredictions(getFullContext(), messageType, apiConfig, null, () =>
      setShowConfig(true)
    );
  };

  // Left column content: configuration and background context
  const leftColumnContent = (
    <>
      <ApiConfigContainer
        config={apiConfig}
        onSave={handleSaveConfig}
        showConfig={showConfig}
        setShowConfig={setShowConfig}
      />
      <BackgroundContext
        value={backgroundContext}
        onChange={setBackgroundContext}
        onClear={clearBackgroundContext}
      />
    </>
  );

  // Middle column content: chat context
  const middleColumnContent = (
    <ChatContainer
      messages={messages}
      onAddMessage={addMessage}
      onDeleteMessage={deleteMessage}
      onClearMessages={clearMessages}
    />
  );

  // Right column content: prediction type and results
  const rightColumnContent = (
    <>
      <PredictionTypeConfig
        messageType={messageType}
        onMessageTypeChange={setMessageType}
        onGenerate={handleGeneratePredictions}
        loading={loading}
        disabled={!hasMessages}
      />
      <PredictionsContainer
        predictions={predictions}
        streaming={streaming}
        loading={loading}
        disabled={!hasMessages}
        timestamp={timestamp}
      />
    </>
  );

  // Footer content: clear button
  const footerContent = (
    <>
      {(hasMessages || backgroundContext) && (
        <div
          style={{
            textAlign: "center",
            margin: 0,
            padding: 0,
            marginBottom: "-0.5rem",
          }}
        >
          <ClearDataButton onClearAll={clearAll} />
        </div>
      )}
    </>
  );

  return (
    <MainLayout modelName={apiConfig.model || API_CONFIG.DEFAULT_MODEL}>
      <ThreeColumnLayout
        leftColumn={leftColumnContent}
        middleColumn={middleColumnContent}
        rightColumn={rightColumnContent}
        footer={footerContent}
      />
    </MainLayout>
  );
}

export default App;
