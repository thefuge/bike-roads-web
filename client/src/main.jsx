import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import './components/assets/style.css'

createRoot(document.getElementById('root')).render(
    <App />
)
