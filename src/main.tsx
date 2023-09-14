import './index.css'

import ConfigProviderApp from "./ConfigProvider";
import React from 'react'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
        <ConfigProviderApp>
    </ConfigProviderApp>
  </React.StrictMode>,
)
