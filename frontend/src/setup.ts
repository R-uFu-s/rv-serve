// import {
//   autocompletion,
//   closeBrackets,
//   closeBracketsKeymap,
//   completionKeymap,
// } from "@codemirror/autocomplete";
// import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
// import {
//   bracketMatching,
//   defaultHighlightStyle,
//   foldGutter,
//   foldKeymap,
//   indentOnInput,
//   syntaxHighlighting,
// } from "@codemirror/language";
// import { lintKeymap } from "@codemirror/lint";
// import { highlightSelectionMatches, searchKeymap } from "@codemirror/search";
// import { EditorState, Extension } from "@codemirror/state";
// import {
//   crosshairCursor,
//   drawSelection,
//   dropCursor,
//   highlightActiveLine,
//   highlightActiveLineGutter,
//   highlightSpecialChars,
//   keymap,
//   lineNumbers,
//   rectangularSelection,
// } from "@codemirror/view";

// // NOTE (gavinleroy) this file was copied from @codemirror so I can play around
// // with local changes. I suspect that as I explore different bits of functionality
// // I'll remove / add things from here.

// // (The superfluous function calls around the list of extensions work
// // around current limitations in tree-shaking software.)

// /// This is an extension value that just pulls together a number of
// /// extensions that you might want in a basic editor. It is meant as a
// /// convenient helper to quickly set up CodeMirror without installing
// /// and importing a lot of separate packages.
// ///
// /// Specifically, it includes...
// ///
// ///  - [the default command bindings](#commands.defaultKeymap)
// ///  - [line numbers](#view.lineNumbers)
// ///  - [special character highlighting](#view.highlightSpecialChars)
// ///  - [the undo history](#commands.history)
// ///  - [a fold gutter](#language.foldGutter)
// ///  - [custom selection drawing](#view.drawSelection)
// ///  - [drop cursor](#view.dropCursor)
// ///  - [multiple selections](#state.EditorState^allowMultipleSelections)
// ///  - [reindentation on input](#language.indentOnInput)
// ///  - [the default highlight style](#language.defaultHighlightStyle) (as fallback)
// ///  - [bracket matching](#language.bracketMatching)
// ///  - [bracket closing](#autocomplete.closeBrackets)
// ///  - [autocompletion](#autocomplete.autocompletion)
// ///  - [rectangular selection](#view.rectangularSelection) and [crosshair cursor](#view.crosshairCursor)
// ///  - [active line highlighting](#view.highlightActiveLine)
// ///  - [active line gutter highlighting](#view.highlightActiveLineGutter)
// ///  - [selection match highlighting](#search.highlightSelectionMatches)
// ///  - [search](#search.searchKeymap)
// ///  - [linting](#lint.lintKeymap)
// ///
// /// (You'll probably want to add some language package to your setup
// /// too.)
// ///
// /// This extension does not allow customization. The idea is that,
// /// once you decide you want to configure your editor more precisely,
// /// you take this package's source (which is just a bunch of imports
// /// and an array literal), copy it into your own code, and adjust it
// /// as desired.
// export const basicSetup: Extension = (() => [
//   lineNumbers(),
//   highlightActiveLineGutter(),
//   highlightSpecialChars(),
//   history(),
//   foldGutter(),
//   drawSelection(),
//   dropCursor(),
//   EditorState.allowMultipleSelections.of(true),
//   indentOnInput(),
//   syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
//   bracketMatching(),
//   closeBrackets(),
//   autocompletion(),
//   rectangularSelection(),
//   crosshairCursor(),
//   highlightActiveLine(),
//   highlightSelectionMatches(),
//   keymap.of([
//     ...closeBracketsKeymap,
//     ...defaultKeymap,
//     ...searchKeymap,
//     ...historyKeymap,
//     ...foldKeymap,
//     ...completionKeymap,
//     ...lintKeymap,
//   ]),
// ])();

// /// A minimal set of extensions to create a functional editor. Only
// /// includes [the default keymap](#commands.defaultKeymap), [undo
// /// history](#commands.history), [special character
// /// highlighting](#view.highlightSpecialChars), [custom selection
// /// drawing](#view.drawSelection), and [default highlight
// /// style](#language.defaultHighlightStyle).
// export const minimalSetup: Extension = (() => [
//   highlightSpecialChars(),
//   history(),
//   drawSelection(),
//   syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
//   keymap.of([...defaultKeymap, ...historyKeymap]),
// ])();

// export { EditorView } from "@codemirror/view";
import { EditorState, Extension } from '@codemirror/state';
import { highlightSelectionMatches, searchKeymap } from '@codemirror/search';
import {
    indentWithTab,
    history,
    defaultKeymap,
    historyKeymap,
} from '@codemirror/commands';
import {
    foldGutter,
    indentOnInput,
    indentUnit,
    bracketMatching,
    foldKeymap,
    syntaxHighlighting,
    defaultHighlightStyle,
} from '@codemirror/language';
import {
    closeBrackets,
    autocompletion,
    closeBracketsKeymap,
    completionKeymap,
} from '@codemirror/autocomplete';
import {
    lineNumbers,
    highlightActiveLineGutter,
    highlightSpecialChars,
    drawSelection,
    dropCursor,
    rectangularSelection,
    crosshairCursor,
    highlightActiveLine,
    keymap,
    EditorView,
} from '@codemirror/view';

// Theme
import { oneDark } from '@codemirror/theme-one-dark';

// Language
import { rust } from '@codemirror/lang-rust';

// Type for the options parameter
interface EditorOptions {
    oneDark?: boolean; // Optional boolean property
}

export const extensions: Extension[] = [
        lineNumbers(),
        highlightActiveLineGutter(),
        highlightSpecialChars(),
        history(),
        foldGutter(),
        drawSelection(),
        indentUnit.of('    '),
        EditorState.allowMultipleSelections.of(true),
        indentOnInput(),
        bracketMatching(),
        closeBrackets(),
        autocompletion(),
        rectangularSelection(),
        crosshairCursor(),
        highlightActiveLine(),
        highlightSelectionMatches(),
        keymap.of([
            indentWithTab,
            ...closeBracketsKeymap,
            ...defaultKeymap,
            ...historyKeymap,
            ...foldKeymap,
            ...completionKeymap,
        ]),
        rust(),
        syntaxHighlighting(defaultHighlightStyle, { fallback: true }),];

function createEditorState(initialContents: string, options: EditorOptions = {}): EditorState {
    let extensions: Extension[] = [
        lineNumbers(),
        highlightActiveLineGutter(),
        highlightSpecialChars(),
        history(),
        foldGutter(),
        drawSelection(),
        indentUnit.of('    '),
        EditorState.allowMultipleSelections.of(true),
        indentOnInput(),
        bracketMatching(),
        closeBrackets(),
        autocompletion(),
        rectangularSelection(),
        crosshairCursor(),
        highlightActiveLine(),
        highlightSelectionMatches(),
        keymap.of([
            indentWithTab,
            ...closeBracketsKeymap,
            ...defaultKeymap,
            ...historyKeymap,
            ...foldKeymap,
            ...completionKeymap,
        ]),
        rust(),
        syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
    ];

    if (options.oneDark) extensions.push(oneDark);

    return EditorState.create({
        doc: initialContents,
        extensions,
    });
}

// The parent parameter is now explicitly typed as HTMLElement
function createEditorView(state: EditorState, parent: HTMLElement): EditorView {
    return new EditorView({ state, parent });
}

export const basicSetup: Extension = (() => [
  lineNumbers(),
  highlightActiveLineGutter(),
  highlightSpecialChars(),
  history(),
  foldGutter(),
  drawSelection(),
  dropCursor(),
  EditorState.allowMultipleSelections.of(true),
  indentOnInput(),
  syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
  bracketMatching(),
  closeBrackets(),
  autocompletion(),
  rectangularSelection(),
  crosshairCursor(),
  highlightActiveLine(),
  highlightSelectionMatches(),
  keymap.of([
    ...closeBracketsKeymap,
    ...defaultKeymap,
    ...searchKeymap,
    ...historyKeymap,
    ...foldKeymap,
    ...completionKeymap,
  ]),
])();

export { createEditorState, createEditorView };