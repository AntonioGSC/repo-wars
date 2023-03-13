import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { githubClient } from '../api';

type UseReposReturnType = [
    repositories: Repo[],
    setRepositories: Dispatch<SetStateAction<Repo[]>>,
    allRepos: Repo[],
]

const randomSince = Math.floor(Math.random() * 1000000);

const fetchRepos = async (amount: number, setters: Dispatch<SetStateAction<any[]>>[]) => {
    const res = await githubClient.request('GET /search/repositories', {
        q: `is:public starts:>1000 fork:false`,
        sort: 'stars',
        order: 'desc',
        per_page: amount,
        since: randomSince,
        page: 1,
    })
    setters.forEach(setter => setter(res.data.items))
}

const useRepos = (amount: number) : UseReposReturnType => {
    // cria um estado para todos os repositorios
    const [allRepositories, setAllRepositories] = useState<Repo[]>([])
    // cria um estado para os repositorios
    const [repositories, setRepositories] = useState<Repo[]>([])
    // useEffect para recuperar os repositorios 
    useEffect(() => {
        fetchRepos(amount, [setAllRepositories, setRepositories])
    }, [])
    // retorna [repositories, setRepositories, allRepositories]
    return [repositories, setRepositories, allRepositories]
}

export default useRepos;