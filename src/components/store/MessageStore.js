import { create } from 'zustand'

export const useMessageStore = create((set) => ({
  isLoading: false,
  messageForm: "",
  progressIA: "",
  messages: [],
  setIsLoading: (isLoading) => set({ isLoading }),
  setMessageForm: (messageForm) => set({ messageForm }),
  setProgressIA: (progressIA) => set({ progressIA }),
  setSendMessage: (messages) => set({ messages }),
}))