import { SVGEditor } from '../../../components/organisms/SVGEditor';
import { SVGParamFieldID } from '../../helper/constants';
export declare const paramFieldStateHandler: (svgEditor: SVGEditor) => {
    setAreFieldsEnabled: (fieldNames: SVGParamFieldID[], isEnabled?: boolean) => void;
};
export declare const setTextParamsSourceVisibility: (svgEditor?: SVGEditor | undefined, isVisible?: boolean | undefined) => void;
export declare const getTextFromSource: (svgEditor?: SVGEditor | undefined) => string;
