import './components/pages/SVGEditor';
import './components/templates/EditorTemplate';
import { EditorTemplateProps } from './components/templates/EditorTemplate/EditorTemplate.types';
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'svg-editor': SVGEditor;
            'editor-template': EditorTemplate;
        }
        interface SVGEditor {
        }
        interface EditorTemplate extends EditorTemplateProps {
        }
    }
}
