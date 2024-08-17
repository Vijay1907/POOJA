import React, { useState } from 'react';

const Description = ({ description, maxLength = 50 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <p className="text-gray-600 text-sm mb-4">
      {isExpanded ? description : `${description.slice(0, maxLength)}${description.length > maxLength ? '...' : ''}`}
      {description.length > maxLength && (
        <button
          onClick={toggleExpand}
          className="text-blue-500 ml-2"
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      )}
    </p>
  );
};

export default Description;
