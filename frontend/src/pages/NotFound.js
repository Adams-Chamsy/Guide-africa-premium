import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2>Page introuvable</h2>
      <p>
        La page que vous cherchez n'existe pas ou a &eacute;t&eacute; d&eacute;plac&eacute;e.
      </p>
      <Link to="/" className="btn btn-primary">
        Retour &agrave; l'accueil
      </Link>
    </div>
  );
};

export default NotFound;
