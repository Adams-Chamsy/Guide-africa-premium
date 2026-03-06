import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiMessageCircle, FiImage, FiSend, FiTrash2 } from 'react-icons/fi';
import { socialApi } from '../api/apiClient';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import usePageTitle from '../hooks/usePageTitle';
import SEOHead from '../components/SEOHead';

const SocialFeed = () => {
  usePageTitle('Communauté');
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPost, setNewPost] = useState('');
  const [posting, setPosting] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const res = await socialApi.getFeed({ page: 0, size: 30 });
      setPosts(res.data.content || res.data || []);
    } catch (err) {
      // silent
    } finally {
      setLoading(false);
    }
  };

  const handlePost = async () => {
    if (!newPost.trim() || posting) return;
    setPosting(true);
    try {
      await socialApi.create({ contenu: newPost });
      setNewPost('');
      await loadPosts();
      showToast('Publication partagée !', 'success');
    } catch (err) {
      showToast('Erreur lors de la publication', 'error');
    }
    setPosting(false);
  };

  const handleLike = async (id) => {
    try {
      await socialApi.like(id);
      setPosts(prev => prev.map(p => p.id === id ? { ...p, likes: (p.likes || 0) + 1 } : p));
    } catch (err) { /* silent */ }
  };

  const handleDelete = async (id) => {
    try {
      await socialApi.delete(id);
      setPosts(prev => prev.filter(p => p.id !== id));
      showToast('Publication supprimée', 'success');
    } catch (err) {
      showToast('Erreur', 'error');
    }
  };

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    const now = new Date();
    const diff = (now - d) / 1000;
    if (diff < 60) return 'À l\'instant';
    if (diff < 3600) return `Il y a ${Math.floor(diff / 60)} min`;
    if (diff < 86400) return `Il y a ${Math.floor(diff / 3600)}h`;
    return d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  };

  return (
    <div style={{ maxWidth: 640, margin: '0 auto' }}>
      <SEOHead title="Communauté — Guide Africa Premium" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <span className="luxury-subtitle">Communauté</span>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: 'var(--ivory)' }}>
            Fil d'actualité
          </h1>
          <p style={{ color: 'var(--ivory-muted)', fontSize: '0.9rem' }}>
            Partagez vos expériences gastronomiques
          </p>
        </div>

        {/* New Post */}
        {isAuthenticated && (
          <div style={{
            background: 'var(--bg-card)', border: '1px solid var(--glass-border)',
            borderRadius: 'var(--radius)', padding: 20, marginBottom: 24,
          }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <img
                src={user.avatar || `https://ui-avatars.com/api/?name=${user.prenom}&background=1B6B4A&color=F5F0E8&size=40`}
                alt="" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
              />
              <div style={{ flex: 1 }}>
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Partagez une expérience culinaire..."
                  maxLength={500}
                  rows={3}
                  style={{
                    width: '100%', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-sm)', padding: 12, color: 'var(--ivory)',
                    resize: 'none', fontSize: '0.9rem', fontFamily: 'inherit',
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--ivory-subtle)' }}>{newPost.length}/500</span>
                  <button
                    onClick={handlePost}
                    disabled={!newPost.trim() || posting}
                    className="btn btn-primary btn-sm"
                    style={{ borderRadius: 50, display: 'flex', alignItems: 'center', gap: 6 }}
                  >
                    <FiSend size={14} /> Publier
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Feed */}
        {loading ? (
          <div className="page-loading"><div className="loading-spinner"></div></div>
        ) : posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 60, color: 'var(--ivory-subtle)' }}>
            <FiMessageCircle size={48} style={{ opacity: 0.3, marginBottom: 16 }} />
            <p>Aucune publication pour le moment</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {posts.map((post, idx) => (
              <motion.div
                key={post.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true }}
                style={{
                  background: 'var(--bg-card)', border: '1px solid var(--glass-border)',
                  borderRadius: 'var(--radius)', padding: 20,
                }}
              >
                <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                  <img
                    src={post.utilisateur?.avatar || `https://ui-avatars.com/api/?name=${post.utilisateur?.prenom || 'U'}&background=1B6B4A&color=F5F0E8&size=40`}
                    alt="" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--ivory)', fontSize: '0.9rem' }}>
                      {post.utilisateur?.prenom} {post.utilisateur?.nom}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--ivory-subtle)' }}>
                      {formatDate(post.dateCreation)}
                    </div>
                  </div>
                  {user && post.utilisateur?.id === user.id && (
                    <button
                      onClick={() => handleDelete(post.id)}
                      style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'var(--ivory-subtle)', cursor: 'pointer' }}
                    >
                      <FiTrash2 size={16} />
                    </button>
                  )}
                </div>

                <p style={{ color: 'var(--ivory-muted)', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>
                  {post.contenu}
                </p>

                {post.image && (
                  <img src={post.image} alt="" style={{ width: '100%', borderRadius: 'var(--radius-sm)', marginTop: 12, maxHeight: 400, objectFit: 'cover' }} loading="lazy" />
                )}

                <div style={{ display: 'flex', gap: 20, marginTop: 16, paddingTop: 12, borderTop: '1px solid var(--border-subtle)' }}>
                  <button
                    onClick={() => handleLike(post.id)}
                    style={{
                      background: 'none', border: 'none', color: 'var(--ivory-muted)',
                      cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem'
                    }}
                  >
                    <FiHeart size={16} /> {post.likes || 0}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SocialFeed;
