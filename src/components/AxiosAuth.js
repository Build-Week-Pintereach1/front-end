import axios from 'axios';

export const axiosWithAuth = (url) => {
    const token = window.localStorage.getItem('pintereachAuth');
        return axios.create({
            headers:{
                'Content-Type': 'application/json',
                'authorization': `${token}`,

            },
            baseURL: 'https://pintereach1.herokuapp.com/api/'
        })
}

