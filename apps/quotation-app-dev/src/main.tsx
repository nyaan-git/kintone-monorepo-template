import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// kintone の型定義（後でちゃんとした型定義入れる）
declare const kintone: {
  events: {
    on: (event: string | string[], handler: (event: unknown) => unknown) => void
  }
  app: {
    getHeaderMenuSpaceElement: () => HTMLElement | null
    getHeaderSpaceElement: () => HTMLElement | null
  }
}

// レコード一覧画面が表示されたとき
kintone.events.on('app.record.index.show', (event) => {
  // Reactをマウントするコンテナを作成
  const container = document.createElement('div')
  container.id = 'react-root'

  // kintoneのヘッダースペースに追加
  const headerSpace = kintone.app.getHeaderMenuSpaceElement()
  if (headerSpace) {
    headerSpace.appendChild(container)

    // Reactアプリをレンダリング
    createRoot(container).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  }

  return event
})
