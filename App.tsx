
import React, { useState, useEffect } from 'react';
import type { Message, Subject, Difficulty } from './types';
import SubjectSelector from './components/SubjectSelector';
import DifficultySelector from './components/DifficultySelector';
import ChatWindow from './components/ChatWindow';
import { GoogleGenAI, Chat } from '@google/genai';

const App: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null);
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedSubject && selectedDifficulty) {
      const initializeChat = async () => {
        try {
          setIsLoading(true);
          setError(null);
          
          if (!process.env.API_KEY) {
            throw new Error("API_KEY environment variable not set.");
          }
          const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
          
          const newChat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
              systemInstruction: `You are a fun, friendly, and patient AI tutor for primary school students. Your name is Sparky. Explain concepts in a simple, step-by-step way using easy-to-understand language and examples a child can relate to. Use emojis to make it engaging. Always be encouraging and positive. When explaining the subject of ${selectedSubject.name}, keep your answers concise and focused. The difficulty level is ${selectedDifficulty.name}. ${selectedDifficulty.promptSegment} Your first message should be a warm welcome to the ${selectedSubject.name} lesson.`,
            },
          });
          setChat(newChat);

          const initialResponse = await newChat.sendMessage({ message: "Hello Sparky!"});
          const welcomeMessage: Message = { role: 'model', text: initialResponse.text };
          
          setMessages([welcomeMessage]);

        } catch (e) {
            if (e instanceof Error) {
                setError(`Failed to initialize tutor: ${e.message}`);
            } else {
                setError("An unknown error occurred during initialization.");
            }
        } finally {
            setIsLoading(false);
        }
      };
      initializeChat();
    }
  }, [selectedSubject, selectedDifficulty]);

  const handleSelectSubject = (subject: Subject) => {
    setSelectedSubject(subject);
    setSelectedDifficulty(null);
    setMessages([]);
    setError(null);
  };

  const handleSelectDifficulty = (difficulty: Difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const handleBackToSubjects = () => {
    setSelectedSubject(null);
    setSelectedDifficulty(null);
    setChat(null);
    setMessages([]);
    setError(null);
  };

  const handleBackToDifficulty = () => {
    setSelectedDifficulty(null);
    setChat(null);
    setMessages([]);
    setError(null);
  };

  const handleSendMessage = async (text: string) => {
    if (!chat) return;

    const userMessage: Message = { role: 'user', text };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await chat.sendMessage({ message: text });
      const modelMessage: Message = { role: 'model', text: response.text };
      setMessages((prevMessages) => [...prevMessages, modelMessage]);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred";
      setError(`Sparky had a problem: ${errorMessage}`);
      const errorResponseMessage: Message = {
        role: 'model',
        text: "Oops! I'm having a little trouble thinking right now. Please try again in a moment.",
      };
      setMessages((prevMessages) => [...prevMessages, errorResponseMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    if (!selectedSubject) {
      return <SubjectSelector onSelect={handleSelectSubject} />;
    }
    if (!selectedDifficulty) {
      return <DifficultySelector subject={selectedSubject} onSelect={handleSelectDifficulty} onBack={handleBackToSubjects} />;
    }
    return (
      <ChatWindow
        subject={selectedSubject}
        messages={messages}
        isLoading={isLoading}
        onSendMessage={handleSendMessage}
        onBack={handleBackToDifficulty}
      />
    );
  };
  
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 font-sans">
      <main className="w-full h-[90vh] max-h-[800px]">
        {renderContent()}
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </main>
    </div>
  );
};

export default App;
