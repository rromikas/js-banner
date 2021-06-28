import { useState, useEffect } from "react";
import GoBackButton from "components/GoBackButton";

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
  const [avatar, setAvatar] = useState("");

  const transition =
    new URLSearchParams(window.location.search).get("transition") === "true" ? true : false;

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/questions?orderBy=order,asc`
        ).then((x) => x.json());
        setQuestions(res);

        const res1 = await fetch(`${process.env.REACT_APP_API_URL}/video`).then((x) => x.json());
        setVideo(res1);

        const res2 = await fetch(`${process.env.REACT_APP_API_URL}/avatar`).then((x) => x.json());
        setAvatar(res2.image);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="flex max-w-600px w-full h-250px">
      <div className="w-5/12 bg-green-400 flex flex-col">
        <video src={video.url} autoPlay muted loop></video>
        <div className="flex-grow flex items-center justify-center text-xl font-medium text-white p-4 text-center">
          {video.title}
        </div>
      </div>
      <div className="w-7/12 relative">
        {questions.map((q, i) => (
          <div
            key={`question-${i}`}
            className={`h-full absolute left-0 top-0 ${
              transition ? "transition duration-500" : ""
            }  w-full px-4 pt-4 pb-2 overflow-auto bg-center flex flex-col bg-cover ${
              activeQuestion === i ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            style={{ backgroundImage: `url(${q.backgroundImage})` }}
          >
            <img alt="" src={q.backgroundImage} className="hidden" />
            <div className="flex-grow pb-3">
              <div className="flex">
                <div className="w-42px h-42px rounded-full bg-white flex-shrink-0 mr-3">
                  <div
                    className="w-42px h-42px rounded-full bg-center bg-cover"
                    style={{ backgroundImage: `url(${avatar})` }}
                  ></div>
                </div>
                <div className="bg-black bg-opacity-60 text-lg text-white px-2.5 py-1 rounded">
                  {q.question}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap">
              {q.answers.map((a, ai) => (
                <div
                  onClick={() => {
                    let arr = [...answers];
                    if (arr.length <= i) {
                      setAnswers([...arr, a]);
                    } else {
                      arr[i] = a;
                      setAnswers(arr);
                    }
                    setActiveQuestion((prev) => prev + 1);
                  }}
                  className={`${
                    i < answers.length && answers[i] === a
                      ? "bg-green-400 text-white"
                      : "bg-green-200 hover:bg-green-201"
                  } cursor-pointer rounded-full select-none h-42px px-5 leading-42px mr-2 mb-2`}
                  key={`answer-${ai}`}
                >
                  {a}
                </div>
              ))}
              {i === questions.length - 1 ? (
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
                <GoBackButton
                  transition={transition}
                  goBack={() => setActiveQuestion((prev) => prev - 1)}
                ></GoBackButton>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
