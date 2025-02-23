import  {useEffect, useState} from 'react';
import {  signInWithEmailAndPassword, onAuthStateChanged   } from 'firebase/auth';
import { auth } from '../Servicos/firebaseConfig';
import { useNavigate } from 'react-router-dom'
import '../Nave/Nave.css'

function Login() {

    

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              console.log(uid)
              navigate("/Painel")
    
            
              // ...
            } else {
              console.log('Não logado')
            }
          });
    }, [])

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
       
    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/painel")
            console.log(user);
           
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            
        });
       
    }

    return(
        <main className="main-login">
            <section className="seccao-login">
                <div>
                <h1 className=''>Login</h1>
                    <form action="" className='login-campo'>
                        <label htmlFor="" >E-mail</label> 
                        <input id="email-address" required className="input-text-db" type="email" name="" placeholder="exemplo@qrpet.com" onChange={(e)=>setEmail(e.target.value)}/>
                        <label htmlFor="">Senha</label>
                        <input id="password" required className="input-text-db" type="password" name="" placeholder="Senha" onChange={(e)=>setPassword(e.target.value)}/>
                        
                        <button  onClick={onLogin} type="submit" className="button-tvs">Entrar</button>

                       
                    </form>
                    
                </div>
            </section>
        </main>
    )
}

export default Login