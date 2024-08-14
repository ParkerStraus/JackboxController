// src/ParsedContent.js
import React from 'react';
import parse from 'html-react-parser';

const ParsedContent = ({ htmlString, handleButtonClick, handleTextChange }) => {
  const content = parse(htmlString, {
    replace: (domNode) => {
      if (domNode.name === 'button') {
        return (
          <button
            {...domNode.attribs}
            onClick={() => handleButtonClick(domNode.attribs['data-param'])}
          >
            {domNode.children[0]?.data}
          </button>
        );
      }
      if (domNode.name === 'input' && domNode.attribs.type === 'text') {
        return (
          <input
            {...domNode.attribs}
            onChange={(e) => handleTextChange(e.target.value, domNode.attribs['data-param'])}
          />
        );
      }
      return domNode;
    },
  });

  return <div>{content}</div>;
};

export default ParsedContent;
