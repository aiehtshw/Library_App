// Function to log a message in development mode
const debugLog = (message: string) => {
  if (__DEV__) {
    console.log(message);
  }
};

// Function to log an error in development mode
const debugLogError = (error: any) => {
  if (__DEV__) {
    if (error instanceof Error) {
      console.error('Error: ' + error.message);
    } else {
      console.error('Error: ' + JSON.stringify(error));
    }
  }
};

export {debugLog, debugLogError};
