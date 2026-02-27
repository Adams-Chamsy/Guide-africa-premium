import React, { useState } from 'react';
import { StarInput } from './StarRating';

const ReviewForm = ({ onSubmit }) => {
  const [auteur, setAuteur] = useState('');
  const [note, setNote] = useState(0);
  const [commentaire, setCommentaire] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!auteur.trim()) {
      setError('Veuillez entrer votre nom.');
      return;
    }
    if (note === 0) {
      setError('Veuillez donner une note.');
      return;
    }

    setLoading(true);
    try {
      await onSubmit({ auteur: auteur.trim(), note, commentaire: commentaire.trim() });
      setAuteur('');
      setNote(0);
      setCommentaire('');
    } catch (err) {
      setError('Erreur lors de l\'envoi de l\'avis.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="review-form">
      <h3>Laisser un avis</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Votre nom *</label>
          <input
            type="text"
            value={auteur}
            onChange={(e) => setAuteur(e.target.value)}
            placeholder="Ex: Jean D."
          />
        </div>
        <div className="form-group">
          <label>Note *</label>
          <StarInput value={note} onChange={setNote} />
        </div>
        <div className="form-group">
          <label>Commentaire</label>
          <textarea
            value={commentaire}
            onChange={(e) => setCommentaire(e.target.value)}
            placeholder="Partagez votre expérience..."
            rows={3}
          />
        </div>
        {error && <p className="form-error">{error}</p>}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Envoi...' : 'Publier l\'avis'}
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
