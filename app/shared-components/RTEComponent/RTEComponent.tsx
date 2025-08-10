import './RTEComponent.module.css';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { EditorState, ContentState, convertToRaw, Modifier } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import classNames from 'classnames';
import style from './RTEComponent.module.css';
// import { RxFontBold } from 'react-icons/rx';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

export interface RTEComponentProps {
  // Define your props here
  content?: string;
  placeholder?: string;
  updatePostData?: (data: any) => void;
  className?: string;
}

export const RTEComponent: React.FC<RTEComponentProps> = ({
  content,
  placeholder = 'Type or paste the body of your post.',
  updatePostData,
  className,
}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  // TODO: Add condition for when the payload is
  // empty to not be parsed as html and updated
  useEffect(() => {
    if (content && typeof window !== 'undefined') {
      const htmlToDraft = require('html-to-draftjs').default;
      const contentBlock = htmlToDraft(content);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        setEditorState(EditorState.createWithContent(contentState));
      }
    }
  }, []);

  useEffect(() => {
    if (updatePostData) {
      const contentState = editorState.getCurrentContent();
      const htmlContent = draftToHtml(convertToRaw(contentState));
      updatePostData(htmlContent);
    }
  }, [editorState]);

  // const handleEditorStateChange = (state: EditorState) => {
  //   setEditorState(state);
  // };

  const handlePastedText = (
    text: string,
    html: string,
    editorState: EditorState,
    onChange: (editorState: EditorState) => void
  ): boolean => {
    // const contentState = ContentState.createFromText(text);
    // const newEditorState = EditorState.push(
    //   editorState,
    //   contentState,
    //   'insert-characters'
    // );
    // onChange(newEditorState); // Use onChange to update the editor state
    // return true; // Return true to indicate that pasting is handled
    const contentState = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();

    const newContentState = Modifier?.insertText(
      contentState,
      selectionState,
      text
    );

    const newEditorState = EditorState.push(
      editorState,
      newContentState,
      'insert-characters'
    );

    onChange(newEditorState);
    return true;
  };

  return (
    <div>
      {/* // TODO: Somehow register css in the .css file and overrideStyle, not working now. */}
      {/* // All configs can be found here: https://jpuri.github.io/react-draft-wysiwyg/#/docs?_k=jjqinp:~:text=/%3E-,toolbar,-toolbar%20property%20provides */}
      <style jsx global>
        {`
          .public-DraftStyleDefault-block {
            fontsize: var(--w-fontSize-tag);
          }
          .editor-content .public-DraftEditorPlaceholder-hasFocus {
            display: none !important;
          }
          .editor-container .public-DraftEditor-content::before {
            content: attr(
              data-placeholder
            ); /* Get the placeholder text from the attribute */
            color: #999; /* Example color */
            font-style: italic; /* Example style */
            position: absolute;
            top: 0;
            left: 0;
            pointer-events: none; /* Prevent interaction with the placeholder */
          }
        `}
      </style>
      <Editor
        placeholder={placeholder}
        editorState={editorState}
        onEditorStateChange={setEditorState}
        handlePastedText={handlePastedText}
        toolbarClassName="editor-toolbar"
        wrapperClassName="editor-container"
        editorClassName={classNames('editor-content', className)}
        toolbarStyle={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
        }}
        toolbar={{
          options: [
            'inline',
            // 'blockType',
            // 'fontSize',
            // 'fontFamily',
            'list',
            // 'textAlign',
            // 'colorPicker',
            'link',
            // 'embedded',
            'emoji',
            // 'image',
            // 'remove',
            // 'history',
          ],
          inline: {
            // inDropdown: false,
            // className: undefined,
            // component: undefined,
            // dropdownClassName: undefined,
            options: [
              'bold',
              'italic',
              'underline',
              // 'strikethrough',
              // 'monospace',
              'superscript',
              // 'subscript',
            ],
            // bold: { icon: bold, className: undefined },
            // italic: { icon: italic, className: undefined },
            // underline: { icon: underline, className: undefined },
            // strikethrough: { icon: strikethrough, className: undefined },
            // monospace: { icon: monospace, className: undefined },
            // superscript: { icon: superscript, className: undefined },
            // subscript: { icon: subscript, className: undefined },
          },
          list: {
            // inDropdown: false,
            // className: undefined,
            // component: undefined,
            // dropdownClassName: undefined,
            options: [
              'unordered',
              'ordered',
              // 'indent',
              // 'outdent'
            ],
            // unordered: { icon: unordered, className: undefined },
            // ordered: { icon: ordered, className: undefined },
            // indent: { icon: indent, className: undefined },
            // outdent: { icon: outdent, className: undefined },
          },
          emoji: {
            emojis: [
              '🔷',
              '🔵',
              '❌',
              '✔️',
              '☑️',
              '✅',
              '🔗',
              '📧',
              '🎙️',
              '🍲',
              '🌱',
              '🌿',
              '👆',
              '👁️',
              '🔑',
              '📌',
              '🔔',
              '⏱️',
              '⌛',
              '🌍',
              '🌐',
              '🎉',
              '📹',
              '❤️',
              '📍',
              '🎯',
              '🍴',
              '🎓',
              '🔖',
              '🕒',
              '📅',
              '✨',
              '💡',
              '🎬',
              '👀',
              '💭',
              '🔍',
              // '😀',
              // '😁',
              // '😂',
              // '😃',
              // '😉',
              // '😋',
              // '😎',
              // '😍',
              // '😗',
              // '🤗',
              // '🤔',
              // '😣',
              // '😫',
              // '😴',
              // '😌',
              // '🤓',
              // '😛',
              // '😜',
              // '😠',
              // '😇',
              // '😷',
              // '😈',
              // '👻',
              // '😺',
              // '😸',
              // '😹',
              // '😻',
              // '😼',
              // '😽',
              // '🙀',
              // '🙈',
              // '🙉',
              // '🙊',
              // '👼',
              // '👮',
              // '🕵',
              // '💂',
              // '👳',
              // '🎅',
              // '👸',
              // '👰',
              // '👲',
              // '🙍',
              // '🙇',
              '🚶',
              '🏃',
              '💃',
              '⛷',
              '🏂',
              '🏌',
              '🏄',
              '🚣',
              '🏊',
              '⛹',
              '🏋',
              '🚴',
              '👫',
              '💪',
              '👈',
              '👉',
              '👉',
              '👆',
              '👇',
              '🖖',
              '🤘',
              '🖐',
              '👌',
              '👍',
              '👎',
              '✊',
              '👊',
              '👏',
              '🙌',
              '🙏',
              '🐵',
              '🐶',
              '🐇',
              '🐥',
              '🐸',
              '🐌',
              '🐛',
              '🐜',
              '🐝',
              '🍉',
              '🍄',
              '🍔',
              '🍤',
              '🍨',
              '🍪',
              '🎂',
              '🍰',
              '🍾',
              '🍷',
              '🍸',
              '🍺',
              '🌍',
              '🚑',
              '⏰',
              '🌙',
              '🌝',
              '🌞',
              '⭐',
              '🌟',
              '🌠',
              '🌨',
              '🌩',
              '⛄',
              '🔥',
              '🎄',
              '🎈',
              '🎉',
              '🎊',
              '🎁',
              '🎗',
              '🏀',
              '🏈',
              '🎲',
              '🔇',
              '🔈',
              '📣',
              '🔔',
              '🎵',
              '🎷',
              '💰',
              '🖊',
              '📅',
              '✅',
              '❎',
              '💯',
            ],
          },
          link: {
            // inDropdown: false,
            // className: undefined,
            // component: undefined,
            popupClassName: style.linkPopup,
            // dropdownClassName: undefined,
            showOpenOptionOnHover: true,
            defaultTargetOption: '_blank',
            options: ['link', 'unlink'],
            // link: { icon: link, className: undefined },
            // unlink: { icon: unlink, className: undefined },
            // linkCallback: undefined,
          },
          // history: { inDropdown: true },
        }}
      />
    </div>
  );
};

export default RTEComponent;
