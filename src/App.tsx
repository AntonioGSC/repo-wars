import React, { useState } from 'react'
import './app.css'
import { Game } from './components';
import { useRepos } from './hooks';

const App = () => {
    const [showGame, setShowGame] = useState<boolean>(false);
    // const [repos, setRepos] = useState(['repo1']); //useRepos
    const [repos, setRepos, allRepos] = useRepos(100);

    const handleStartClick = () => {
        setShowGame(true);
    }

    return (    
        <main>
            {!showGame && (
                <>
                    <h1 className='title'>Welcome to RepoWars!</h1>
                    <h2 className='headline gradient text'>A developer-driver gessing game</h2>
                    {repos.length === 0 ? (
                        <p className='loading'>
                            Loading Game...
                        </p>
                    ) : (
                        <button
                            className='button gradient'
                            type='submit'
                            onClick={handleStartClick}>Start
                        </button>
                    )}
                </>
            )}
            {showGame && (
                <Game 
                    repoState={[repos, setRepos]}
                    originalList={allRepos}
                    setShowGame={setShowGame}
                />
            )}
        </main>
    );
}

export default App