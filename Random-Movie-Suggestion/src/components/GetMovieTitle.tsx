// import dotenv from 'dotenv';
// dotenv.config();

import { useState } from "react";

interface MovieData {
  title: string;
  plot: string;
}


// const apiKey = process.env.OMDB_API_KEY;
// const apiUrl  = `http://www.omdbapi.com/?apikey=${apiKey}&`;



function GetMovieTitle () {


	
	const [randomMovie, setRandomMovie] = useState<MovieData | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const getRandomMovie = async () => {
		if (isLoading) return;
		setIsLoading (true);

		try {
			const response = await fetch(apiUrl);
			if(!response.ok) {
				throw new Error ('Failed to fetch movie data')
			}
			const data = await response.json();
			setRandomMovie({
				title: data.Title,
				plot: data.Plot
			})
		}catch (error){
			console.error('Error fetching data:', error);
		} finally {
			setIsLoading(false);
		}
	}


	return (
    <>
      <h2>Random Movie Generator</h2>
      <h4>Can't decide which movie to watch?</h4>
      <button onClick={getRandomMovie} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Generate Random Movie'}
      </button>

      {randomMovie && ( // Render only if randomMovie is not null
        <div>
          <h3>Title: {randomMovie.title}</h3>
          <p>Plot: {randomMovie.plot}</p>
        </div>
      )}
    </>
  );
}

export default GetMovieTitle;