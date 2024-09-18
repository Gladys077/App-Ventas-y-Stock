import { BrowserRouter as Router } from "react-router-dom";
//import './App.css'
import { Suspense } from "react";
import { appRouter as AppRouter } from "./router";
import{loader as Loader} from './loader'

function App(){

    return(
    <Router>
            <Suspense fallback={<Loader/>}>
            <AppRouter/>
            </Suspense>
    </Router>
    )
}