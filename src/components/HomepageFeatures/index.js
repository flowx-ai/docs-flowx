import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'A unified platform for omnichannel experiences',
    Svg: require('@site/static/img/undraw_prototyping_process_re_7a6p.svg').default,
    description: (
      <>
        We’ve built our platform with the aim of empowering everyone to build amazing customer experiences, no matter the skill level or the burden of legacy tech. 
      </>
    ),
  },
  {
    title: 'Low code / Full code',
    Svg: require('@site/static/img/undraw_software_engineer_re_tnjc.svg').default,
    description: (
      <> 
        With visual development environments for processes (using the BPMN standard), integrations, reusable components and business rules, any process or web or mobile-native apps can be developed and deployed with less specialized skills, less coding, less bugs and more efficiency.
      </>
    ),
  },
  {
    title: 'ZEROREDEPLOY(™)',
    Svg: require('@site/static/img/undraw_programming_re_kg9v.svg').default,
    description: (
      <>
        Do not wait for monthly release cycles, while your business changes weekly or even daily. ZeroRedeploy is a new type of architecture that allows business people to edit or add to a process and have the changes instantly deployed at a click of a button.
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
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
