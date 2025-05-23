import React from "react";
import AppLayout from "../Layout/AppLayout";

const Home = () => {
  return (
    <AppLayout>
      <div className="min-h-screen bg-base-100 flex items-center justify-center px-4">
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

          <div className="mt-12">
            <img
              src="https://illustrations.popsy.co/gray/task-management.svg"
              alt="Task Tracker Illustration"
              className="w-full max-w-md mx-auto rounded-xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Home;
