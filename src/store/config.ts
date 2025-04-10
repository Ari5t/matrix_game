import { create } from 'zustand';

interface Config {
  rows: number;
  cols: number;
  generationTime: number;
}

interface ConfigStore {
  config: Config;
  setRows: (rows: number) => void;
  setCols: (cols: number) => void;
  setGenerationTime: (generationTime: number) => void;
}

const useConfigStore = create<ConfigStore>((set) => ({
  config: {
    rows: 7,
    cols: 7,
    generationTime: 1000,
  },
  setRows: (rows) => set((state) => ({ config: { ...state.config, rows } })),
  setCols: (cols) => set((state) => ({ config: { ...state.config, cols } })),
  setGenerationTime: (generationTime) => set((state) => ({ config: { ...state.config, generationTime } })),
}));

export default useConfigStore;
