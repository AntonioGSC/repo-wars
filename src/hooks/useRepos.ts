import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const fetchRepos = async (amount: number, setters: Dispatch<SetStateAction<any[]>>[]) => {
    const res = await {data: ['repo1', 'repo2']}
    setters.forEach(setter => setter(res.data))
}

const useRepos = (amount: number) => {
    // cria um estado para todos os repositorios
    const [allRepositories, setAllRepositories] = useState<any>([])
    // cria um estado para os repositorios
    const [repositories, setRepositories] = useState<any>([])
    // useEffect para recuperar os repositorios 
    useEffect(() => {
        fetchRepos(amount, [setAllRepositories, setRepositories])
    }, [])
    // retorna [repositories, setRepositories, allRepositories]
    return [repositories, setRepositories, allRepositories]
}

export default useRepos;