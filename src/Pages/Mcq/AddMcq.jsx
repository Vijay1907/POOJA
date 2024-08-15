import { useState } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { useNavigate, useParams } from 'react-router-dom';
import { privateRequest } from '../../configs/RequestMethod';

function AddMcq() {
  const { id } = useParams(); // Replace with your actual topicId
  const navigate = useNavigate();

  const [testName, setTestName] = useState('');
  const [marks, setMarks] = useState('');
  const [time, setTime] = useState('');

  const [questions, setQuestions] = useState([
    {
      question: '',
      options: ['', '', '', ''],
      remarks: '',
    },
  ]);
  const [answers, setAnswers] = useState([]);

  const handleTestNameChange = (e) => {
    setTestName(e.target.value);
  };

  const handleMarksChange = (e) => {
    setMarks(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleQuestionChange = (questionIndex, field, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (questionIndex, value) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = value;
    setAnswers(newAnswers);
  };

  const handleRemarksChange = (questionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].remarks = value;
    setQuestions(newQuestions);
  };

  const addQuestion = () => {
    const newQuestions = [...questions];
    newQuestions.push({
      question: '',
      options: ['', '', '', ''],
      remarks: '',
    });
    setQuestions(newQuestions);
  };

  const deleteQuestion = (questionIndex) => {
    const newQuestions = [...questions];
    newQuestions.splice(questionIndex, 1);
    setQuestions(newQuestions);

    const newAnswers = [...answers];
    newAnswers.splice(questionIndex, 1);
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    const payload = {
      testName: testName,
      marks: marks,
      time: time,
      questions: questions.map((question, index) => ({
        question: question.question,
        options: question.options,
        remarks: question.remarks,
      })),
      answers,
      topicId: id,
    };
    console.log(payload);
    // You can send the payload to an API or perform other actions here
    try {
      const response = await privateRequest.post('/study/test', payload);
      console.log(response.data);
      navigate('/subject');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar title="Add MCQ" />
      <Sidebar />
      <div className="max-w-xl m-auto">
        <div className="">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Test Name"
              value={testName}
              onChange={handleTestNameChange}
              className="w-full mb-4 px-3 py-2 mt-6 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <input
              type="number"
              placeholder="Marks"
              value={marks}
              onChange={handleMarksChange}
              className="w-full mb-4 px-3 py-2 mt-6 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <input
              type="number"
              placeholder="Time"
              value={time}
              onChange={handleTimeChange}
              className="w-full mb-4 px-3 py-2 mt-6 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>

          {questions.map((question, questionIndex) => (
            <div key={questionIndex} className="mt-4 p-2 bg-white rounded-md border border-gray-300">
              <h1 className="mb-4 font-bold text-slate-600 text-lg">Ques No. {questionIndex + 1}</h1>
              <input
                type="text"
                placeholder="Question"
                value={question.question}
                onChange={(e) => handleQuestionChange(questionIndex, 'question', e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              />
              {question.options.map((option, optionIndex) => (
                <input
                  key={optionIndex}
                  type="text"
                  placeholder={`Option ${optionIndex + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                  className="w-full mt-2 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                />
              ))}
              <input
                type="number"
                placeholder="Correct Answer"
                value={answers[questionIndex] || ''}
                onChange={(e) => handleAnswerChange(questionIndex, e.target.value)}
                className="w-full mt-2 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                min={0}
  max={3}
              />
              <input
                type="text"
                placeholder="Remarks"
                value={question.remarks}
                onChange={(e) => handleRemarksChange(questionIndex, e.target.value)}
                className="w-full mt-2 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              />
              {questionIndex !== 0 && (
                <button
                  type="button"
                  onClick={() => deleteQuestion(questionIndex)}
                  className="mt-2 px-2 py-1 bg-red-500 text-white rounded-md focus:outline-none focus:bg-red-600"
                >
                  Delete Question
                </button>
              )}
            </div>
          ))}
          <div className="mb-8">
            <button
              type="button"
              onClick={addQuestion}
              className="mt-4 px-3 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:bg-blue-600"
            >
              Add Question
            </button>
            <button
              onClick={handleSubmit}
              className="mt-6 ml-4 px-4 py-2 bg-purple-500 text-white rounded-md focus:outline-none focus:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddMcq;
