import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import styles from './index.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';
import NpsModal from '../components/NpsModal';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link className="button button--secondary button--lg" to={useBaseUrl('/docs/intro')}>
            Introduction
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('npsVisited');
    if (!hasVisitedBefore) {
      setShowModal(true);
      localStorage.setItem('npsVisited', 'true');
    }
  }, []);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Layout description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
      <NpsModal isOpen={showModal} onClose={closeModal} />
    </Layout>
  );
}
