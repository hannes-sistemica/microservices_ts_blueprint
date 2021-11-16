## Overall Requirements
- Create a logging library and use it to:
  - Log all incoming requests
  - If incoming requests does not have a tracing id in the header, add one
  - Use tracing id throughout the complete log chain within the flow
  - Log response

## Open / Todo
- Configure logging (filename/log level) via env variables config file
- Configuration of port through env variables
- clean up the main class and put the mw in own files
- pass the logger to controller layer and log activities
- Investigate if log entries in winston can automatically add context (class/filename, line number)
- log entries of winston: message is escaped, should be plain json
- extract logging and build an encapsulated library
- Check if logging library can have pluggable logging frameworks like winston, buyon, cabin etc
- create an endpoint or a situation where application crashes (to see log stack) and returns a 500 with an central exception handler

## Rest API with Typescript

- https://rsbh.dev/blog/rest-api-with-express-typescript
- https://github.com/rsbh/express-typescript
- https://stackoverflow.com/questions/66365090/introducing-a-express-middleware-in-nodejs-typescript-oop

## OpenAPI
Hints:
- The order how middlewares are called is important!

Links:
- https://medium.com/bb-tutorials-and-thoughts/how-to-add-swagger-to-nodejs-rest-api-typescript-version-5a63953c993b

## Error Handling
Requirements
- All exceptions should be handled gracefully (application should not stop working)
- A meaningful log entry has to be generated containing the trace id
- An error code has to be sent back (internal server error)
- build in a possibility to intentionally let the application crash (maybe endpoint or some parameters)

Links
- https://jonwebb.dev/2021/05/22/error-handling-middleware-express-typescript/

## Correlation ID

- https://medium.com/@evgeni.kisel/add-correlation-id-in-node-js-applications-fde759eed5e3


## Logging
- https://adrianhesketh.com/2017/12/07/adding-a-timestamp-and-additional-fields-to-log-entries-with-winston-for-node-js/
- https://coralogix.com/blog/complete-winston-logger-guide-with-hands-on-examples/
- https://levelup.gitconnected.com/better-logs-for-expressjs-using-winston-and-morgan-with-typescript-1c31c1ab9342
- http://tostring.it/2014/06/23/advanced-logging-with-nodejs/
- https://www.loggly.com/ultimate-guide/node-logging-basics/
- https://stackoverflow.com/questions/50048193/how-are-you-supposed-to-create-winston-logger-stream-for-morgan-in-typescript

# DataDog

- https://docs.datadoghq.com/agent/logs/?tab=tailfiles
- https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#installation