import axios from 'axios'

const Client = ({ req }) => {
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

export default Client;

// http://ingress-nginx-controller.ingress-nginx.svc.cluster.local
// http://www.strangetrail.com