import React from 'react';

interface TextListProps {
  title: string;
  texts: string[];
  icon: React.ReactNode;
}

const TextList: React.FC<TextListProps> = ({ title, texts, icon }) => {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold mb-2 flex items-center">
        {icon}
        <span className="ml-2">{title}</span>
      </h2>
      <ul className="bg-gray-100 rounded-md p-2">
        {texts.map((text, index) => (
          <li key={index} className="mb-2 last:mb-0">
            {text}
          </li>
        ))}
        {texts.length === 0 && (
          <li className="text-gray-500 italic">No hay textos {title.toLowerCase()}</li>
        )}
      </ul>
    </div>
  );
};

export default TextList;