import './Nave.css'
import {
  collection,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react"
import db from "../Servicos/firebaseConfig";
import { getAuth, onAuthStateChanged ,} from "firebase/auth";
import { signOut } from "firebase/auth";




function Painel(){

  const [mytv, setmyty] = useState([]);

  const [modals , setModal] = useState(false);
  const [modals2 , setModal2] = useState(false);
  const ref_mytv = collection(db, "tvs");


  

  const auth = getAuth();



  const handleLogout = () => {
      signOut(auth).then(() => {
        
        
        console.log("Signed out successfully")
      }).catch(() => {
        
      });
    }

  useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.Use
          buscarTVS()
          // ...
        } else {
          console.log('Não logado')
          
        }
      });
  
      handleLogout 
  
    }, []);




  async function buscarTVS() {
    const idtvmap = [];
    const umabusca = await getDocs(ref_mytv);
    umabusca.forEach((doc) => {
      idtvmap.push({ id: doc.id, ...doc.data() });
      setmyty(idtvmap);
      
    });
    console.log(idtvmap)

   
  }





  return(



    
    <div className="">
      <body>
    <header className="">
      <h1 className='text-logo'>FBDEVS</h1> <a className="btn-primary " onClick={handleLogout} href="/Login" >Sair</a>
    </header>
    

      <div className="tvs">
      <h1 className='tvs-logo'>TVS</h1>
      <button className='ad-tv' onClick={() => setModal2(!modals2)}><svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.5" d="M17.875 4.125H1.375V27.5H10.3524L8.25 31.625H11.3369L13.4379 27.5H31.625V17.875H28.875V24.75H4.125V6.875H17.875V4.125Z" fill="black"/>
<path fillRule="evenodd" clipRule="evenodd" d="M27.5 4.125H24.75V8.25H20.625V11H24.75V15.125H27.5V11H31.625V8.25H27.5V4.125Z" fill="black"/>
</svg></button>
      </div>



    
      {mytv.map((tv, index)=>{
        
        return( 
          <>
          <div className="" key={tv[index]}>
            <div className="div1">
        <p><svg width="51" height="43" viewBox="0 0 51 43" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M42.5833 3H9.25C5.79822 3 3 5.79822 3 9.25V28C3 31.4518 5.79822 34.25 9.25 34.25H42.5833C46.0351 34.25 48.8333 31.4518 48.8333 28V9.25C48.8333 5.79822 46.0351 3 42.5833 3Z" stroke="white" strokeWidth="4.16667" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M15.5 40.5H36.3333" stroke="white" strokeWidth="4.16667" strokeLinecap="round" strokeLinejoin="round"/>
</svg></p>


  
   

        <h2>{tv.id}</h2>
        <button href=""    onClick={() => setModal(!modals)}><svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.5 19.7083L22.8333 28.0417L31.1667 19.7083M43.6667 22.8333C43.6667 34.3396 34.3396 43.6667 22.8333 43.6667C11.3271 43.6667 2 34.3396 2 22.8333C2 11.3271 11.3271 2 22.8333 2C34.3396 2 43.6667 11.3271 43.6667 22.8333Z" stroke="white" strokeWidth="3.125" strokeLinecap="round" strokeLinejoin="round"/>
</svg></button>
</div>
        
        <div className={modals ? 'div2' : 'div2false'}>

          <div className="div3">
          <p>gif1</p>
          <input type="text" className='input-text-db' value={tv.gif1}  />
          <a><svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23.885 7.55554L26.163 9.15354L16.286 23.3995H14.008L8.5 15.6815L10.778 13.5565L15.147 17.6365L23.885 7.55554Z" fill="#00FF11"/>
</svg></a>
          </div>
        
        </div>
        </div>
        
      </>
) })}
        
        <div className={modals2 ? 'ad-tv-div' : 'div2false'}>
          <div className="ad-tv-div2">
            <h1>CRIAR NOVA TV</h1>
            <h2>NOME DA TV</h2>
            <input type="text" className='input-text-db' />
            <button className='button-tvs'>CRIAR</button>
            <button className='button-tvs' onClick={() => setModal2(!modals2)}>fechar</button>
          </div>
        </div>
  

    </body>
    </div>
  );
}
export default Painel