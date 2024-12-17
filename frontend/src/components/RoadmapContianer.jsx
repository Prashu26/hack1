import { useLoaderData } from "react-router-dom";
import CareerList from "./CareerList";
const RoadmapContianer = () => {
  const { pagination } = useLoaderData();
  let RoadmapCount = pagination.totalCount;
  // console.log(pagination);
  // console.log("hii", pagination);
  return (
    <>
      <div className="font-medium text-md ">
        Total{RoadmapCount > 1 && "s"} {RoadmapCount}
      </div>
      {RoadmapCount === 0 ? (
        <h5 className="text-2xl mt-16">
          "Sorry, no products matched your search ...
        </h5>
      ) : (
        <CareerList />
      )}
    </>
  );
};
export default RoadmapContianer;
