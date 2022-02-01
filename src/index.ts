import './components/pages/SVGEditor';
import { SVGEditor as SVGEditorComponent } from './components/pages/SVGEditor';
import './components/templates/EditorTemplate';
import { EditorTemplate as EditorTemplateComponent } from './components/templates/EditorTemplate';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'svg-editor': SVGEditor;
      'editor-template': EditorTemplate;
    }
    interface SVGEditor extends SVGEditorComponent {}
    interface EditorTemplate extends EditorTemplateComponent {}
  }
}
