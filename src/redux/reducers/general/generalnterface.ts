export interface GeneralState {
  isLoggedIn: boolean;
  flashMessage: FlashMessage;
}

export interface FlashMessage {
  message: string;
  messageType: MessageTypes;
  visibility?: boolean;
}

export enum MessageTypes {
  Fail = 'Fail',
  Success = 'Success',
  Warning = 'Warning',
}
