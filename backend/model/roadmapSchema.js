const mongoose = require("mongoose");

const roadmapSchema = new mongoose.Schema({
  careerTitle: {
    type: String,
    required: true,
    unique: true, // Ensures unique career paths
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String, // URL to an image representing the entire career path
    required: true,
  },
  roadmapSteps: [
    {
      stepTitle: {
        type: String,
        required: true,
      },
      stepDescription: {
        type: String,
        required: true,
      },
      resources: [
        {
          title: { type: String, required: true },
          link: { type: String, required: true },
          type: {
            type: String,
            enum: ["video", "article", "book"],
            required: true,
          },
        },
      ],
      completed: {
        type: Boolean,
        default: false, // indicates whether the step is completed or not
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Roadmap = mongoose.model("Roadmap", roadmapSchema);

module.exports = Roadmap;
