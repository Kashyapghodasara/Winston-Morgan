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

/* 
==>  Step 3: Use the logger with custom levels
-------------------------------------------------
logger.critical('This is a critical message in red');
logger.error('This is an error message in red');
logger.warn('This is a warning message in yellow');
logger.success('This is a success message in green');
logger.info('This is an info message in blue');
logger.debug('This is a debug message in magenta'); 
*/

/*
==> Standard Available Colors 
----------------------------------
black
red
green
yellow
blue
magenta
cyan
white
gray (light black)
brightRed
brightGreen
brightYellow
brightBlue
brightMagenta
brightCyan
brightWhite 
*/