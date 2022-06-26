import { useCallback, useState } from 'react';

import { Genre, SideBar } from './components/SideBar';
import { Content } from './components/Content';

import './styles/global.scss';

export function App() {
  const [selectedGenre, setSelectedGenre] = useState<Genre>({} as Genre);

  const onSelectGenre = useCallback((genre: Genre) => setSelectedGenre(genre), [])

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar
        selectedGenre={selectedGenre}
        onSelectGenre={onSelectGenre}
      />

      <Content selectedGenre={selectedGenre} />
    </div>
  )
}