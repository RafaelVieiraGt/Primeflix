//Base da URL:  https://api.themoviedb.org/3/
//URL da Api: https://api.themoviedb.org/3/movie/now_playing?api_key=8f13ee4ba8a2c02b1014bd85e258e006&language=pt-BR
import axios from "axios";

const api = axios.create({
    baseURL: ' https://api.themoviedb.org/3/'

});

export default api;
