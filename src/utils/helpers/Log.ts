const debugLog = (message: string) => {
  if (__DEV__) {
    console.log(message);
  }
};

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
