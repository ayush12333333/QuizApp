import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Test Your Knowledge
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 max-w-2xl mx-auto px-2">
            Join the ultimate quiz challenge and compete with players worldwide!
          </p>
          <Link
            to="/quiz"
            className="bg-yellow-400 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
          >
            Start Quiz
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-10 sm:py-14 md:py-16 px-4 container mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-6">
          About QuizMaster
        </h2>
        <p className="text-gray-700 text-sm sm:text-base md:text-lg text-center max-w-2xl mx-auto px-2">
          QuizMaster is a fun and interactive platform to test your knowledge on various topics. 
          Compete with friends, climb the leaderboard, and become a quiz champion!
        </p>
      </section>
    </div>
  );
}
