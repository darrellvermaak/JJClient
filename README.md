# BrowserClient

This file-browser needs to be built along with the back-end before the service can be brought up with docker-compose. See the back-end README.md for more detailed instructions on building the back-end and bringing up the service.

To build the docker image execute the command below on the command line.
docker build -t browser-client -f browser-client.Dockerfile .
