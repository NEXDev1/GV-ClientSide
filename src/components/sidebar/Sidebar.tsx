// import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/app/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

import {
  // faEnvelope,
  faNewspaper,
  // faUser,
  // faBell,
  faUserGroup,
  faFileLines,
  faMoneyCheckDollar,
  faPaste,
  faGear,
  faCloudArrowUp,
} from "@fortawesome/free-solid-svg-icons";
// import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleSideBar } from "../../redux/features/reducer/sidebarSlice";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const SiderBarDisplay = useSelector((state: RootState) => state.SideBar.show);

  const handleSideBar = () => {
    dispatch(toggleSideBar());
  };

  return (
    <>
      <div
        className={antialiased ${SiderBarDisplay ? "" : "hidden"} md:block}
      >
        {/* <div className="antialiased bg-gray-50 hidden md:block"> */}
        <aside
          className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transhtmlForm  bg-white border-r border-gray-200"
          aria-label="Sidenav"
          id="drawer-navigation"
        >
          <div className="overflow-y-auto py-5 px-3 h-full bg-white ">
            {/* <form action="#" method="GET" className="md:hidden mb-2">
              <label htmlFor="sidebar-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  name="search"
                  id="sidebar-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 "
                  placeholder="Search"
                />
              </div>
            </form> */}
            <ul className="space-y-2">
              <li>
                <button
                  // to="/"
                  onClick={() => {
                    navigate("/");
                    handleSideBar();
                  }}
                  className="w-full flex items-center p-2 text-base font-medium text-gray-900 rounded-lg  hover:bg-gray-100  group"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <FontAwesomeIcon icon={faNewspaper as IconProp} />
                  </svg>
                  <span className="ml-3">Dashboard</span>
                </button>
              </li>
              <li>
                <button
                  // to="/upload"
                  onClick={() => {
                    navigate("/upload");
                    handleSideBar();
                  }}
                  className="w-full flex items-center p-2 text-base font-medium text-gray-900 rounded-lg  hover:bg-gray-100  group"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <FontAwesomeIcon icon={faCloudArrowUp as IconProp} />
                  </svg>
                  <span className="ml-3 ">Upload csv</span>
                </button>
              </li>
              <li>
                <button
                  // to="/channels"
                  onClick={() => {
                    navigate("/channels");
                    handleSideBar();
                  }}
                  className="w-full flex items-center p-2 text-base font-medium text-gray-900 rounded-lg  hover:bg-gray-100  group"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <FontAwesomeIcon icon={faUserGroup as IconProp} />
                  </svg>
                  <span className="ml-3">Channels</span>
                </button>
              </li>
              <li>
                <button
                  // to="/invoice"
                  onClick={() => {
                    navigate("/invoice");
                    handleSideBar();
                  }}
                  className="w-full flex items-center p-2 text-base font-medium text-gray-900 rounded-lg  hover:bg-gray-100  group"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* <FontAwesomeIcon icon={faEnvelope as IconProp} /> */}
                    <FontAwesomeIcon icon={faFileLines as IconProp} />
                  </svg>
                  <span className="ml-3">Invoice</span>
                  {/* <span className="inline-flex justify-center items-center w-5 h-5 text-xs font-semibold rounded-full text-primary-800 bg-primary-100 ">
                    15
                  </span> */}
                </button>
              </li>
              <li>
                <button
                  // to="/payment"
                  onClick={() => {
                    navigate("/payment");
                    handleSideBar();
                  }}
                  className="w-full flex items-center p-2 text-base font-medium text-gray-900 rounded-lg  hover:bg-gray-100  group"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* <FontAwesomeIcon icon={faBell as IconProp} /> */}
                    <FontAwesomeIcon icon={faMoneyCheckDollar as IconProp} />
                  </svg>
                  <span className="ml-3">Payment</span>
                </button>
              </li>
              <li>
                <button
                  // to="/report"
                  onClick={() => {
                    navigate("/report");
                    handleSideBar();
                  }}
                  className="w-full flex items-center p-2 text-base font-medium text-gray-900 rounded-lg  hover:bg-gray-100  group"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* <FontAwesomeIcon icon={faUser as IconProp} /> */}
                    <FontAwesomeIcon icon={faPaste as IconProp} />
                  </svg>
                  <span className="ml-3">Reports</span>
                </button>
              </li>
              <li>
                <button
                  // to="/settings"
                  onClick={() => {
                    navigate("/settings");
                    handleSideBar();
                  }}
                  className="w-full flex items-center p-2 text-base font-medium text-gray-900 rounded-lg  hover:bg-gray-100  group"
                >
                  <svg
                    aria-hidden="true"
                    className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75  group-hover:text-gray-900 "
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* <FontAwesomeIcon icon={faUser as IconProp} /> */}
                    <FontAwesomeIcon icon={faGear as IconProp} />
                  </svg>
                  <span className="ml-3">Settings</span>
                </button>
              </li>
            </ul>
            <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 "></ul>
          </div>
        </aside>
      </div>
    </>
  );
};

export default Sidebar;