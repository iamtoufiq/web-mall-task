import { create } from "zustand";

interface UseEditFormModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEditFormModal = create<UseEditFormModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useEditFormModal;
