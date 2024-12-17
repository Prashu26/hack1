import { Outlet, useNavigation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Loader, Header, Navbar, Footer } from "../components/index";

const HomeLayout = () => {
  // Using the useNavigation hook to detect navigation state
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading"; // Checks if a page is currently loading

  return (
    <>
      {/* <Helmet>
        <title>AyurBharat --- Natural</title>
        <meta name="Home" content="indian ayurveda" />
      </Helmet> */}
      <nav>
        <Header />
        <Navbar />

        {/* <span className="text-4xl text-primary">AyurBharat</span> */}
        {isPageLoading ? (
          <Loader />
        ) : (
          <section className="my-custom-style py-10">
            <Outlet />
          </section>
        )}
      </nav>
      <Footer />
    </>
  );
};

export default HomeLayout;
