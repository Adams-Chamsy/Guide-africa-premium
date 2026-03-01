import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log error silently in production
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught:', error, errorInfo);
    }
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0A0A0A',
          color: '#F5F0E8',
          fontFamily: 'Inter, sans-serif',
          padding: '2rem',
        }}>
          <div style={{
            textAlign: 'center',
            maxWidth: '500px',
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚠️</div>
            <h1 style={{
              fontFamily: 'Playfair Display, serif',
              color: '#C9A84C',
              fontSize: '2rem',
              marginBottom: '1rem',
            }}>
              Oups, une erreur est survenue
            </h1>
            <p style={{
              color: 'rgba(245, 240, 232, 0.7)',
              marginBottom: '2rem',
              lineHeight: '1.6',
            }}>
              L'application a rencontré un problème inattendu.
              Veuillez rafraîchir la page ou revenir à l'accueil.
            </p>
            <button
              onClick={this.handleReload}
              style={{
                backgroundColor: '#C9A84C',
                color: '#0A0A0A',
                border: 'none',
                padding: '0.75rem 2rem',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'opacity 0.2s',
              }}
              onMouseOver={(e) => e.target.style.opacity = '0.9'}
              onMouseOut={(e) => e.target.style.opacity = '1'}
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node,
};

export default ErrorBoundary;
