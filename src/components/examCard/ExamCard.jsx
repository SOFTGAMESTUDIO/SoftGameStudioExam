import React from "react";

const ExamCard = ({ exam }) => {
  const { id, name, description, imageUrl, language } = exam;

  return (
    <div
    className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
    key={id}
  >
    <div className="flex justify-center">
      <img
        src={imageUrl}
        alt={name}
        className="h-60 object-contain object-center mb-6 rounded-xl"
      />
    </div>
    <h2 className="flex flex-wrap tracking-widest text-xs title-font font-medium text-cyan-400 mb-2">
      <span className="m-1 flex flex-wrap">Quiz</span>
    </h2>
    <h1 className="text-lg font-semibold text-white mb-4">
      {name}
    </h1>
    <p className="text-sm text-gray-600 mb-2">{description}</p>
    <p className="text-xs text-gray-500 mb-4">Language: {language}</p>
  </div>
  );
};

export default ExamCard;
