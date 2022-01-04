import { EditorLayout } from '../../components/organisms/EditorLayout';
import { SVGParamFieldID, textPlaceHolder } from '../helper/constants';

export const paramFieldStateHandler = (editorLayout: EditorLayout) => ({
  setAreFieldsEnabled: (
    fieldNames: SVGParamFieldID[],
    isEnabled: boolean = true
  ) => {
    fieldNames.forEach(fieldName => {
      const doesInputRangeTwoFields = [
        SVGParamFieldID.STROKE_OPACITY,
        SVGParamFieldID.FILL_OPACITY,
      ].includes(fieldName);
      const paramField = editorLayout?.shadowRoot
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
  editorLayout?: EditorLayout,
  isVisible?: boolean
) => {
  const source = editorLayout?.shadowRoot?.getElementById(
    'right-input-section'
  );
  if (source) {
    source.style.visibility = isVisible ? 'visible' : 'hidden';
    isVisible
      ? source.removeAttribute('disabled')
      : source.setAttribute('disabled', '');
  }
};

export const getTextFromSource = (editorLayout?: EditorLayout) => {
  const source = editorLayout?.shadowRoot?.getElementById(
    'right-input-section'
  );
  const text =
    source?.querySelector('#text-input')?.getAttribute('value') ??
    textPlaceHolder;
  source?.querySelector('#text-input')?.setAttribute('value', text);
  return text;
};
