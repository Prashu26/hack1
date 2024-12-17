import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import axiosInstance from "../utils/api/axiosInstance";

const CareerForm = () => {
  const [formData, setFormData] = useState({
    skills: [],
    careerChoice: "",
    yearsOfExperience: "",
    education: "",
    jobInterests: [],
    location: "",
  });

  const navigate = useNavigate(); // Replaces useHistory with useNavigate

  const careerChoices = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "AI/ML Engineer",
    "DevOps Engineer",
    "App Developer",
    "Cloud Computing Engineer",
    "Data Scientist",
    "Game Developer",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value.split(",").map((item) => item.trim()),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(
        "/career", // No need to include the full URL as it's set in axios instance
        formData
      );
      toast.success(response.data.message); // Show success message
      navigate("/dashboard"); // Use navigate to redirect after successful submission
    } catch (error) {
      const message =
        error.response?.data?.message || "An unknown error occurred.";
      toast.error(message); // Show error message
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-center">Career Form</h2>
      <form onSubmit={handleSubmit} className="space-y-6 mt-6">
        <div>
          <label
            htmlFor="skills"
            className="block text-sm font-medium text-gray-700"
          >
            Skills (comma separated)
          </label>
          <input
            type="text"
            name="skills"
            id="skills"
            value={formData.skills.join(", ")}
            onChange={handleArrayChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="JavaScript, React, Node.js"
          />
        </div>

        <div>
          <label
            htmlFor="careerChoice"
            className="block text-sm font-medium text-gray-700"
          >
            Career Choice
          </label>
          <select
            name="careerChoice"
            id="careerChoice"
            value={formData.careerChoice}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select a career</option>
            {careerChoices.map((choice) => (
              <option key={choice} value={choice}>
                {choice}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="yearsOfExperience"
            className="block text-sm font-medium text-gray-700"
          >
            Years of Experience
          </label>
          <input
            type="number"
            name="yearsOfExperience"
            id="yearsOfExperience"
            value={formData.yearsOfExperience}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your years of experience"
          />
        </div>

        <div>
          <label
            htmlFor="education"
            className="block text-sm font-medium text-gray-700"
          >
            Education
          </label>
          <input
            type="text"
            name="education"
            id="education"
            value={formData.education}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Your highest qualification"
          />
        </div>

        <div>
          <label
            htmlFor="jobInterests"
            className="block text-sm font-medium text-gray-700"
          >
            Job Interests (comma separated)
          </label>
          <input
            type="text"
            name="jobInterests"
            id="jobInterests"
            value={formData.jobInterests.join(", ")}
            onChange={handleArrayChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Backend, Cloud Computing"
          />
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            value={formData.location}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="City, Country"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CareerForm;
