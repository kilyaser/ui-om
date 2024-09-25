import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './app/App'
import './app/styles/index.scss'
import "./shared/config/i18n/i18n";
import {StoreProvider} from "./app/providers/StoreProvider";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <StoreProvider>
          <App/>
      </StoreProvider>
  </StrictMode>,
)
