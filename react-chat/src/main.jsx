import React from 'react'
import ReactDOM from 'react-dom/client'
import './main.css'
import {App} from "./app.jsx";

import {ThemeProvider} from "./hooks/darkmode";


ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
    <ThemeProvider>
    <App/>
    </ThemeProvider>
</React.StrictMode>

)
