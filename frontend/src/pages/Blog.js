import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiClock, FiEye, FiArrowRight } from 'react-icons/fi';
import { blogApi } from '../api/apiClient';
import usePageTitle from '../hooks/usePageTitle';
import SEOHead from '../components/SEOHead';

const Blog = () => {
  usePageTitle('Magazine');
  const [articles, setArticles] = useState([]);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [categorie, setCategorie] = useState('');

  const categories = [
    { value: '', label: 'Toutes' },
    { value: 'GASTRONOMIE', label: 'Gastronomie' },
    { value: 'VOYAGE', label: 'Voyage' },
    { value: 'INTERVIEW', label: 'Interviews' },
    { value: 'GUIDE', label: 'Guides' },
    { value: 'CULTURE', label: 'Culture' },
  ];

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const params = { page, size: 9 };
        if (categorie) params.categorie = categorie;
        const [articlesRes, popularRes] = await Promise.all([
          blogApi.getAll(params),
          page === 0 ? blogApi.getPopular() : Promise.resolve(null),
        ]);
        setArticles(articlesRes.data.content || articlesRes.data);
        setTotalPages(articlesRes.data.totalPages || 1);
        if (popularRes) setPopular(popularRes.data);
      } catch (err) {
        // silently handle
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [page, categorie]);

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  };

  return (
    <>
      <SEOHead title="Blog" description="Articles et actualités gastronomiques" />
      <div className="blog-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="page-header" style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="luxury-subtitle">Le Magazine</span>
            <h1 className="section-title" style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem' }}>
              Guide Africa Magazine
            </h1>
            <p style={{ color: 'var(--ivory-muted)', maxWidth: 600, margin: '12px auto 0' }}>
              Articles, interviews et guides pour d\u00e9couvrir l'excellence culinaire africaine
            </p>
          </div>

          {/* Categories Filter */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 40, flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button
                key={cat.value}
                onClick={() => { setCategorie(cat.value); setPage(0); }}
                className={categorie === cat.value ? 'btn btn-primary btn-sm' : 'btn btn-secondary btn-sm'}
                style={{ borderRadius: 50, padding: '8px 20px', fontSize: '0.8rem', letterSpacing: '0.05em' }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Featured Article (first from popular) */}
          {popular.length > 0 && page === 0 && !categorie && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Link to={'/blog/' + popular[0].slug} style={{ textDecoration: 'none' }}>
                <div style={{
                  display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0,
                  background: 'var(--bg-card)', border: '1px solid var(--glass-border)',
                  borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: 48,
                }}>
                  <div style={{
                    height: 360, backgroundImage: `url(${popular[0].imageCouverture || '/placeholder.jpg'})`,
                    backgroundSize: 'cover', backgroundPosition: 'center'
                  }} />
                  <div style={{ padding: 48, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <span className="luxury-subtitle">\u00c0 la une</span>
                    <h2 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--ivory)', fontSize: '1.6rem', margin: '8px 0 16px', lineHeight: 1.3 }}>
                      {popular[0].titre}
                    </h2>
                    <p style={{ color: 'var(--ivory-muted)', lineHeight: 1.7, fontSize: '0.9rem' }}>
                      {popular[0].extrait}
                    </p>
                    <div style={{ marginTop: 20, display: 'flex', gap: 16, color: 'var(--ivory-subtle)', fontSize: '0.8rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><FiClock size={14} /> {formatDate(popular[0].datePublication)}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><FiEye size={14} /> {popular[0].vues} vues</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          {/* Articles Grid */}
          {loading ? (
            <div className="page-loading"><div className="loading-spinner"></div></div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}>
              {articles.map((article, idx) => (
                <motion.div
                  key={article.id || idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link to={'/blog/' + article.slug} style={{ textDecoration: 'none' }}>
                    <div className="blog-card">
                      <img
                        src={article.imageCouverture || '/placeholder.jpg'}
                        alt={article.titre}
                        className="blog-card-image"
                        loading="lazy"
                      />
                      <div className="blog-card-content">
                        <div className="blog-card-category">{article.categorie}</div>
                        <h3 className="blog-card-title">{article.titre}</h3>
                        <p className="blog-card-excerpt">{article.extrait}</p>
                        <div className="blog-card-meta">
                          <span>{formatDate(article.datePublication)}</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><FiEye size={13} /> {article.vues}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 40 }}>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={page === i ? 'btn btn-primary btn-sm' : 'btn btn-secondary btn-sm'}
                  style={{ minWidth: 40, borderRadius: '50%' }}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default Blog;
