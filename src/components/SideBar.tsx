import { useCallback, useEffect, useState } from "react";

import { api } from "../services/api";

import { Button } from "./Button";

import '../styles/sidebar.scss';

interface SideBarProps {
  selectedGenre: Genre
  onSelectGenre: (genre: Genre) => void
}

export interface Genre {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function SideBar({ selectedGenre, onSelectGenre }: SideBarProps) {
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    api.get<Genre[]>('genres').then(response => {
      setGenres(response.data);
      handleSelectGenre(response.data[0] ?? {} as Genre)
    });
  }, []);

  const handleSelectGenre = useCallback((genre: Genre) => onSelectGenre(genre), [])

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleSelectGenre(genre)}
            selected={selectedGenre.id === genre.id}
          />
        ))}
      </div>
    </nav>
  )
}