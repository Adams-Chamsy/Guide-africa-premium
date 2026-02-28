import React, { useState } from 'react';
import { StarInput } from './StarRating';

const ReviewForm = ({ onSubmit }) => {
  const [auteur, setAuteur] = useState('');
  const [titre, setTitre] = useState('');
  const [note, setNote] = useState(0);
  const [noteCuisine, setNoteCuisine] = useState(0);
  const [noteService, setNoteService] = useState(0);
  const [noteAmbiance, setNoteAmbiance] = useState(0);
  const [noteRapportQualitePrix, setNoteRapportQualitePrix] = useState(0);
  const [typeVoyageur, setTypeVoyageur] = useState('');
  const [commentaire, setCommentaire] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

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
      const reviewData = {
        auteur: auteur.trim(),
        note,
        commentaire: commentaire.trim(),
      };
      if (titre.trim()) reviewData.titre = titre.trim();
      if (noteCuisine > 0) reviewData.noteCuisine = noteCuisine;
      if (noteService > 0) reviewData.noteService = noteService;
      if (noteAmbiance > 0) reviewData.noteAmbiance = noteAmbiance;
      if (noteRapportQualitePrix > 0) reviewData.noteRapportQualitePrix = noteRapportQualitePrix;
      if (typeVoyageur) reviewData.typeVoyageur = typeVoyageur;

      await onSubmit(reviewData);
      setAuteur('');
      setTitre('');
      setNote(0);
      setNoteCuisine(0);
      setNoteService(0);
      setNoteAmbiance(0);
      setNoteRapportQualitePrix(0);
      setTypeVoyageur('');
      setCommentaire('');
      setShowDetails(false);
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
        <div className="form-row">
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
            <label>Type de voyage</label>
            <select value={typeVoyageur} onChange={(e) => setTypeVoyageur(e.target.value)}>
              <option value="">Sélectionner</option>
              <option value="COUPLE">Couple</option>
              <option value="FAMILLE">Famille</option>
              <option value="AFFAIRES">Voyage d'affaires</option>
              <option value="SOLO">Solo</option>
              <option value="AMIS">Entre amis</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Titre de l'avis</label>
          <input
            type="text"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            placeholder="Résumez votre expérience en une phrase"
          />
        </div>

        <div className="form-group">
          <label>Note globale *</label>
          <StarInput value={note} onChange={setNote} />
        </div>

        <button type="button" className="btn btn-outline btn-sm" style={{ marginBottom: 16 }}
          onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'Masquer les notes détaillées' : 'Ajouter des notes détaillées'}
        </button>

        {showDetails && (
          <div className="review-detailed-ratings">
            <div className="form-group">
              <label>Cuisine</label>
              <StarInput value={noteCuisine} onChange={setNoteCuisine} />
            </div>
            <div className="form-group">
              <label>Service</label>
              <StarInput value={noteService} onChange={setNoteService} />
            </div>
            <div className="form-group">
              <label>Ambiance</label>
              <StarInput value={noteAmbiance} onChange={setNoteAmbiance} />
            </div>
            <div className="form-group">
              <label>Rapport qualité/prix</label>
              <StarInput value={noteRapportQualitePrix} onChange={setNoteRapportQualitePrix} />
            </div>
          </div>
        )}

        <div className="form-group">
          <label>Commentaire</label>
          <textarea
            value={commentaire}
            onChange={(e) => setCommentaire(e.target.value)}
            placeholder="Partagez votre expérience..."
            rows={4}
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
