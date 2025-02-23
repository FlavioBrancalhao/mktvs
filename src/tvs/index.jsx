import { useEffect, useState } from "react";
import Tempo from "../Tempo/Tempo";
import Noticia from "../Noticia/Noticia";
import db from "../Servicos/firebaseConfig";
import { onSnapshot, collection, doc } from "firebase/firestore";
import { useParams } from "react-router-dom";

const App = () => {
  const { id } = useParams();
  const ref_mytv = collection(db, "tvs");

  const [mensagem, setMensagem] = useState(null);
  const [gif1, setGif1] = useState(null);
  const [gif2, setGif2] = useState(null);
  const [gif3, setGif3] = useState(null);
  const [gif4, setGif4] = useState(null);
  const [gif5, setGif5] = useState(null);
  const [gif6, setGif6] = useState(null);
  const [gif7, setGif7] = useState(null);
  const [gif8, setGif8] = useState(null);
  const [gif9, setGif9] = useState(null);
  const [gif10, setGif10] = useState(null);
  

  useEffect(() => {
    if (!id) return;

    const db_mytv = doc(ref_mytv, id);

    const unsubscribe = onSnapshot(db_mytv, (QuerySnapshot) => {
      if (QuerySnapshot.exists()) {
        const data = { id: QuerySnapshot.id, ...QuerySnapshot.data() };
        console.log("Dados recebidos do Firestore:", data);
        setMensagem(data);
      } else {
        console.log("Documento não encontrado!");
      }
    });

    return () => unsubscribe();
  }, [id]);

  useEffect(() => {
    if (mensagem) {

      console.log("Mensagem recebida:", mensagem);
      setGif1(mensagem?.gif1 || null);
      setGif2(mensagem?.gif2 || null);
      setGif3(mensagem?.gif3 || null);
      setGif4(mensagem?.gif4 || null);
      setGif5(mensagem?.gif5 || null);
      setGif6(mensagem?.gif6 || null);
      setGif7(mensagem?.gif7 || null);
      setGif8(mensagem?.gif8 || null);
      setGif9(mensagem?.gif9 || null);
      setGif10(mensagem?.gif10 || null);
     
    }
    
  }, [mensagem]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const videos = [
    { type: gif1 === null ? null : "gif", src: gif1 },
    { type: gif2 === null ? null : "gif", src: gif2 },
    { type: gif3 === null ? null : "gif", src: gif3 },
    { type: gif4 === null ? null : "gif", src: gif4 },
    { type: gif5 === null ? null : "gif", src: gif5 },
    { type: gif6 === null ? null : "gif", src: gif6 },
    { type: gif7 === null ? null : "gif", src: gif7},
    { type: gif8 === null ? null : "gif", src: gif8 },
    { type: gif9 === null ? null : "gif", src: gif9 },
    { type: gif10 === null ? null : "gif", src: gif10 },
    { type: "tempo" },
    { type: "gif", src: '../../public/gif7.gif' },
    { type: "noticia" },
];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let time = videos[currentIndex]?.type === null ? -1 : 10000;

    const interval = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, time);

    return () => clearTimeout(interval);
  }, [currentIndex, videos]);

  const renderMedia = (media) => {
    if (media.type === "gif") {
      return (
        <img
          key={media.src}
          src={media.src}
          alt="GIF"
          className="w-full h-full object-cover"
        />
      );
    } else if (media.type === "tempo") {
      return <Tempo />;
    } else if (media.type === "noticia") {
      return <Noticia />;
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center overflow-hidden bg-black">
      <div className="absolute inset-0 w-full h-full">
        {renderMedia(videos[currentIndex])}
      </div>
    </div>
  );
};

export default App;
