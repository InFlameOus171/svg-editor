import { EditorLayout } from '../../components/organisms/EditorLayout';
import { textPlaceHolder } from '../helper/constants';

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
