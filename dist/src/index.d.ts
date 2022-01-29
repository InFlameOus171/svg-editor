import './components/pages/SVGEditor';
declare global {
    namespace JSX {
        interface IntrinsicElements {
            'svg-editor': SVGEditor;
        }
        interface SVGEditor {
        }
    }
}
