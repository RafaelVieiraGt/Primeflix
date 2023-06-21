import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from '../../services/api';
import './filme.css'
import { toast } from 'react-toastify';

function Filme(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [ filme, setFilme] = useState({});
    const [load, setLoad] = useState(true)

    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params:{
                    api_key: "8f13ee4ba8a2c02b1014bd85e258e006",
                    language: "pt-BR",
                    page: 1,
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoad(false);
            })
            .catch(()=>{
                navigate("/", { replace: true });
                return;
            })
        }
            
        loadFilme();


        return ()=>{
            console.log('COMPONENTE DESMONTADO')
        }

    }, [navigate, id])


    function salvarFilme(){
        const minhaLista = localStorage.getItem("@primeFlix");
        let filmesSalvos = JSON.parse(minhaLista) || [];


        const hasFilme = filmesSalvos.some((filmeSalvo)=> filmeSalvo.id === filme.id)

        if(hasFilme){
            toast.warn("ESSE FILME JA ESTA NA SUA LISTA!")
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeFlix", JSON.stringify(filmesSalvos))
        toast.success("FILME SALVO COM SUCESSO!")
    }

    if(load){
        return(
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        );
    }

    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}/>
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <strong>Avaliacao: {filme.vote_average} / 10</strong>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                        Trailer
                    </a>
                </button>
            </div>
        </div>
    );
}

export default Filme;
