import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaExchangeAlt, FaTimesCircle } from 'react-icons/fa';
import './game.css';
import RepoCard from './RepoCard';

interface GameProps {
    repoState: [Repo[], React.Dispatch<React.SetStateAction<Repo[]>>];
    originalList: Repo[];
    setShowGame: React.Dispatch<React.SetStateAction<boolean>>;
}

const Game: React.FC<GameProps> = ({
    repoState,
    originalList,
    setShowGame,
}) => {
    const [repos, setRepos] = repoState;
    const [over, setOver] = useState<boolean>(false);
    const [repo1, setRepo1] = useState<Repo | null>(null);
    const [repo2, setRepo2] = useState<Repo | null>(null);
    const [correct, setCorrect] = useState<number>(0);
    const [wrong, setWrong] = useState<number>(0);

    const randomSelect = (arr: Repo[]) => {
        if (arr.length < 2) {
            setRepos(originalList);
            setOver(true);
            return;
        }
        const generateRandom = () => Math.floor(Math.random() * arr.length);
        const randomIndex1 = generateRandom();
        let randomIndex2 = generateRandom();

        while (randomIndex1 === randomIndex2) {
            randomIndex2 = generateRandom();
        }

        const randomRepo1 = arr[randomIndex1];
        const randomRepo2 = arr[randomIndex2];

        const updatedArray = arr.filter(
            (repo) => repo.id !== randomRepo1.id && repo.id !== randomRepo2.id
        );

        setRepo1(randomRepo1);
        setRepo2(randomRepo2);
        setRepos(updatedArray);
    };

    useEffect(() => {
        randomSelect(repos);
    }, []);

    const handleChoice = (r: Repo) => {
        const choosenRepo = r.id === repo1?.id ? repo1 : repo2;
        const winner =
            repo1?.stargazers_count! > repo2?.stargazers_count! ? repo1 : repo2;

        if (choosenRepo?.id === winner?.id) {
            setCorrect((prev) => prev + 1);
        } else {
            setWrong((prev) => prev + 1);
        }
        randomSelect(repos);
    };

    return (
        <div className='game'>
            {over ? (
                <div className='score'></div>
            ) : (
                repo1 &&
                repo2 && (
                    <div className='repos'>
                        <h1 className='title'>Choose the Repo with most stars</h1>
                        <div className='container'>
                            <RepoCard content={repo1} handler={handleChoice} />

                            <div className="result correct">
                                <p>{correct}</p>
                                <FaCheckCircle />
                            </div>
                            <div className='dashboard'>
                                <FaExchangeAlt className='icon-versus' />
                            </div>
                            <div className="result wrong">
                                <p>{wrong}</p>
                                <FaTimesCircle />
                            </div>
                            <RepoCard content={repo2} handler={handleChoice} />
                        </div>
                    </div>
                )
            )}
            <div className='buttons'>
                <button
                    type='submit'
                    className='button gradient alternate'
                    onClick={() => setShowGame(false)}>
                    {over ? 'Play Again' : 'Back'}
                </button>
                {!over && (
                    <button
                        type='submit'
                        className='button gradient'
                        onClick={() => randomSelect(repos)}>
                        Skip
                    </button>
                )}
            </div>
        </div>
    );
};

export default Game;
