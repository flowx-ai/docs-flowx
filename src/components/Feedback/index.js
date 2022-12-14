import React, { useEffect, useState } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import styles from './styles.module.css'


const VotedYes = () => {
    return <span>Thanks for your feedback.</span>;
  };
  
  const VotedNo = () => {
    return <span>Thanks for your feedback. If you have any inquiry/documentation request, please submit a request <a href='https://flowxai.canny.io/documentation-feedback'>here</a>. </span>;
  };
  

export default function Feedback({ resource }) {
    const [reaction, setReaction] = useState(null);

    const isReacted = reaction === 'Yes' || reaction === 'No';
    const _resource = String(resource).replace(/\//g, '-');
  
    const handleReaction = (params) => {
      setReaction(params.icon);
    };
  
    useEffect(() => {
      if (ExecutionEnvironment.canUseDOM) {
        window.HappyReact?.init({
          onReaction: handleReaction,
        });
      }
    }, []);
    console.log(styles)
    return (
      <div className={styles.root}>
        <br></br>
        <h4 className={styles.title}>Was this page helpful?</h4>
        {!isReacted ? (
          <div
            className={styles.widget}
            data-hr-token="ed66ce24-0a37-4ec7-9066-1800762f40dc"
            data-hr-resource={_resource}
            data-hr-styles={JSON.stringify({
              container: styles.container,
              grid: styles.grid,
              cell: styles.cell,
              reaction: styles.reaction,
              footer: styles.footer,
            })}
          />
        ) : reaction === 'No' ? (
          <VotedNo />
        ) : (
          <VotedYes />
        )}
      </div>
    );
  }