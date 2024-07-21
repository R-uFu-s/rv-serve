import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { basicSetup, extensions } from './setup';
import { Extension, EditorState } from "@codemirror/state";
import { EditorView, ViewUpdate } from "@codemirror/view";
import axios from 'axios';

declare function helpers(param: string): void;

const defaultExample: string = `
fn main() {
    let x = 7;
    let y = x;
}
`.trim();

class Editor {
  private view: EditorView;

  public constructor (
    editorContainer: HTMLElement,
    code: string = defaultExample,
  ) {
    let initial_state = EditorState.create({
      doc: code,
      extensions: extensions
    });
    
    this.view = new EditorView({
      state: initial_state,
      parent: editorContainer
    });
  }

  public getCurrentCode(): string {
    return this.view.state.doc.toString();
  }
}

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [editor, setEditor] = useState<Editor | null>(null);

  useEffect(() => {
    const editorElement = document.getElementById('editor')!;
    if (editorElement) {
      const newEditor = new Editor(editorElement);
      setEditor(newEditor);
    }
  }, []);

  const handleClick = async () => {
    if (!editor) return;

    setIsLoading(true);
    const code = editor.getCurrentCode();

    try {
      const response = await axios.post('http://127.0.0.1:8080/submit-code', { code });

      if (response.status === 200) {
        await reloadSvgs();
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const reloadSvgs = async () => {
    const timestamp = new Date().getTime();
    const codePanel = document.querySelector('.code_panel') as HTMLObjectElement;
    const tlPanel = document.querySelector('.tl_panel') as HTMLObjectElement;

    if (codePanel) {
      codePanel.data = `ex-assets/vis_code.svg?timestamp=${timestamp}`;
    }

    if (tlPanel) {
      tlPanel.data = `ex-assets/vis_timeline.svg?timestamp=${timestamp}`;
    }
  };

  return (
    <div id="page-wrapper" className="page-wrapper">
      <button className="cm-button" id="gen-button" onClick={handleClick} disabled={isLoading}>
        {isLoading ? <span className="loader"></span> : 'Generate Visualization'}
      </button>
      <div className="page">
        <div id="menu-bar" className="menu-bar sticky">
          <div id="content" className="content">
            <main>
              <div className="flex-container vis_block" style={{ position: 'relative', marginLeft: '75px', marginRight: '75px', display: 'flex' }}>
                <object 
                  type="image/svg+xml" 
                  className="ex2 code_panel" 
                  data="ex-assets/vis_code.svg">
                </object>
                <object 
                  type="image/svg+xml" 
                  className="ex2 tl_panel"
                  style={{width: 'auto'}}
                  data="ex-assets/vis_timeline.svg" 
                  onMouseEnter={() => helpers('ex2')}>
                </object>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;