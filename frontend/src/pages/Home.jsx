import React from 'react';

import Navbar from '../components/Navbar';

function Home() {
  return (
    <div>
     
      {/* Aquí puedes agregar tu texto de presentación */}
      <div className="presentation-text">
        <h1>¡Bienvenido a mi sitio web!</h1>
        <p>Este es un espacio para presentar información </p>
        {/* ... más contenido de presentación ... */}
      </div>
    </div>
  );
}

export default Home;