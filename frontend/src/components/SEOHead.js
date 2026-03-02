import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

/**
 * SEO component for dynamic meta tags, Open Graph, Twitter Cards, and JSON-LD
 * Items 69-72: Schema.org JSON-LD, dynamic meta, breadcrumbs schema
 */
const SEOHead = ({
  title,
  description,
  image,
  url,
  type = 'website',
  jsonLd,
  breadcrumbs,
  noIndex = false,
}) => {
  const siteName = 'Guide Africa';
  const fullTitle = title ? `${title} — ${siteName}` : siteName;
  const defaultDescription = 'Découvrez l\'excellence culinaire et hôtelière africaine. Restaurants étoilés, hôtels de prestige, expériences gastronomiques.';
  const defaultImage = '/og-image.jpg';

  const breadcrumbJsonLd = breadcrumbs ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((bc, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: bc.name,
      item: bc.url ? `https://guideafrica.com${bc.url}` : undefined,
    })),
  } : null;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:type" content={type} />
      {url && <meta property="og:url" content={url} />}
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="fr_FR" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image || defaultImage} />

      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
      {breadcrumbJsonLd && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      )}
    </Helmet>
  );
};

SEOHead.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.string,
  jsonLd: PropTypes.object,
  noIndex: PropTypes.bool,
};

/**
 * Generate Restaurant JSON-LD schema
 */
export const restaurantJsonLd = (restaurant) => ({
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: restaurant.nom,
  description: restaurant.description,
  image: restaurant.image,
  address: {
    '@type': 'PostalAddress',
    streetAddress: restaurant.adresse,
  },
  telephone: restaurant.telephone,
  servesCuisine: restaurant.cuisine,
  priceRange: '€'.repeat(restaurant.fourchettePrix || 1),
  aggregateRating: restaurant.note ? {
    '@type': 'AggregateRating',
    ratingValue: restaurant.note,
    bestRating: 5,
  } : undefined,
  url: restaurant.siteWeb,
});

/**
 * Generate Hotel JSON-LD schema
 */
export const hotelJsonLd = (hotel) => ({
  '@context': 'https://schema.org',
  '@type': 'Hotel',
  name: hotel.nom,
  description: hotel.description,
  image: hotel.image,
  address: {
    '@type': 'PostalAddress',
    streetAddress: hotel.adresse,
  },
  telephone: hotel.telephone,
  starRating: {
    '@type': 'Rating',
    ratingValue: hotel.etoiles,
  },
  priceRange: hotel.prixParNuit ? `${hotel.prixParNuit} EUR` : undefined,
  aggregateRating: hotel.note ? {
    '@type': 'AggregateRating',
    ratingValue: hotel.note,
    bestRating: 5,
  } : undefined,
});

/**
 * Generate Review JSON-LD schema
 */
export const reviewJsonLd = (review, establishmentName) => ({
  '@context': 'https://schema.org',
  '@type': 'Review',
  itemReviewed: {
    '@type': 'Restaurant',
    name: establishmentName,
  },
  author: {
    '@type': 'Person',
    name: review.auteur,
  },
  reviewRating: {
    '@type': 'Rating',
    ratingValue: review.note,
    bestRating: 5,
  },
  datePublished: review.dateCreation,
  reviewBody: review.commentaire,
});

export default SEOHead;
