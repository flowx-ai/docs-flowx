import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import BuildingBlocks from './BuildingBlockSvg';
import Link from '@docusaurus/Link';





const FeatureList = [

  {
    title: 'A unified platform for omnichannel experiences',
    Svg: require('@site/static/img/undraw_prototyping_process_re_7a6p.svg').default,
    description: (
      <>
        We empower everyone to build amazing customer experiences, no matter their skill level or the burden of legacy tech.
      </>
    ),
  },
  {
    title: 'No code / Full code',
    Svg: require('@site/static/img/undraw_software_engineer_re_tnjc.svg').default,
    description: (
      <> 
        With visual development environments for processes, integrations, and business rules, any process or web or mobile-native apps can be developed and deployed with less coding and more efficiency.
      </>
    ),
  },
  {
    title: 'ZEROREDEPLOY(™)',
    Svg: require('@site/static/img/undraw_programming_re_kg9v.svg').default,
    description: (
      <>
        Make changes to your processes instantly with our unique architecture that allows business people to edit or add to a process and have the changes deployed at the click of a button.
      </>
    ),
  },


  
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <section className={styles.features}>
        <div className="container">
          <div className="row">
            {FeatureList.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>
      
      
      <section className={styles.hero}>
      
      
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>



  <h1>Create Amazing Experiences</h1>
          <div className="text--center padding-horiz--md">
          <p>Use FLOWX to build, deploy, and manage amazing omnichannel experiences. </p>
          </div>
          
  <div className={styles.buttonContainer}>

  <div className={styles.buttonContainer}>
  <div className={styles.buttonCard}>
    <h3>Getting Started</h3>
    <p>Build your first process using FLOWX 🚀</p>
    <Link  to="/docs/getting-started/building-your-first-proc">
      <button className={styles.ctaButton}>Getting Started</button>
    </Link>
  </div>
</div>
 
 <div className={styles.buttonCard}>
    <h3>Platform Overview</h3>
    <p> Frameworks and standards</p>
    <Link to="/docs/platform-overview/frameworks-and-standards">
      <button className={styles.ctaButton}>Platform Overview</button>
    </Link>
  </div>
  
  <div className={styles.buttonCard}>
    <h3>Building Blocks</h3>
    <p>Building blocks for process automation</p>
    <Link to="/docs/building-blocks/process/">
      <button className={styles.ctaButton}>Building Blocks</button>
    </Link>
  </div>
  
  <div className={styles.buttonCard}>
    <h3>FLOWX Designer</h3>
    <p>No-code app creation with FLOWX Designer</p>
    <Link to="/docs/flowx-designer/designer">
      <button className={styles.ctaButton}>FLOWX Designer</button>
    </Link>
  </div>
  
  <div className={styles.buttonCard}>
    <h3>Platform Deep Dive</h3>
    <p>Dive into platform's core components </p>
    <Link to="/docs/category/core-components">
      <button className={styles.ctaButton}>Platform Deep Dive</button>
    </Link>
  </div>


  <BuildingBlocks/>

  
</div>


        </div>

      </section>

    </div>
  )

}



