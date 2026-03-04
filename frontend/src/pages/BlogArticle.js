import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FiClock, FiEye, FiArrowLeft, FiShare2 } from 'react-icons/fi';
import { blogApi } from '../api/apiClient';
import usePageTitle from '../hooks/usePageTitle';

const BlogArticle = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  usePageTitle(article?.titre || 'Article');

  useEffect(() => {
    const load = async () => {
      try {
        const res = await blogApi.getBySlug(slug);
        setArticle(res.data);
      } catch (err) {
        // handle error
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: article.titre, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) return <div className="page-loading"><div className="loading-spinner"></div></div>;
  if (!article) return <div style={{ textAlign: 'center', padding: 80, color: 'var(--ivory-muted)' }}>Article introuvable</div>;

  return (
    <>
      <Helmet>
        <title>{article.titre} — Guide Africa Magazine</title>
        <meta property="og:title" content={article.titre} />
        <meta property="og:description" content={article.extrait} />
        {article.imageCouverture && <meta property="og:image" content={article.imageCouverture} />}
        <meta property="og:type" content="article" />
      </Helmet>

      <motion.article
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{ maxWidth: 780, margin: '0 auto' }}
      >
        <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--gold)', textDecoration: 'none', marginBottom: 24, fontSize: '0.85rem' }}>
          <FiArrowLeft /> Retour au magazine
        </Link>

        <span className="luxury-subtitle">{article.categorie}</span>

        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.4rem', color: 'var(--ivory)', lineHeight: 1.2, margin: '8px 0 24px' }}>
          {article.titre}
        </h1>

        <div style={{ display: 'flex', gap: 20, color: 'var(--ivory-subtle)', fontSize: '0.85rem', marginBottom: 32, alignItems: 'center' }}>
          <span>{article.auteur}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><FiClock size={14} /> {formatDate(article.datePublication)}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><FiEye size={14} /> {article.vues} vues</span>
          <button onClick={handleShare} style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto' }}>
            <FiShare2 size={16} /> Partager
          </button>
        </div>

        {article.imageCouverture && (
          <div style={{ borderRadius: 'var(--radius)', overflow: 'hidden', marginBottom: 40 }}>
            <img src={article.imageCouverture} alt={article.titre} style={{ width: '100%', height: 420, objectFit: 'cover' }} />
          </div>
        )}

        <div
          className="drop-cap"
          style={{
            fontFamily: 'var(--font-accent)', fontSize: '1.1rem', lineHeight: 1.9,
            color: 'var(--ivory-muted)', whiteSpace: 'pre-wrap'
          }}
        >
          {article.contenu}
        </div>

        <div className="section-divider" style={{ margin: '48px auto' }}>
          <span className="divider-icon">◆</span>
        </div>
      </motion.article>
    </>
  );
};

export default BlogArticle;
