import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
      <div>
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">
          "Empower Your Future with AI Career Guidance"
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-8">
          "Welcome to AI Career Navigator – your personalized guide to exploring
          AI-driven career paths, mastering skills, and achieving your
          professional goals."
        </p>
      </div>
      <div className="hidden h-[28rem] lg:carousel carousel-center p-4 space-x-4 bg-neutral-300 rounded-box">
        <div className="flex w-full flex-col justify-evenly border-opacity-50">
          <div
            className="card bg-base-300 rounded-box grid h-40 place-items-center"
            style={{
              backgroundImage:
                "url('data:image/png;base64,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')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Link to="/career" className="btn btn-primary">
              Career Choice
            </Link>
          </div>
          <div className="divider divider-primary"></div>
          <div
            className="card bg-base-300 rounded-box grid h-40 place-items-center"
            style={{
              backgroundImage:
                "url('https://as2.ftcdn.net/v2/jpg/02/15/64/97/1000_F_215649743_jm9iOoLsBa6Jr02WfkMfkJZDMClNsySR.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Link to="/ai-chat" className="btn btn-success">
              Chat With AI
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
