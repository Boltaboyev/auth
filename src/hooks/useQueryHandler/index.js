import {useQuery} from "@tanstack/react-query"
import {useAxios} from "../useAxios"

export const useQueryHandler = ({pathname, url, params}) => {
    const axios = useAxios()
    return useQuery([pathname], () => axios({url, params}).then((data) => data))
}

