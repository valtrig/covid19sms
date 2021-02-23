# COVID-19 SMS
This is a simple web application that enables mobile devices to create SMS messages, according to the IETF [RFC 5724](https://tools.ietf.org/html/rfc5724) specification, pre-filled with a user's appropriate personal information, for use as the necessary electronic declarations of movement in Greece, during the COVID-19 pandemic.

It has been implemented as a [Progressive Web Application](https://en.wikipedia.org/wiki/Progressive_web_application) utilising a [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) for caching browser requests, so that it can also be used offline with supported browsers.

Even though its development was triggered by an actual practical need, i.e. having to reference the appropriate code to complete and also to copy-paste and edit previously sent messages containing the necessary personal information, the application mostly
serves as a personal experiment and will hopefully become discontinued soon enough, as soon as the pandemic is over!

# Building and starting the application
The application consists of a collection of front-end web elements, requiring no server-side processing in order to function, other than a simple HTTP server to provide the static content. It is built using [node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) and can be served by simply cloning this repository and invoking `npm start` from the command-line. This command will download the necessary node modules for building the application and subsequently start the specified [http-server](https://www.npmjs.com/package/http-server), making the application available from http://localhost:8080/.

Alternatively, if [Docker](https://www.docker.com/) is available, the application can also be built into an image that wraps the whole *node.js/npm* build process and be served via an [nginx](https://www.nginx.com/) based container, thus enabling to not having to install *node.js* locally, if it is not already available. This can be accomplished by simply invoking `docker-compose up` from the command-line.
