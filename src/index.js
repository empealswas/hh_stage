// scroll bar
import 'simplebar/src/simplebar.css';

import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';

//
import App from './App';
import * as serviceWorker from './serviceWorker';
import reportWebVitals from './reportWebVitals';
import './global.css'
import 'react-pdf/dist/umd/Page/AnnotationLayer.css';

import {pdfjs} from 'react-pdf';
import {Provider} from "react-redux";
import {store} from "./store/store";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
// ----------------------------------------------------------------------

ReactDOM.render(
    <Provider store={store}>
        <HelmetProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </HelmetProvider>
    </Provider>,
    document.getElementById('root')
)
;

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
