import axios from "axios";

const $host=axios.create({
    baseURL:process.env.REACT_APP_API_URL
})

const $authHost=axios.create({
    baseURL:process.env.REACT_APP_API_URL
})

const authInterceptor = (config: { headers: { authorization: string; } }) => {
  config.headers.authorization=`Bearer ${localStorage.getItem('token')}`
    return config
}

// @ts-ignore
$authHost.interceptors.request.use(authInterceptor)

export {
    $authHost,
    $host
}