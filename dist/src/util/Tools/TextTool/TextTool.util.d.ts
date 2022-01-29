import { FooterFields } from '../../../components/molecules/FooterFields';
import { EditorTemplate } from '../../../components/templates/EditorTemplate';
import { SVGParamFieldID } from '../../helper/constants';
export declare const paramFieldStateHandler: (footerFields: FooterFields) => {
    setAreFieldsEnabled: (fieldNames: SVGParamFieldID[], isEnabled?: boolean) => void;
};
export declare const setTextParamsSourceVisibility: (footerFields?: FooterFields | undefined, isVisible?: boolean | undefined) => void;
export declare const getTextFromSource: (svgEditor?: EditorTemplate | undefined) => string;
