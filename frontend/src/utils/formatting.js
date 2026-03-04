export const formatPrix = (prix) => {
  if (prix == null) return '';
  return new Intl.NumberFormat('fr-FR').format(prix) + ' FCFA';
};

export const formatPrixJour = (prix) => {
  if (prix == null) return '';
  return new Intl.NumberFormat('fr-FR').format(prix) + ' FCFA/jour';
};

export const categorieActiviteLabels = {
  SAFARI: 'Safari', EXCURSION: 'Excursion', CULTURE: 'Culture',
  GASTRONOMIE: 'Gastronomie', SPORT: 'Sport', AVENTURE: 'Aventure',
  DETENTE: 'Détente', ARTISANAT: 'Artisanat'
};

export const difficulteLabels = {
  FACILE: 'Facile', MOYEN: 'Moyen', DIFFICILE: 'Difficile'
};

export const difficulteColors = {
  FACILE: '#2ecc71', MOYEN: '#f39c12', DIFFICILE: '#e74c3c'
};
