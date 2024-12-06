# Winston-Morgan
---------------------------------------------------------------------------

## Winston Logger:
Winston is a versatile and popular logging library for Node.js. It supports multiple logging levels (like info, warn, error) and can output logs in various formats, such as JSON or plain text. Winston allows logs to be stored in different transports (e.g., console, files, HTTP endpoints, or databases). It is highly customizable, allowing users to configure different log levels for different environments and add metadata to logs.

* Key Features of Winston:

1. Supports multiple transports (console, file, HTTP, etc.)<br>
2. Customizable log formats (JSON, text, etc.)<br>
3. Different log levels (info, warn, error, etc.)<br>
4. Easy to integrate with other services like cloud logging tools


## Morgan Logger:
Morgan is a middleware logger for HTTP requests in Node.js applications, commonly used with Express. It logs incoming HTTP requests in a predefined format (e.g., combined, common, dev) and is especially useful for tracking request and response activities, such as HTTP methods, status codes, and request times.

* Key Features of Morgan:
  
1. Middleware for HTTP request logging in Express apps<br>
2. Supports multiple predefined log formats (e.g., "combined", "dev", "tiny")
3. Option to log to files or streams <br>
4. Lightweight and easy to integrate

---------------------------------------------------------------------------------------------

## Create a ```logger.js``` file
This file is commonly used by me for various projects and tasks.

```
import { createLogger, format, transports } from 'winston';
const { combine, timestamp, colorize, printf } = format;

// Step 1: Define custom log levels and colors
const customLogLevels = {
  levels: {
    critical: 0,
    error: 1,
    warn: 2,
    success: 3,
    info: 4,
    debug: 5,
  },
  colors: {
    critical: 'brightRed',
    error: 'red',
    warn: 'yellow',
    success: 'green',  
    info: 'brightBlue',
    debug: 'magenta',
  },
};

// Step 2: Configure Winston to use custom levels and colors
const logger = createLogger({
  levels: customLogLevels.levels, // Apply custom levels
  level: 'debug', // Default level to 'debug'
  format: combine(
    colorize({ all: true }), // Colorize logs
    timestamp({ format: 'YYYY-MM-DD-hh' }), // Add timestamp to logs
    printf(({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`) // Custom log format
  ),
  transports: [
    new transports.Console(), // Log to console
    new transports.File({ filename: 'app.log' }), // Log to file
  ],
});

// Apply custom colors globally for the logger
import { addColors } from 'winston';
addColors(customLogLevels.colors);


export default logger;
```
## ```index.js``` file 
Note :- This is a main Root file of Directory.

* Import 
```
import logger from "./logger.js";
import morgan from "morgan";
const morganFormat = ":method :url :status :response-time ms";
```

*Middleware
```
app.use(
    morgan(morganFormat, {
      stream: {
        write: (message) => {
          const logObject = {
            method: message.split(" ")[0],
            url: message.split(" ")[1],   
            status: message.split(" ")[2],
            responseTime: message.split(" ")[3],
          };
          logger.info(JSON.stringify(logObject));
        },
      },
    })
  );
```
* Standard Colors Are
1. black <br>
2. red <br>
3. green <br>
4. yellow <br>
5. blue <br>
6. magenta <br>
7. cyan <br>
8. white <br>
9. gray (light black) <br>
10. brightRed <br>
11. brightGreen <br>
12. brightYellow <br>
13. brightBlue <br>
14. brightMagenta <br>
15. brightCyan <br>
16. brightWhite

* Loggers Are
  
 1. This is a critical message in red<br>
```logger.critical('This is a critical message in red');```<br>
 2. This is an error message in red<br>
```logger.error('This is an error message in red');```<br>
 3. This is a warning message in yellow<br>
```logger.warn('This is a warning message in yellow');```<br>
 4. This is a success message in green<br>
```logger.success('This is a success message in green');```<br>
 5. This is an info message in blue<br>
```logger.info('This is an info message in blue');```<br>
 6. This is a debug message in magenta<br>
```logger.debug('This is a debug message in magenta');```<br>
-------------------------------------------------------------------------------
-------------------------------------------------------------------------------
## This information and codebase are sourced from Hitesh Choudhary's teachings or projects.

## Special thanks to @hiteshchoudhary for their guidance and support! 🤝
