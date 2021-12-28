import { supportedStyles } from '../util/constants/styles';

type styleTuple = typeof supportedStyles;
export type SupportedStyle = styleTuple[number];
export type SupportedStyles = Partial<Record<SupportedStyle, string>>;
