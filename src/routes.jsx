import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyTV from './tvs/index'
import Painel from './Nave/Index';
import Login from './login/Index';


function RoutesApp(){
    return(
        <Router>

        <Routes>

            <Route path="/MyTV/:id" element = {<MyTV/>}/>
            <Route path="/Painel" element = {<Painel/>}/>
            <Route path="/Login" element = {<Login/>}/>
        </Routes>
        
        </Router>
    )
}
export default RoutesApp