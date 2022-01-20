import { FooterFields } from '../../../components/molecules/FooterFields';
import { SVGEditor } from '../../../components/organisms/SVGEditor';
import { SVGParamFieldID, textPlaceHolder } from '../../helper/constants';

export const paramFieldStateHandler = (footerFields: FooterFields) => ({
  setAreFieldsEnabled: (
    fieldNames: SVGParamFieldID[],
    isEnabled: boolean = true
  ) => {
    fieldNames.forEach(fieldName => {
      const doesInputRangeTwoFields = [
        SVGParamFieldID.STROKE_OPACITY,
        SVGParamFieldID.FILL_OPACITY,
      ].includes(fieldName);
      const paramField = footerFields?.shadowRoot
        ?.getElementById('footer-input')
        ?.querySelector('#' + fieldName);
      if (isEnabled) {
        paramField?.removeAttribute('disabled');
        if (doesInputRangeTwoFields) {
          paramField?.previousElementSibling?.removeAttribute('disabled');
        }
      } else {
        paramField?.setAttribute('disabled', '');
        if (doesInputRangeTwoFields) {
          paramField?.previousElementSibling?.setAttribute('disabled', '');
        }
      }
    });
  },
});

export const setTextParamsSourceVisibility = (
  footerFields?: FooterFields,
  isVisible?: boolean
) => {
  const source = footerFields?.shadowRoot?.getElementById(
    'right-input-section'
  );
  if (source) {
    source.style.visibility = isVisible ? 'visible' : 'hidden';
    isVisible
      ? source.removeAttribute('disabled')
      : source.setAttribute('disabled', '');
  }
};

export const getTextFromSource = (svgEditor?: SVGEditor) => {
  const source = svgEditor?.shadowRoot?.getElementById('right-input-section');
  const text =
    source?.querySelector('#text-input')?.getAttribute('value') ??
    textPlaceHolder;
  source?.querySelector('#text-input')?.setAttribute('value', text);
  return text;
};
