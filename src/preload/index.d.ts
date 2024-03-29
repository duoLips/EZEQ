import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    electronAPI: {
      openFile: () => Promise<string>,
      saveFile: (content: string) => Promise<boolean>
    }
  }
}
