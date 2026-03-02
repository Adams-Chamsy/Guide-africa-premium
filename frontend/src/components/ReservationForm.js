import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { reservationApi } from '../api/apiClient';
import PropTypes from 'prop-types';

const ReservationForm = ({ type, establishmentId, establishmentName }) => {
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState({
    date: today,
    heure: '19:00',
    dateCheckIn: today,
    dateCheckOut: '',
    nombrePersonnes: 2,
    nombreChambres: 1,
    telephone: '',
    email: user ? user.email : '',
    notesSpeciales: '',
  });

  const timeSlots = [];
  for (let h = 11; h <= 22; h++) {
    timeSlots.push(`${String(h).padStart(2, '0')}:00`);
    if (h < 22) {
      timeSlots.push(`${String(h).padStart(2, '0')}:30`);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const data = {
        type,
        etablissementId: establishmentId,
        nombrePersonnes: parseInt(form.nombrePersonnes),
        telephone: form.telephone,
        email: form.email,
        notesSpeciales: form.notesSpeciales || null,
      };

      if (type === 'RESTAURANT') {
        data.dateReservation = form.date;
        data.heureReservation = form.heure;
      } else {
        data.dateCheckIn = form.dateCheckIn;
        data.dateCheckOut = form.dateCheckOut;
        data.nombreChambres = parseInt(form.nombreChambres);
      }

      await reservationApi.create(data);
      showToast('Réservation envoyée avec succès !', 'success');

      setForm({
        date: today,
        heure: '19:00',
        dateCheckIn: today,
        dateCheckOut: '',
        nombrePersonnes: 2,
        nombreChambres: 1,
        telephone: '',
        email: user ? user.email : '',
        notesSpeciales: '',
      });
    } catch (err) {
      const message = err.response?.data?.message || 'Erreur lors de la réservation. Veuillez réessayer.';
      showToast(message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="reservation-form">
        <div className="reservation-login-prompt">
          <h3>Réservation</h3>
          <p>Connectez-vous pour réserver chez <strong>{establishmentName}</strong>.</p>
          <Link to="/connexion" className="btn btn-primary">Se connecter</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="reservation-form">
      <h3 className="reservation-form-title">
        Réserver chez {establishmentName}
      </h3>

      <form onSubmit={handleSubmit}>
        {type === 'RESTAURANT' ? (
          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                min={today}
                required
              />
            </div>
            <div className="form-group">
              <label>Heure</label>
              <select name="heure" value={form.heure} onChange={handleChange} required>
                {timeSlots.map(slot => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          <>
            <div className="form-row">
              <div className="form-group">
                <label>Date d'arrivée</label>
                <input
                  type="date"
                  name="dateCheckIn"
                  value={form.dateCheckIn}
                  onChange={handleChange}
                  min={today}
                  required
                />
              </div>
              <div className="form-group">
                <label>Date de départ</label>
                <input
                  type="date"
                  name="dateCheckOut"
                  value={form.dateCheckOut}
                  onChange={handleChange}
                  min={form.dateCheckIn || today}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Nombre de chambres</label>
                <input
                  type="number"
                  name="nombreChambres"
                  value={form.nombreChambres}
                  onChange={handleChange}
                  min="1"
                  max="10"
                  required
                />
              </div>
              <div className="form-group">
                <label>Nombre de personnes</label>
                <input
                  type="number"
                  name="nombrePersonnes"
                  value={form.nombrePersonnes}
                  onChange={handleChange}
                  min="1"
                  max="20"
                  required
                />
              </div>
            </div>
          </>
        )}

        {type === 'RESTAURANT' && (
          <div className="form-group">
            <label>Nombre de personnes</label>
            <input
              type="number"
              name="nombrePersonnes"
              value={form.nombrePersonnes}
              onChange={handleChange}
              min="1"
              max="20"
              required
            />
          </div>
        )}

        <div className="form-row">
          <div className="form-group">
            <label>Téléphone</label>
            <input
              type="tel"
              name="telephone"
              value={form.telephone}
              onChange={handleChange}
              placeholder="+225 XX XX XX XX"
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="votre@email.com"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Notes spéciales</label>
          <textarea
            name="notesSpeciales"
            value={form.notesSpeciales}
            onChange={handleChange}
            rows={3}
            placeholder="Allergies, occasions spéciales, préférences..."
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Envoi en cours...' : 'Confirmer la réservation'}
        </button>
      </form>
    </div>
  );
};

ReservationForm.propTypes = {
  type: PropTypes.string,
  establishmentId: PropTypes.number,
  establishmentName: PropTypes.string,
};

export default ReservationForm;
