# 🗄️ Reporting

Added the possibility to build and bootstrap custom reports built on generic information about usage and processes using reporting plugin. Multiple reports to meet various needs can be generated.

![](../../img/reporting.png)


The plugin runs in a Docker container with the official Superset image.

## Architecture

<br></br>

![](../../img/reporting_diag.png)


## What is Superset?

Apache Superset is an open-source software application for data exploration and data visualization able to handle data at petabyte scale. It enables users to analyze data using its SQL editor, and easily build charts and dashboards.

Superset can be integrated with a variety of data sources.

## Datasets

Contains all the information for extracting and processing data from the DB, includes SQL queries, calculated metrics information, cache settings etc. Can be exported / imported. 

## Dashboards and charts

Contains all the information for recreating BI elements using the datasets information. Can be exported / imported. 

[Reporting setup guide](../plugins-setup-guide/reporting-setup)





