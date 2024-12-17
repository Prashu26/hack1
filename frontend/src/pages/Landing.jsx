import { Hero, Career } from "../components";
import axiosInstance from "../utils/api/axiosInstance";

export const loader = async () => {
  const response = await axiosInstance.get("/roadmaps");
  // console.log(response);
  const roadmap = response.data.roadmaps.slice(0, 3);
  return { roadmap };
};
const Landing = () => {
  return (
    <div>
      <Hero />
      <Career />
    </div>
  );
};
export default Landing;
