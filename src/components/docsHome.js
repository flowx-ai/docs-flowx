/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

 import Link from "@docusaurus/Link";
 import useBaseUrl from "@docusaurus/useBaseUrl";
 import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
 import classnames from "classnames";
 import React from "react";
 import styles from "./HomepageFeatures/styles.module.css";
 
 function Docs() {
   const context = useDocusaurusContext();
 
   return (
     <main>
       <section className={styles.features} style={{ borderBottom: "none" }}>
         <div className="container">
           <p>
           🚀 Based on what you need to accomplish and understand, find below-suggested tracks you can follow. Choose the track that suits you best.
           </p>
           <div className="row">
             <div className={classnames("col col--6", styles.features)}>
               <div className={classnames("card shadow--md", styles.card)}>
                 <div className="card__header">
                   <h3>Platform overview</h3>
                   <p>
                     Take a look on the frameworks and standards used, our architecture and the latest features that we are releasing.
                   </p>
                 </div>
                 <div className="card__body">
                   <Link href={useBaseUrl("docs/intro")}>
                   📌 <b>Overview</b>
                   </Link>
                   <br></br>
                   <Link href={useBaseUrl("docs/platform-overview/frameworks-and-standards/")}>
                   📌 <b>Frameworks and standards</b>
                   </Link>
                   <br></br>
                   <Link href={useBaseUrl("docs/platform-overview/flowx-architecture")}>
                   📌 <b>Architecture</b>
                   </Link>
                   <br></br>
                   <Link href={useBaseUrl("/release-notes")}>
                   📌 <b>Release Notes</b>
                   </Link>
                 </div>
               </div>
             </div>
             <div className={classnames("col col--6", styles.features)}>
               <div className={classnames("card shadow--md", styles.card)}>
                 <div className="card__header">
                   <h3>Design a process</h3>
                   <p>
                     I want to design a process using FLOWX.AI.
                   </p>
                 </div>
                 <div className="card__body">
                   <Link
                     href={useBaseUrl(
                       "docs/intro"
                     )}
                   >
                     📌 <b>Overview</b>
                   </Link>
                   <br></br>
                   <Link href={useBaseUrl("docs/building-blocks/process/")}>
                     📌  <b>Building blocks</b>
                   </Link>
                   <br></br>
                   <Link href={useBaseUrl("docs/building-blocks/process/")}>
                     📌  <b>Designer</b>
                   </Link>
                 </div>
               </div>
             </div>
             <div className={classnames("col col--6", styles.features)}>
               <div className={classnames("card shadow--md", styles.card)}>
                 <div className="card__header">
                   <h3>Build an application</h3>
                   <p>
                     I want to build an application using FLOWX.AI.
                   </p>
                 </div>
                 <div className="card__body">
                   <Link href={useBaseUrl("docs/intro")}><b>📌 Overview</b></Link>
                   <br></br>
                   <Link href={useBaseUrl("docs/building-blocks/process/")}>📌 <b>Building blocks</b></Link>
                   <br></br>
                   <Link href={useBaseUrl("docs/category/core-components")}>📌 <b>Core components</b></Link>
                   <br></br>
                   <Link href={useBaseUrl("docs/platform-deep-dive/integrations/")}>📌 <b>Integrations</b></Link>
                   <br></br>
                   <Link href={useBaseUrl("docs/platform-deep-dive/plugins/")}>📌 <b>Plugins</b></Link>
                 </div>
               </div>
             </div>
             <div className={classnames("col col--6", styles.features)}>
               <div className={classnames("card shadow--md", styles.card)}>
                 <div className="card__header">
                   <h2>Additional support</h2>
                   <p>
                    Find additional support when you're stuck.
                   </p>
                 </div>
                 <div className="card__body">
                   <Link href={useBaseUrl("/faqs")}>📌 <b>FAQs</b></Link>
                   <br></br>
                   <Link href={useBaseUrl("docs/expedition/expedition_qs")}>
                   📌 <b>Troubleshooting</b>
                   </Link>
                   <br></br>
                   <Link href={useBaseUrl("docs/expedition/expedition_apiint")}>
                   📌 <b>Best practices</b>
                   </Link>
                   <br></br>
                   <br></br>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </section>
     </main>
   );
 }
 
 export default Docs;