import React from "react";
import AppLayout from "../Layout/AppLayout";

const Home = () => {
  return (
    <AppLayout>
      <div className="mt-12 overflow-hidden bg-base-100 flex items-center justify-center px-2">
        <div className="max-w-4xl text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary">
            📝 Task Tracker
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
            Organize your day, stay focused, and accomplish your goals with
            ease.
          </p>

          <div className="flex justify-center gap-4 mt-6 flex-wrap">
            <button className="btn btn-primary btn-lg">Get Started</button>
            <button className="btn btn-outline btn-secondary btn-lg">
              Learn More
            </button>
          </div>

          <div className="mt-4">
            <img
              src="https://img.freepik.com/free-vector/hand-drawn-time-management-concept-illustration_52683-54970.jpg?ga=GA1.1.1350951681.1730882184&semt=ais_hybrid&w=740"
              alt="Task Tracker Illustration"
              className="w-full max-w-md max-h-[300px] mx-auto rounded-xl shadow-xl object-cover"
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Home;
