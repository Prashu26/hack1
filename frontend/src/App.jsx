import React, { useState } from "react";
import "./App.css";
import {
  HomeLayout,
  Login,
  About,
  Error,
  Landing,
  Career,
  Chat,
  DashBoard,
  Profile,
  Quiz,
  Resources,
  CareerPage,
  SkillForm,
  UpdateProfile,
  CreateRoadmap,
  AddResource,
  UpdatePassword,
} from "./pages/Index";
import { ErrorElement } from "./components";
import { Loader } from "./components/index";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import { loader as landingLoader } from "./pages/Landing";
// import { loader as SingleCareerLoader } from "./components/SingleCareer";
import { loader as CareerLoader } from "./pages/Carrer";

import { ProfilePage, ResetPassword, ResetPassword2 } from "./components";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Landing />,
          errorElement: <ErrorElement />,
          loader: landingLoader,
        },
        {
          path: "About",
          element: <About />,
        },
        {
          path: "Career",
          element: <Career />,
          errorElement: <ErrorElement />,
          loader: CareerLoader,
        },
        {
          path: "ai-chat",
          element: <Chat />,
        },
        {
          path: "DashBoard",
          element: <DashBoard />,
        },
        {
          path: "Profile",
          element: (
            // <PrivateRoute>
            <Profile />
            // </PrivateRoute>
          ),
          children: [
            {
              index: true,
              element: <ProfilePage />,
            },
            {
              path: "update_profile",
              element: <UpdateProfile />,
            },
            {
              path: "update_password",
              element: <UpdatePassword />,
            },
          ],
        },
        {
          path: "Quiz",
          element: <Quiz />,
        },
        {
          path: "Resources",
          element: <Resources />,
          
        },
        {
          path: "SingleCareer/:id",
          element: <CareerPage />,
          // loader: SingleCareerLoader,
        },
        {
          path: "skillForm",
          element: <SkillForm />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
      errorElement: <Error />,
    },
    {
      path: "/forgetPassword",
      element: <ResetPassword />,
      errorElement: <Error />,
    },
    {
      path: "/resetPassword/:token",
      element: <ResetPassword2 />,
      errorElement: <Error />,
    },
    {
      path: "/CreateRoadmap",
      element: <CreateRoadmap />,
      // errorElement: <Error />,
    },
    {
      path: "/AddResource",
      element: <AddResource />,
      // errorElement: <Error />,
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

function App() {
  const mode = localStorage.getItem("theme");
  return (
    <>
      <React.Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </React.Suspense>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        draggable={true}
        pauseOnHover={true}
        theme={mode === "winter" ? "light" : "dark"}
      />
    </>
  );
}

export default App;
