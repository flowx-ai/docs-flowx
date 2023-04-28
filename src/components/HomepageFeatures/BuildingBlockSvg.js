import React from 'react';
import styles from './styles.module.css';
import BuildingBlocksSvg from '@site/static/img/undraw_building_blocks_re_5ahy.svg';


export default function BuildingBlocks() {
  return (
    <div className={styles.buildingBlocks}>
      <BuildingBlocksSvg className={styles.buildingBlocks} />
    </div>
  );
}
