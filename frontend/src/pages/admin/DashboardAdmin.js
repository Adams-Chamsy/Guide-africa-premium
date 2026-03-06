import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminApi } from '../../api/apiClient';
import { useToast } from '../../context/ToastContext';
import Breadcrumbs from '../../components/Breadcrumbs';
import { SkeletonDetail } from '../../components/Skeleton';
import usePageTitle from '../../hooks/usePageTitle';
import SEOHead from '../../components/SEOHead';
import ScrollReveal from '../../components/ScrollReveal';
import AnimatedCounter from '../../components/AnimatedCounter';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const CHART_COLORS = ['#C9A84C', '#1B6B4A', '#D4AF37', '#2D8B5C', '#F5F0E8', '#8B7355'];

const DashboardAdmin = () => {
  usePageTitle('Dashboard Admin');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await adminApi.getStats();
      setStats(response.data);
    } catch (err) {
      showToast('Erreur lors du chargement des statistiques', 'error');
    } finally {
      setLoading(false);
    }
  };

  const statCards = stats ? [
    { label: 'Utilisateurs', value: stats.totalUtilisateurs, icon: '\uD83D\uDC65', color: '#1B6B4A' },
    { label: 'Restaurants', value: stats.totalRestaurants, icon: '\uD83C\uDF7D\uFE0F', color: '#C9A84C' },
    { label: 'Hôtels', value: stats.totalHotels, icon: '\uD83C\uDFE8', color: '#2D8B5C' },
    { label: 'Avis', value: stats.totalAvis, icon: '\u2B50', color: '#D4AF37' },
    { label: 'Réservations', value: stats.totalReservations, icon: '\uD83D\uDCC5', color: '#8B7355' },
    { label: 'En attente', value: stats.reservationsEnAttente, icon: '\u23F3', color: '#C9A84C' },
    { label: 'Confirmées', value: stats.reservationsConfirmees, icon: '\u2705', color: '#1B6B4A' },
    { label: 'Actifs', value: stats.utilisateursActifs, icon: '\uD83D\uDFE2', color: '#2D8B5C' },
  ] : [];

  const barData = stats ? [
    { name: 'Utilisateurs', value: stats.totalUtilisateurs || 0 },
    { name: 'Restaurants', value: stats.totalRestaurants || 0 },
    { name: 'Hôtels', value: stats.totalHotels || 0 },
    { name: 'Avis', value: stats.totalAvis || 0 },
    { name: 'Réservations', value: stats.totalReservations || 0 },
  ] : [];

  const pieData = stats ? [
    { name: 'En attente', value: stats.reservationsEnAttente || 0 },
    { name: 'Confirmées', value: stats.reservationsConfirmees || 0 },
    { name: 'Autres', value: Math.max(0, (stats.totalReservations || 0) - (stats.reservationsEnAttente || 0) - (stats.reservationsConfirmees || 0)) },
  ].filter(d => d.value > 0) : [];

  return (
    <div className="page-container admin-page">
      <SEOHead title="Dashboard Admin — Guide Africa Premium" />
      <Breadcrumbs items={[
        { label: 'Accueil', to: '/' },
        { label: 'Administration' },
      ]} />

      <ScrollReveal>
        <div className="page-header">
          <span className="luxury-label">Espace administrateur</span>
          <h2 className="luxury-title">Dashboard Administration</h2>
        </div>
      </ScrollReveal>

      {loading ? (
        <SkeletonDetail />
      ) : (
        <>
          <ScrollReveal delay={0.1}>
            <div className="admin-stat-grid">
              {statCards.map((card) => (
                <div key={card.label} className="admin-stat-card" style={{ borderTop: `3px solid ${card.color}` }}>
                  <span className="admin-stat-icon">{card.icon}</span>
                  <span className="admin-stat-number">
                    <AnimatedCounter end={card.value ?? 0} />
                  </span>
                  <span className="admin-stat-label">{card.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Charts section */}
          <div className="admin-charts" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 24, margin: '32px 0' }}>
            <ScrollReveal delay={0.2}>
              <div className="card" style={{ padding: 24 }}>
                <h3 style={{ marginBottom: 16, color: 'var(--ivory)' }}>Vue d'ensemble</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(245,240,232,0.1)" />
                    <XAxis dataKey="name" stroke="var(--ivory-subtle)" fontSize={12} />
                    <YAxis stroke="var(--ivory-subtle)" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--gold)',
                        borderRadius: 8,
                        color: 'var(--ivory)',
                      }}
                    />
                    <Bar dataKey="value" fill="var(--gold)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </ScrollReveal>

            {pieData.length > 0 && (
              <ScrollReveal delay={0.3}>
                <div className="card" style={{ padding: 24 }}>
                  <h3 style={{ marginBottom: 16, color: 'var(--ivory)' }}>Répartition des réservations</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry) => (
                          <Cell key={entry.name} fill={CHART_COLORS[pieData.indexOf(entry) % CHART_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          background: 'var(--bg-card)',
                          border: '1px solid var(--gold)',
                          borderRadius: 8,
                          color: 'var(--ivory)',
                        }}
                      />
                      <Legend wrapperStyle={{ color: 'var(--ivory-subtle)' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </ScrollReveal>
            )}
          </div>

          <ScrollReveal delay={0.4}>
            <div className="admin-actions">
              <Link to="/admin/utilisateurs" className="btn btn-primary">
                Gérer utilisateurs
              </Link>
              <Link to="/admin/avis" className="btn btn-primary">
                Modérer avis
              </Link>
              <Link to="/admin/reservations" className="btn btn-primary">
                Gérer réservations
              </Link>
            </div>
          </ScrollReveal>
        </>
      )}
    </div>
  );
};

export default DashboardAdmin;
