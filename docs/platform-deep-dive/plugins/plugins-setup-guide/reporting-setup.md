# Reporting setup guide

The reporting plugin has the following dependencies/prerequisites:

*  Python
*  Spark
*  PostgreSQL DBs (installed for both FLOWX.AI Engine and reporting)
*  Superset installed in a Docker container with port exposed and access to reporting database

## Components to be imported / installed / set up

### Datasets

### Superset queries from reporting DB

|   Queries	             |   	      Observations   	       |           |
|----------------------- |-----------------------------------  |---------- |
| `-- inst_only`         | replace params table name as needed |           |
| `-- inst_nodes`        | replace params table name as needed |           |
| `-- inst_params` 	     |                                     |           |
| `--inst_nodes_params`  |   	                               |           |
| `-- inst_tokens`  	 |   	                               |           |
| `-- inst_tokens_params`| replace params table name as needed |           |

### Dashboard and charts

