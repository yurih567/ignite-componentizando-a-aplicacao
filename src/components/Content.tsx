import { useEffect, useState } from "react";

import { api } from "../services/api";

import { Genre } from "./SideBar";

import { MovieCard } from "./MovieCard";

import '../styles/content.scss';

interface ContentProps {
  selectedGenre: Genre
}

interface Movie {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function Content({ selectedGenre }: ContentProps) {
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    if (!selectedGenre.id) return

    api.get<Movie[]>(`movies/?Genre_id=${selectedGenre.id}`).then(response => {
      setMovies(response.data);
    });
  }, [selectedGenre.id]);

  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  )
}