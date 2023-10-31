# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

Using SSH:

```
$ USE_SSH=true yarn deploy
```

Not using SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

### Run in a Docker container

The website can be run inside a Docker container, having the source code on the host machine mounted as volume.

This solution is meant to be used under **MacOS**.</br>
For running under **Linux**, it needs a few more tweaks (**TODO**).

All the management is made through the [docker/run.sh](docker/run.sh) shell script, which delegates to the corresponding Docker commands.
The script can be run from the project root folder (as in the examples below) of from the actual [docker](docker) folder.

##### Prerequisites

Make sure [Docker](https://www.docker.com/) installed on the host machine.<br/>
For MacOS, [Docker Desktop](https://www.docker.com/products/docker-desktop/) is recommended.

##### Building the Docker image

From the project root folder, run: ```source docker/run.sh --build```.

The resulting image is named `docs:latest` and is based on the official **Node 18.15 Alpine** image.

##### Creating and starting the container

From the project root folder, run: ```source docker/run.sh --up```.

As a result, a Docker container, named `docs`, is created and started.<br/>
At this point, the server setup is **NOT** yet made and container access is needed execute it.

##### Stopping and removing the container

From the project root folder, run: ```source docker/run.sh --down```.

This will stop and remove the existing `docs` container.

##### Starting the existing container

From the project root folder, run: ```source docker/run.sh --start```.

This command will start the already existing `docs` container.

Starting the container can have some extra parameters:
- `--yarn-init`: runs the setup (a.k.a. `yarn && yarn build`)
- `--yarn-start`: starts and exposes the webserver to external traffic (a.k.a. `yarn start --host 0.0.0.0`)

These two parameters can be both passed at once, if needed (e.g. first run use case): ```source docker/run.sh --start --yarn-init --yarn-start```

##### Stopping the existing container

From the project root folder, run: ```source docker/run.sh --stop```.

##### Local machine browser access

The server is accessible from the host machine browser at [http://127.0.0.1:3000](http://127.0.0.1:3000).

Changing the source code on the host machine will automatically trigger website refresh.

##### TLDR

Initial run, from the project root folder:
```
source docker/run.sh --build
source docker/run.sh --up
source docker/run.sh --start --yarn-init --yarn-start
```

Stop container:
```
source docker/run.sh --stop
```

Start container and expose webserver:
```
source docker/run.sh --start --yarn-start
```

Clean-up resources:
```
source docker/run.sh --down
docker image rm docs
```