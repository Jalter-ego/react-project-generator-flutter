import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import App from "./App";
import Projects from "./pages/proyects";

export function Router(){
    return(
        <Routes>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/projects" element={<Projects/>}/>
            <Route path="/projects/:id" element={<App/>}/>
        </Routes>
    )
}