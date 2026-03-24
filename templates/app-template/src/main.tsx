import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

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
