
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Games } from '@/components/games';
import { LiveScores } from '@/components/live-scores';

const photo = (id: string, width = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

const slides = [
  {
    tag: 'THE ULTIMATE CASINO EXPERIENCE',
    title: 'THE HOUSE OF',
    accent: 'BIG WINS.',
    description:
      'Discover an extraordinary world of casino entertainment, stunning game collections and premium experiences.',
    image: 'https://vivogaming.com/wp-content/uploads/site-images/ldg-dealer-africa.jpeg?v=1787844609',
    link: '/casino',
    button: 'EXPLORE CASINO',
    number: '01'
  },
  {
    tag: 'THE CLASSIC CARD COLLECTION',
    title: 'THE ART OF',
    accent: 'RUMMY.',
    description:
      'Discover classic card entertainment with a sophisticated, modern experience.',
    image: photo('photo-1511512578047-dfb367046420', 2200),
    link: '/casino',
    button: 'EXPLORE CARD GAMES',
    number: '02'
  },
  {
    tag: 'THE LIVE CASINO LOUNGE',
    title: 'FEEL THE',
    accent: 'EXCITEMENT.',
    description:
      'Explore the atmosphere of live roulette, blackjack and premium table games.',
    image: 'https://cdn.geekvibesnation.com/wp-media-folder-geek-vibes-nation/wp-content/uploads/2026/09/live-blackjack-roulette-baccarat-guide.png',
    link: '/casino',
    button: 'EXPLORE LIVE GAMES',
    number: '03'
  },
  {
    tag: 'THE WORLD OF SPORTS',
    title: 'EVERY MATCH.',
    accent: 'EVERY MOMENT.',
    description:
      'Experience cricket and football with a beautifully designed live match centre.',
    image: photo('photo-1540747913346-19e32dc3e97e', 2200),
    link: '/sports/cricket',
    button: 'EXPLORE SPORTS',
    number: '04'
  }
];

const collections = [
  {
    label: '01 / THE LIVE EXPERIENCE',
    title: 'LIVE CASINO',
    description: 'Roulette, Blackjack & Baccarat',
    image:
      'https://cdn.sanity.io/images/aukm82x6/production/8ccd89e8d3e06bb919815eb37006bd181070ac86-2020x1347.jpg?auto=format&fit=max&q=85&w=1200',
    href: '/casino'
  },
  {
    label: '02 / CLASSIC CARD GAMES',
    title: 'RUMMY & CARDS',
    description: 'Explore classic card entertainment',
    image:
      'https://artofcards.in/media/wysiwyg/gin-rummy.jpg',
    href: '/casino'
  },
  {
    label: '03 / INSTANT ENTERTAINMENT',
    title: 'CRASH GAMES',
    description: 'Explore our crash game collection',
    image:
      'https://gamblerid.com/storage/files/shares/slots/aviator-spribe/aviator-game.jpg',
    href: '/casino'
  },
  {
    label: '04 / PREMIUM COLLECTION',
    title: 'SLOT GAMES',
    description: 'Discover vibrant slot experiences',
    image:
      'https://cdn.geekvibesnation.com/wp-media-folder-geek-vibes-nation/wp-content/uploads/2026/09/live-blackjack-roulette-baccarat-guide.png',
    href: '/casino'
  },
  {
    label: '05 / THE MATCH CENTRE',
    title: 'LIVE CRICKET',
    description: 'Scores, fixtures and match updates',
    image:
      'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1400&q=90',
    href: '/sports/cricket'
  },
  {
    label: '06 / THE WORLD GAME',
    title: 'FOOTBALL',
    description: 'Follow the biggest football moments',
    image:
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1400&q=90',
    href: '/sports/football'
  }
];

export default function Home() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = () =>
    setActive((previous) => (previous + 1) % slides.length);

  const previous = () =>
    setActive(
      (previous) =>
        (previous - 1 + slides.length) % slides.length
    );

  useEffect(() => {
    if (paused) return;

    const timer = window.setInterval(() => {
      setActive((previous) => (previous + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <main className="bd-home">

      {/* CINEMATIC HERO */}
      <section
        className="bd-hero"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-label="Featured entertainment"
      >
        <div className="bd-hero-backgrounds">
          {slides.map((slide, index) => (
            <div
              key={slide.number}
              className={`bd-slide-bg ${
                active === index ? 'is-active' : ''
              }`}
              style={{
                backgroundImage: `url("${slide.image}")`
              }}
            />
          ))}
        </div>

        {/* VIDEO ON FIRST SLIDE */}
        {active === 0 && (
          <div className="bd-hero-video-wrap">
            <video
              className="bd-hero-video"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={slides[0].image}
            >
              <source
                src="/videos/casino-hero.mp4"
                type="video/mp4"
              />
            </video>
          </div>
        )}

        <div className="bd-hero-shade" />

        <div className="bd-hero-content">
          <div className="bd-eyebrow">
            <span className="bd-gold-dot" />
            {slides[active].tag}
          </div>

          <div key={active} className="bd-hero-animated">
            <h1>
              {slides[active].title}
              <span>{slides[active].accent}</span>
            </h1>

            <p>{slides[active].description}</p>

            <div className="bd-hero-actions">
              <Link
                href={slides[active].link}
                className="bd-gold-button"
              >
                {slides[active].button}
                <span>↗</span>
              </Link>

              <Link
                href="/sports/cricket"
                className="bd-outline-button"
              >
                LIVE SPORTS →
              </Link>
            </div>
          </div>
        </div>

        <div className="bd-slider-controls">
          <div className="bd-slider-dots">
            {slides.map((slide, index) => (
              <button
                key={slide.number}
                type="button"
                aria-label={`Show slide ${index + 1}`}
                aria-pressed={active === index}
                onClick={() => setActive(index)}
                className={`bd-slider-dot ${
                  active === index ? 'active' : ''
                }`}
              />
            ))}
          </div>

          <div className="bd-slider-arrows">
            <span className="bd-slide-counter">
              0{active + 1} / 0{slides.length}
            </span>

            <button
              type="button"
              onClick={previous}
              aria-label="Previous slide"
            >
              ←
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
            >
              →
            </button>
          </div>
        </div>
      </section>

      {/* PREMIUM TICKER */}
      <div className="bd-ticker">
        <div className="bd-ticker-track">
          {Array.from({ length: 2 }).map((_, index) => (
            <div className="bd-ticker-set" key={index}>
              <span>✦ BIG DADDY GAME</span>
              <span>✦ PREMIUM CASINO</span>
              <span>✦ RUMMY & CARDS</span>
              <span>✦ LIVE ROULETTE</span>
              <span>✦ BLACKJACK</span>
              <span>✦ LIVE CRICKET</span>
              <span>✦ WORLD FOOTBALL</span>
              <span>✦ 18+ RESPONSIBLE PLAY</span>
            </div>
          ))}
        </div>
      </div>

      {/* INTRO */}
      <section className="bd-container bd-intro">
        <div>
          <span className="bd-micro">
            WELCOME TO BIG DADDY GAME
          </span>

          <h2>
            MORE THAN A GAME.
            <span>IT'S AN EXPERIENCE.</span>
          </h2>
        </div>

        <p>
          Enter a premium destination for casino-inspired
          entertainment, card games and live sports.
          Beautifully curated, effortlessly accessible.
        </p>
      </section>

      {/* FEATURED COLLECTIONS */}
      <section className="bd-container bd-collections">
        <div className="bd-section-header">
          <div>
            <span className="bd-micro">
              DISCOVER THE COLLECTION
            </span>

            <h2>
              EXPLORE THE <em>EXTRAORDINARY.</em>
            </h2>
          </div>

          <Link href="/casino" className="bd-text-link">
            ALL GAMES ↗
          </Link>
        </div>

        <div className="bd-collection-grid">
          {collections.map((item, index) => (
            <Link
              key={item.title}
              href={item.href}
              className={`bd-collection-card ${
                index < 2 ? 'bd-featured-card' : ''
              }`}
              style={{
                backgroundImage: `url("${item.image}")`
              }}
            >
              <div className="bd-card-overlay" />

              <div className="bd-card-top">
                <span>{item.label}</span>
                <span className="bd-card-arrow">↗</span>
              </div>

              <div className="bd-card-bottom">
                <h3>{item.title}</h3>
                <p>{item.description}</p>

                <span className="bd-card-explore">
                  DISCOVER COLLECTION →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED GAMES */}
      <section className="bd-container bd-games-section">
        <div className="bd-section-header">
          <div>
            <span className="bd-micro">
              THE VAULT / GAME LIBRARY
            </span>

            <h2>
              THE FINEST <em>SELECTION.</em>
            </h2>

            <p className="bd-muted">
              A curated collection of popular casino games.
            </p>
          </div>

          <Link href="/casino" className="bd-text-link">
            EXPLORE ALL GAMES →
          </Link>
        </div>

        <Games limit={12} />
      </section>

      {/* SECOND CINEMATIC BANNER */}
      <section className="bd-promo-banner">
        <div
          className="bd-promo-bg"
          style={{
            backgroundImage: `url("${photo(
              'photo-1606503153255-59d8b8b8750a',
              2000
            )}")`
          }}
        />

        <div className="bd-promo-overlay" />

        <div className="bd-container bd-promo-content">
          <span className="bd-micro">
            THE SIGNATURE EXPERIENCE
          </span>

          <h2>
            STEP INTO
            <span>THE SPOTLIGHT.</span>
          </h2>

          <p>
            From the atmosphere of live casino tables to
            the excitement of interactive game collections.
          </p>

          <Link href="/casino" className="bd-gold-button">
            DISCOVER GAMES ↗
          </Link>
        </div>
      </section>

      {/* LIVE SCORES */}
      <section className="bd-container bd-sports-section">
        <div className="bd-section-header">
          <div>
            <span className="bd-micro">
              MOMENTS THAT MATTER
            </span>

            <h2>
              THE LIVE <em>ARENA.</em>
            </h2>

            <p className="bd-muted">
              Follow match updates from your configured
              sports data provider.
            </p>
          </div>

          <Link
            href="/sports/cricket"
            className="bd-text-link"
          >
            OPEN MATCH CENTRE →
          </Link>
        </div>

        <LiveScores sport="cricket" />
      </section>

      {/* ACCOUNT CTA */}
      <section className="bd-container bd-final-section">
        <div className="bd-final-content">
          <span className="bd-micro">
            BECOME PART OF THE EXPERIENCE
          </span>

          <h2>
            YOUR SEAT.
            <span>YOUR MOMENT.</span>
          </h2>

          <p>
            Create your account and discover your
            personalized Big Daddy Game experience.
          </p>

          <Link href="/auth" className="bd-gold-button">
            CREATE YOUR ACCOUNT ↗
          </Link>

          <span className="bd-responsible">
            18+ | PLAY RESPONSIBLY
          </span>
        </div>

        <div
          className="bd-final-image"
          style={{
            backgroundImage: `url("${photo(
              'photo-1511512578047-dfb367046420'
            )}")`
          }}
        />
      </section>

      <style jsx global>{`
        .bd-home {
          background: #090a0c;
          color: #fff;
          overflow: hidden;
        }

        .bd-home * {
          box-sizing: border-box;
        }

        .bd-container {
          width: min(1320px, 92%);
          margin-left: auto;
          margin-right: auto;
        }

        .bd-hero {
          height: min(850px, 94svh);
          min-height: 650px;
          position: relative;
          overflow: hidden;
          background: #0c0c0e;
        }

        .bd-hero-backgrounds,
        .bd-hero-video-wrap,
        .bd-hero-shade {
          position: absolute;
          inset: 0;
        }

        .bd-slide-bg {
          position: absolute;
          inset: 0;
          background-position: center;
          background-size: cover;
          opacity: 0;
          transform: scale(1.06);
          transition: opacity 1s ease,
            transform 6s ease;
        }

        .bd-slide-bg.is-active {
          opacity: 1;
          transform: scale(1);
        }

        .bd-hero-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .bd-hero-video-wrap {
          animation: bdFadeIn 1s ease;
        }

        .bd-hero-shade {
          background:
            linear-gradient(
              90deg,
              rgba(0, 0, 0, .91) 0%,
              rgba(0, 0, 0, .72) 42%,
              rgba(0, 0, 0, .20) 100%
            ),
            linear-gradient(
              0deg,
              rgba(0,0,0,.75),
              transparent 35%
            );
        }

        .bd-hero-content {
          position: relative;
          z-index: 3;
          width: min(1320px, 92%);
          height: 100%;
          margin: auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          padding-bottom: 25px;
        }

        .bd-eyebrow,
        .bd-micro {
          font-size: 11px;
          letter-spacing: 3px;
          font-weight: 700;
          color: #d5ad60;
        }

        .bd-eyebrow {
          display: flex;
          gap: 12px;
          align-items: center;
          margin-bottom: 28px;
        }

        .bd-gold-dot {
          height: 7px;
          width: 7px;
          background: #e4bd70;
          border-radius: 100%;
          box-shadow: 0 0 14px #e4bd70;
        }

        .bd-hero h1 {
          font-size: clamp(55px, 7.8vw, 115px);
          line-height: .97;
          letter-spacing: -5px;
          font-weight: 900;
          margin: 0;
          max-width: 1050px;
        }

        .bd-hero h1 span,
        .bd-intro h2 span,
        .bd-promo-content h2 span,
        .bd-final-content h2 span {
          display: block;
          color: #ddb66c;
          font-style: italic;
          font-family: Georgia, serif;
          font-weight: 400;
        }

        .bd-hero-content p {
          margin: 29px 0 34px;
          max-width: 545px;
          font-size: 16px;
          line-height: 1.85;
          color: #d0d0d0;
        }

        .bd-hero-animated {
          animation: bdTextIn .7s ease both;
        }

        .bd-hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
        }

        .bd-gold-button,
        .bd-outline-button {
          padding: 18px 27px;
          text-decoration: none;
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 1px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          transition: .25s ease;
        }

        .bd-gold-button {
          background: #dbaf5e;
          color: #171108;
        }

        .bd-gold-button:hover {
          background: #f4ce84;
          transform: translateY(-3px);
        }

        .bd-outline-button {
          color: #fff;
          border: 1px solid rgba(255,255,255,.40);
          background: rgba(255,255,255,.07);
          backdrop-filter: blur(12px);
        }

        .bd-outline-button:hover {
          border-color: #dbaf5e;
          color: #dbaf5e;
        }

        .bd-slider-controls {
          position: absolute;
          z-index: 5;
          bottom: 38px;
          left: 4%;
          right: 4%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .bd-slider-dots,
        .bd-slider-arrows {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .bd-slider-dot {
          width: 30px;
          height: 3px;
          padding: 0;
          border: 0;
          background: rgba(255,255,255,.4);
          cursor: pointer;
          transition: all .3s;
        }

        .bd-slider-dot.active {
          width: 65px;
          background: #e3b66a;
        }

        .bd-slide-counter {
          color: #ddd;
          font-size: 12px;
          letter-spacing: 2px;
          margin-right: 16px;
        }

        .bd-slider-arrows button {
          width: 44px;
          height: 44px;
          border: 1px solid #777;
          background: rgba(0,0,0,.35);
          color: white;
          font-size: 21px;
          cursor: pointer;
          transition: .25s;
        }

        .bd-slider-arrows button:hover {
          background: #dbaf5e;
          border-color: #dbaf5e;
          color: black;
        }

        .bd-ticker {
          background: #caa05d;
          color: #14100b;
          overflow: hidden;
          white-space: nowrap;
          padding: 17px 0;
        }

        .bd-ticker-track {
          display: flex;
          width: max-content;
          animation: bdTicker 42s linear infinite;
        }

        .bd-ticker-set {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          gap: 60px;
          padding-right: 60px;
        }

        .bd-ticker-set span {
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 2px;
        }

        .bd-intro {
          padding-top: 110px;
          padding-bottom: 100px;
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          align-items: end;
          gap: 55px;
          border-bottom: 1px solid #252525;
        }

        .bd-intro h2 {
          font-size: clamp(35px, 4.5vw, 65px);
          line-height: 1.12;
          letter-spacing: -2px;
          margin: 18px 0 0;
          font-weight: 900;
        }

        .bd-intro > p {
          color: #999;
          line-height: 1.9;
          font-size: 15px;
          max-width: 410px;
        }

        .bd-collections,
        .bd-games-section,
        .bd-sports-section {
          padding-top: 95px;
          padding-bottom: 95px;
        }

        .bd-section-header {
          display: flex;
          justify-content: space-between;
          align-items: end;
          gap: 30px;
          margin-bottom: 38px;
        }

        .bd-section-header h2 {
          font-size: clamp(32px, 4vw, 52px);
          font-weight: 900;
          letter-spacing: -2px;
          line-height: 1.1;
          margin: 14px 0 0;
        }

        .bd-section-header em {
          color: #d6ab65;
          font-family: Georgia, serif;
          font-weight: 400;
        }

        .bd-text-link {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1px;
          text-decoration: none;
          color: #dfb876;
          border-bottom: 1px solid #dfb876;
          padding-bottom: 8px;
          white-space: nowrap;
        }

        .bd-muted {
          color: #999;
          margin-top: 15px;
          line-height: 1.7;
        }

        .bd-collection-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0,1fr));
          gap: 17px;
        }

        .bd-collection-card {
          position: relative;
          min-height: 300px;
          background-size: cover;
          background-position: center;
          overflow: hidden;
          text-decoration: none;
          color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 25px;
          isolation: isolate;
          transition: .3s ease;
          border: 1px solid #282828;
        }

        .bd-featured-card {
          grid-column: span 2;
          min-height: 430px;
        }

        .bd-collection-card:hover {
          border-color: #cba15f;
          transform: translateY(-5px);
        }

        .bd-card-overlay {
          position: absolute;
          inset: 0;
          z-index: -1;
          background: linear-gradient(
            180deg,
            rgba(0,0,0,.46),
            rgba(0,0,0,.1) 30%,
            rgba(0,0,0,.90)
          );
          transition: .3s;
        }

        .bd-collection-card:hover .bd-card-overlay {
          background: linear-gradient(
            180deg,
            rgba(0,0,0,.4),
            rgba(0,0,0,.15),
            rgba(0,0,0,.97)
          );
        }

        .bd-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.4px;
          color: #e1c08b;
        }

        .bd-card-arrow {
          width: 35px;
          height: 35px;
          display: grid;
          place-items: center;
          border: 1px solid #777;
          border-radius: 50%;
          font-size: 18px;
          color: white;
        }

        .bd-card-bottom h3 {
          font-size: clamp(24px, 2.7vw, 40px);
          line-height: 1.1;
          font-weight: 900;
          margin: 0;
        }

        .bd-card-bottom p {
          font-size: 12px;
          color: #ccc;
          margin: 12px 0 18px;
        }

        .bd-card-explore {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1px;
          color: #dcb56e;
        }

        .bd-games-section {
          border-top: 1px solid #252525;
        }

        .bd-promo-banner {
          min-height: 490px;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
        }

        .bd-promo-bg,
        .bd-promo-overlay {
          position: absolute;
          inset: 0;
        }

        .bd-promo-bg {
          background-size: cover;
          background-position: center;
        }

        .bd-promo-overlay {
          background: linear-gradient(
            90deg,
            #090a0cf5,
            #090a0cbb 48%,
            #090a0c33
          );
        }

        .bd-promo-content {
          position: relative;
          z-index: 2;
          padding-top: 80px;
          padding-bottom: 80px;
        }

        .bd-promo-content h2,
        .bd-final-content h2 {
          font-size: clamp(48px, 6vw, 86px);
          line-height: 1;
          font-weight: 900;
          margin: 25px 0;
          letter-spacing: -3px;
        }

        .bd-promo-content p,
        .bd-final-content p {
          color: #bcbcbc;
          max-width: 490px;
          line-height: 1.9;
          margin-bottom: 30px;
        }

        .bd-final-section {
          margin-top: 50px;
          margin-bottom: 95px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 460px;
          border: 1px solid #29251d;
          background: #121110;
        }

        .bd-final-content {
          padding: clamp(30px, 5vw, 80px);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
        }

        .bd-final-image {
          min-height: 400px;
          background-size: cover;
          background-position: center;
          position: relative;
        }

        .bd-final-image:after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            #121110,
            transparent 60%
          );
        }

        .bd-responsible {
          margin-top: 25px;
          color: #81745f;
          font-size: 10px;
          letter-spacing: 2px;
        }

        @keyframes bdFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes bdTextIn {
          from {
            opacity: 0;
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bdTicker {
          to { transform: translateX(-50%); }
        }

        @media (max-width: 1000px) {
          .bd-collection-grid {
            grid-template-columns: repeat(2, minmax(0,1fr));
          }

          .bd-featured-card {
            grid-column: span 1;
            min-height: 350px;
          }

          .bd-intro {
            grid-template-columns: 1fr;
            gap: 15px;
          }

          .bd-final-section {
            grid-template-columns: 1fr;
          }

          .bd-final-image {
            min-height: 280px;
          }
        }

        @media (max-width: 640px) {
          .bd-hero {
            min-height: 650px;
            height: 88svh;
          }

          .bd-hero-content {
            justify-content: center;
            padding-bottom: 45px;
          }

          .bd-hero h1 {
            font-size: clamp(44px, 12vw, 67px);
            letter-spacing: -2px;
          }

          .bd-hero-content p {
            font-size: 13px;
            line-height: 1.7;
          }

          .bd-hero-shade {
            background: linear-gradient(
              90deg,
              rgba(0,0,0,.87),
              rgba(0,0,0,.48)
            );
          }

          .bd-hero-actions {
            gap: 10px;
          }

          .bd-gold-button,
          .bd-outline-button {
            padding: 15px 17px;
            font-size: 10px;
          }

          .bd-slider-arrows button {
            width: 34px;
            height: 34px;
          }

          .bd-slider-dot {
            width: 18px;
          }

          .bd-slider-dot.active {
            width: 35px;
          }

          .bd-slide-counter {
            display: none;
          }

          .bd-intro,
          .bd-collections,
          .bd-games-section,
          .bd-sports-section {
            padding-top: 65px;
            padding-bottom: 65px;
          }

          .bd-section-header {
            align-items: start;
            flex-direction: column;
            gap: 18px;
          }

          .bd-collection-grid {
            gap: 11px;
          }

          .bd-collection-card {
            min-height: 245px;
            padding: 15px;
          }

          .bd-featured-card {
            min-height: 280px;
          }

          .bd-card-top {
            font-size: 8px;
            letter-spacing: .5px;
          }

          .bd-card-bottom h3 {
            font-size: 21px;
          }

          .bd-card-bottom p {
            font-size: 10px;
          }

          .bd-card-explore {
            font-size: 9px;
          }

          .bd-promo-banner {
            min-height: 390px;
          }

          .bd-final-content h2,
          .bd-promo-content h2 {
            font-size: 48px;
          }

          .bd-final-section {
            margin-top: 10px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .bd-ticker-track {
            animation: none;
          }

          .bd-slide-bg,
          .bd-hero-animated,
          .bd-hero-video-wrap {
            animation: none;
            transition: none;
          }
        }
      `}</style>
    </main>
  );
}
