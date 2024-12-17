import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../utils/api/axiosInstance";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SingleCareer = ({ roadmap, ID, showSelectButton = true }) => {
  const navigate = useNavigate();

  // console.log(showSelectButton);
  const { careerTitle, description, image, roadmapSteps } = roadmap;
  const img = `http://localhost:5000/api/image/${image}`;
  const user = useSelector((state) => state.userState.user);

  const [completedSteps, setCompletedSteps] = useState([]); // Initialize as an array
  const [progress, setProgress] = useState(0);

  // Fetch the user's completed steps from the backend
  useEffect(() => {
    if (user && ID) {
      const fetchProgress = async () => {
        try {
          const response = await axiosInstance.get(`/user/progress/${ID}`);
          console.log("API response:", response.data);

          const steps = Array.isArray(response.data.completedSteps)
            ? response.data.completedSteps
            : [];
          setCompletedSteps(steps); // Set the completedSteps state
        } catch (error) {
          console.error("Error fetching progress:", error);
        }
      };
      fetchProgress();
    }
  }, [user, ID]);

  // Calculate progress based on completed steps
  useEffect(() => {
    const totalSteps = roadmapSteps.length || 0;
    const completed = completedSteps.length || 0;
    setProgress(totalSteps > 0 ? (completed / totalSteps) * 100 : 0);
  }, [completedSteps, roadmapSteps]);

  // Function to check if the step is completed
  const isStepCompleted = (stepId) => {
    if (!Array.isArray(completedSteps)) {
      // console.error("completedSteps is not an array:", completedSteps);
      return false;
    }
    return completedSteps.some(
      (completedStep) =>
        completedStep?.stepId?.toString() === stepId?.toString()
    );
  };

  // Handle checkbox toggle
  const handleCheckboxChange = async (stepId) => {
    try {
      const newCompletedSteps = isStepCompleted(stepId)
        ? completedSteps.filter(
            (completedStep) => completedStep.stepId !== stepId
          )
        : [...completedSteps, { stepId }];
      setCompletedSteps(newCompletedSteps);

      // Update backend with new progress
      await axiosInstance.put("/user/update-progress", {
        roadmapId: ID,
        completedSteps: newCompletedSteps,
      });
      toast.success("Progress updated!");
    } catch (error) {
      toast.error("Failed to update progress. Please try again.");
      console.error("Error updating progress:", error);
    }
  };

  // Function to select roadmap
  const selectRoadmap = async () => {
    console.log("Attempting to select roadmap...");
    try {
      const response = await axiosInstance.post("/user/select-roadmap", {
        roadmapId: roadmap._id,
      });

      if (response && response.data) {
        toast.success(
          response.data.message || "Roadmap selected successfully!"
        );
        navigate("/dashboard");
      } else {
        toast.error("Unexpected response from the server.");
      }
    } catch (error) {
      // Extract error message or fallback
      const errorMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        "An unknown error occurred. Please try again.";
      toast.error(errorMessage); // Display the message
      console.error("Error selecting roadmap:", errorMessage);
    }
  };

  const selectedRoadmap = user?.selectedRoadmaps?.find(
    (roadmapItem) =>
      roadmapItem?.roadmapId?.toString() === roadmap._id?.toString()
  );

  return (
    <section className="career-details">
      <div className="breadcrumbs text-md">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/careers">Careers</Link>
          </li>
          <li className="text-secondary">{careerTitle}</li>
        </ul>
      </div>

      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        {/* Career Image */}
        <div>
          <img
            src={img}
            alt={careerTitle}
            className="w-full h-auto object-contain rounded-lg"
          />
        </div>

        {/* Career Title and Description */}
        <div>
          <h1 className="capitalize text-3xl font-bold text-red-400">
            {careerTitle}
          </h1>
          <p className="mt-4 text-lg">{description}</p>

          <div className="roadmap-steps mt-8">
            <h2 className="text-2xl font-bold">Roadmap Steps</h2>
            <div className="steps-list mt-4">
              {roadmapSteps.map((step, index) => (
                <div key={index} className="step-item flex items-center mt-4">
                  <div>
                    {!showSelectButton && (
                      <input
                        type="checkbox"
                        checked={isStepCompleted(step._id)} // Use function to check if completed
                        onChange={() => handleCheckboxChange(step._id)}
                      />
                    )}
                    <h3 className="text-xl font-semibold">
                      step-{index + 1}: {step.stepTitle}
                    </h3>
                    <p className="text-md text-gray-700">
                      {step.stepDescription}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="progress-bar mt-6">
            <h2 className="text-xl font-bold">
              Progress: {Math.round(progress)}%
            </h2>
            <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Button to select roadmap */}

          {user && showSelectButton && !selectedRoadmap && (
            <div className="mt-6 text-center">
              <button
                onClick={selectRoadmap}
                className="text-xl font-bold text-blue-500"
              >
                Select this Roadmap
              </button>
            </div>
          )}

          {/* Already selected roadmap message */}
          {selectedRoadmap && (
            <div className="mt-6 text-center">
              <p className="text-lg text-green-500">
                You have already selected this roadmap!
              </p>
            </div>
          )}

          {/* If user is not logged in */}
          {!user && (
            <div className="mt-6 text-center">
              <p className="text-lg text-red-500">
                Please{" "}
                <Link to="/login" className="text-blue-500">
                  log in
                </Link>{" "}
                to select this roadmap.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SingleCareer;
