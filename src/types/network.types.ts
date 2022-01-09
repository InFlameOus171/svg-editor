const GeneralMessageEvents = [
  'message',
  'ping',
  'pong',
  'get-shapes',
  'delete-shapes',
  'update-shapes',
] as const;
const ClientMessageEvents = [
  'join-room',
  'disconnect',
  ...GeneralMessageEvents,
] as const;
const ServerMessageEvents = ['error', ...GeneralMessageEvents] as const;

export const MessageEvents = [
  ...ServerMessageEvents,
  ...ClientMessageEvents,
  ...GeneralMessageEvents,
] as const;

export enum WS_EVENTS {
  MESSAGE = 'message',
  PING = 'ping',
  PONG = 'pong',
  GET_SHAPES = 'get-shapes',
  DELETE_SHAPES = 'delete-shapes',
  UPDATE_SHAPES = 'update-shapes',
  JOIN_ROOM = 'join-room',
  DISCONNECT = 'disconnect',
  ERROR = 'error',
}
export type ServerMessageEventType = typeof ServerMessageEvents[number];
export type ClientMessageEventType = typeof MessageEvents[number];
export type GeneralMessageEventType = typeof GeneralMessageEvents[number];
export type MessageEventType = typeof MessageEvents[number];

export type ParsedData = {
  event?: WS_EVENTS;
  user?: string;
  userId?: string;
  value?: string;
  [key: string]: any;
};
