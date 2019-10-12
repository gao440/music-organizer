import React, { useEffect, useState } from 'react';

function App() {
  const [ playlists, setPlaylists ] = useState([]);
  useEffect(() => {
    fetch('/playlists/bonk').then(res => res.json()).then(data => {
      setPlaylists(data.items);
      console.log(data.items);
    })
  }, []);

  return (
    <div>
      This is a test
    </div>
  );
}

export default App;
