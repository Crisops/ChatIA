import { create } from 'zustand'

export const useMessageStore = create((set) => ({
  isLoading: false,
  messageForm: "",
  progressIA: "",
  messages: [],
  loadingProgressIA: 0,
  setIsLoading: (isLoading) => set({ isLoading }),
  setMessageForm: (messageForm) => set({ messageForm }),
  setProgressIA: (progressIA) => set({ progressIA }),
  setSendMessage: (messages) => set({ messages }),
  setLoadingPorgressIA: (loadingProgressIA) => set({loadingProgressIA})
}))