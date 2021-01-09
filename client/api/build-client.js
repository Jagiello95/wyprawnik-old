import axios from 'axios'

export default ({ req }) => {
    if (typeof window === 'undefined') {
        //server
        return axios.create({
            baseURL: 'http://www.strangetrail.com',
            headers: req.headers        
        });
    } else {
        //browser
        return axios.create({
            baseURL: '/'
        })
    }
}