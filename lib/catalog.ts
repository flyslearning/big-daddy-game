
export type Game = {
  id: string;
  name: string;
  studio: string;
  group: string;
  image: string;
  hot?: boolean;
};

const photo = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=720&q=85`;

export const games: Game[] = [
  {
    id: 'aviator',
    name: 'Aviator',
    studio: 'SPRIBE',
    group: 'Crash',
    image:
      'https://qcostarica.com/wp-content/uploads/2023/05/Aviator-game.jpg',
    hot: true
  },

  {
    id: 'crazy-time',
    name: 'Crazy Time',
    studio: 'EVOLUTION',
    group: 'Live',
    image:
      'https://images.squarespace-cdn.com/content/v1/5e89e21f1b19230e837db04e/1613910405253-DXW5WNE0BI7XXDTAY3OX/Crazy+Time+5.jpg',
    hot: true
  },

  {
    id: 'blackjack',
    name: 'Live Blackjack',
    studio: 'EVOLUTION',
    group: 'Live',
    image:
      'https://www.scatterscasino.com/wp-content/uploads/2020/03/evolution-gaming_live-blackjack-1024x683.jpg',
    hot: true
  },

  {
    id: 'roulette',
    name: 'Lightning Roulette',
    studio: 'EVOLUTION',
    group: 'Live',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1c0d5op9ro-6nnNZlbnty5aKHPCKfQ2b0omTku6gSrQ&s=10',
    hot: true
  },

  {
    id: 'live-roulette',
    name: 'Live Roulette',
    studio: 'EVOLUTION',
    group: 'Live',
    image:
      'https://media.betmgm.bet.br/images/games/roleta-ao-vivo/roleta-ao-vivo-tile.jpg?tr=w-1536',
    hot: true
  },

  {
    id: 'plinko',
    name: 'Plinko',
    studio: 'AGGREGATOR',
    group: 'Originals',
    image:
      'https://www.firstcomicsnews.com/wp-content/uploads/2025/06/unnamed-3.png'
  },

  {
    id: 'mines',
    name: 'Mines',
    studio: 'AGGREGATOR',
    group: 'Originals',
    image: 'https://play-lh.googleusercontent.com/UzYDkZyYakZSC1rjw4x2K8YmOzZa6cCvPPmMUoI8hjhUA7LqsCYMtC8jySMss8w8t7Ml6vPeraT3jPa3zKMHiQ'
  },

  {
    id: 'dice',
    name: 'Dice',
    studio: 'AGGREGATOR',
    group: 'Originals',
    image: photo('photo-1511512578047-dfb367046420')
  },

  {
    id: 'dragon-tower',
    name: 'Dragon Tower',
    studio: 'AGGREGATOR',
    group: 'Originals',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCKgqMiofR5mw2tGEPw1J2omK098GCIWYRXRAu7UryFA&s'
  },

  {
    id: 'fortune-tiger',
    name: 'Fortune Tiger',
    studio: 'PG SOFT',
    group: 'Slots',
    image:
      'https://cms.7games.bet.br/content/images/casino/custom/game/image/911e751f-66ed-48b9-9d15-ca351f0f9a1e.webp',
    hot: true
  },

  {
    id: 'sweet-bonanza',
    name: 'Sweet Bonanza',
    studio: 'PRAGMATIC PLAY',
    group: 'Slots',
    image:
      'https://assets.casinotypist.com/images/articles/desktop/1672216872.webp'
  },

  {
    id: 'gates-of-olympus',
    name: 'Gates of Olympus',
    studio: 'PRAGMATIC PLAY',
    group: 'Slots',
    image:
      'https://media.betuk.com/images/games/gates-of-olympus/gates-of-olympus-square.jpg',
    hot: true
  },

  {
    id: 'book-of-dead',
    name: 'Book of Dead',
    studio: 'PLAY N GO',
    group: 'Slots',
    image:
      'https://bookofdead.cl/images/book-of-dead4.jpg'
  },

  {
    id: 'baccarat',
    name: 'Live Baccarat',
    studio: 'EZUGI',
    group: 'Live',
    image: photo('photo-1511512578047-dfb367046420')
  },

  {
    id: 'crash',
    name: 'Crash',
    studio: 'AGGREGATOR',
    group: 'Crash',
    image: photo('photo-1446776811953-b23d57bd21aa')
  },

  {
    id: 'fishing',
    name: 'Fishing King',
    studio: 'JILI',
    group: 'Fishing',
    image: photo('photo-1518837695005-2083093ee35b')
  },

  {
    id: 'sports-cricket',
    name: 'Cricket Markets',
    studio: 'SPORTSBOOK',
    group: 'Sports',
    image: photo('photo-1540747913346-19e32dc3e97e')
  }
];

export const groups = [
  'All',
  'Live',
  'Slots',
  'Crash',
  'Originals',
  'Fishing',
  'Sports'
];
