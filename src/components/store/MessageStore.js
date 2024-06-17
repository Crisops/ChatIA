import { create } from 'zustand'

export const useMessageStore = create((set) => ({
  isLoading: true,
  messageForm: "",
  progressIA: "",
  messages: [],
  loadingProgressIA: 0,
  setIsLoading: (isLoading) => set({ isLoading }),
  setMessageForm: (messageForm) => set({ messageForm }),
  setProgressIA: (progressIA) => set({ progressIA }),
  setSendMessage: (updateFunction) => set((state) => ({ messages: updateFunction(state.messages) })),
  setLoadingPorgressIA: (loadingProgressIA) => set({loadingProgressIA})
}))