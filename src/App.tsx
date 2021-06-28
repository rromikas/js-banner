import { useState, useEffect } from "react";

interface Question {
  question: string;
  backgroundImage: string;
  answers: string[];
}

interface Video {
  title: string;
  url: string;
}

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [video, setVideo] = useState<Video>({ title: "", url: "" });
  const [answers, setAnswers] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/questions?orderBy=order,asc`
        ).then((x) => x.json());
        setQuestions(res);

        const res1 = await fetch(`${process.env.REACT_APP_API_URL}/video`).then((x) => x.json());
        setVideo(res1);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="flex max-w-600px w-full h-250px">
      <div className="w-5/12 bg-green-400 flex flex-col">
        <video src={video.url} autoPlay muted loop></video>
        <div className="flex-grow flex items-center justify-center text-xl font-medium text-white">
          {video.title}
        </div>
      </div>
      {questions.map((q, i) => (
        <img src={q.backgroundImage} key={`image-prealod-${i}`} className="hidden"></img>
      ))}
      {activeQuestion >= questions.length ? null : (
        <div
          className={`w-7/12 px-4 pt-4 pb-2 overflow-auto bg-center flex flex-col bg-cover`}
          style={{ backgroundImage: `url(${questions[activeQuestion].backgroundImage})` }}
        >
          <img src={questions[activeQuestion].backgroundImage} className="hidden" />
          <div className="flex-grow pb-3">
            <div className="flex">
              <div className="w-42px h-42px rounded-full bg-green-400 flex-shrink-0 mr-3"></div>
              <div className="bg-black bg-opacity-60 text-lg text-white px-2.5 py-1 rounded">
                {questions[activeQuestion].question}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap">
            {questions[activeQuestion].answers.map((a, ai) => (
              <div
                onClick={() => {
                  let arr = [...answers];
                  if (arr.length <= activeQuestion) {
                    setAnswers([...arr, a]);
                  } else {
                    arr[activeQuestion] = a;
                    setAnswers(arr);
                  }
                  setActiveQuestion((prev) => prev + 1);
                }}
                className={`${
                  activeQuestion < answers.length && answers[activeQuestion] === a
                    ? "bg-green-400 text-white"
                    : "bg-green-200 hover:bg-green-201"
                } cursor-pointer rounded-full select-none h-42px px-5 leading-42px mr-2 mb-2`}
                key={`answer-${ai}`}
              >
                {a}
              </div>
            ))}
            {activeQuestion === questions.length - 1 ? (
              <>
                <div>
                  <input
                    className="border-none outline-none rounded-full h-42px leading-42px px-3 mb-2 mr-2"
                    placeholder="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
                <div>
                  <input
                    className="border-none outline-none rounded-full h-42px leading-42px px-3 mb-2 mr-2"
                    placeholder="Enter your phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  ></input>
                </div>
                <div
                  onClick={() => {}}
                  className="bg-green-200 hover:bg-green-201 cursor-pointer rounded-full select-none h-42px px-5 leading-42px mr-2 mb-2"
                >
                  Submit
                </div>
              </>
            ) : null}
            {activeQuestion > 0 ? (
              <div
                onClick={() => setActiveQuestion((prev) => prev - 1)}
                className="bg-white hover:bg-gray-200 cursor-pointer rounded-full select-none h-42px px-5 leading-42px mr-2 mb-2"
              >
                Go back
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
