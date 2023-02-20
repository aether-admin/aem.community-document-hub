import React, { useEffect } from 'react';
import clsx from 'clsx';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <>
      <Layout
        title={siteConfig.title}
        description='A place to document and share learning materials to all developers whom might be working for Adobe Experience Manager'>
        <HomepageHeader />
        <main>
          <HomepageFeatures />
        </main>
      </Layout>
      <BrowserOnly fallback={<div>Loading...</div>}>
        {() => {
          useEffect( () => {
            const CMS = require('netlify-cms-app');
            const uploadcare = require('netlify-cms-media-library-uploadcare');

            CMS.registerMediaLibrary(uploadcare)
            CMS.init();

            const netlifyIdentity = require('netlify-identity-widget');
            netlifyIdentity.init({
              container: '#netlify-modal', // defaults to document.body
              locale: 'en' // defaults to 'en'
            });
          }, [])

          return <div id='netlify-modal' />;
        }}
      </BrowserOnly>
      </>
  );
}
