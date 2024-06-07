/*
import React from "react";
// import Login from "./component/Login";

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Compose() {
  const getfn = () => {
    fetch(
      "https://expensetracker-7f8dd-default-rtdb.firebaseio.com/mail.json",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        console.log(res.json()); //Promise {<pending>}
        return res.json();
      } else {
        throw new Error("Failed to fetch data.");
      }
    });
    //       .then((data) => {
    //         const dataArray = data ? Object.keys(data).map((key) => ({ key, ...data[key] })) : [];
    //       })
    //       .catch((error) => console.error("Error fetching data:", error));
  };

  return (
    <>
      
      <div>
        <div className="box float-left bg-gray-400 w-1/5 min-h-screen">
          <button className="w-4/5 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg text-center p-2.5 m-3.5">
            Compose
          </button>

          <ul class="list-none text-gray-700 text-base">
            <li className="m-3 px-6">UnRead</li>

            <li className="m-3 px-6">Started</li>

            <li className="m-3 px-6">Draft</li>

            <li className="m-3 px-6">Sent</li>

            <li className="m-3 px-6">Archive</li>

            <li className="m-3 px-6">Spam</li>

            <li className="m-3 px-6">Delete</li>
          </ul>

         
          <Menu
            as="div"
            className="relative inline-block text-left float-right m-3.5 "
          >
            <div>
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                Options
                <ChevronDownIcon
                  className="-mr-1 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </MenuButton>
            </div>

            <Transition
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <MenuItem>
                    {({ focus }) => (
                      <a
                        href="#"
                        className={classNames(
                          focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Edit
                      </a>
                    )}
                  </MenuItem>
                </div>
                <div className="py-1">
                  <MenuItem>
                    {({ focus }) => (
                      <a
                        href="#"
                        className={classNames(
                          focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Duplicate
                      </a>
                    )}
                  </MenuItem>
                </div>
                <div className="py-1">
                  <MenuItem>
                    {({ focus }) => (
                      <a
                        href="#"
                        className={classNames(
                          focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Archive
                      </a>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ focus }) => (
                      <a
                        href="#"
                        className={classNames(
                          focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Move
                      </a>
                    )}
                  </MenuItem>
                </div>
              </MenuItems>
            </Transition>
          </Menu>
         
        </div>

        <div className="float-right bg-slate-100 w-4/5 min-h-screen">
          <button onClick={getfn}>click</button>
          main
        </div>
      </div>
    </>
  );
}
*/

import React, { useEffect, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
// import { useEffect } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Compose() {
  const [mails, setMails] = useState([]);

  const getfn = () => {
    fetch(
      "https://expensetracker-7f8dd-default-rtdb.firebaseio.com/mail.json",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
            // console.log(res.json());
        //   return res.json();
        res.clone().json().then(data => console.log(data))
        return res.json();

        } else {
          throw new Error("Failed to fetch data.");
        }
      })
      .then((data) => {
        const dataArray = data? Object.keys(data).map((key) => ({ id: key, ...data[key] })): [];
        setMails(dataArray);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    getfn();
  }, []);

  return (
    <>
      <div>
        <div className="box float-left bg-gray-400 w-1/5 min-h-screen">
          <button className="w-4/5 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg text-center p-2.5 m-3.5">
            Compose
          </button>

          <ul className="list-none text-gray-700 text-base">
            <li className="m-3 px-6">UnRead</li>
            <li className="m-3 px-6">Started</li>
            <li className="m-3 px-6">Draft</li>
            <li className="m-3 px-6">Sent</li>
            <li className="m-3 px-6">Archive</li>
            <li className="m-3 px-6">Spam</li>
            <li className="m-3 px-6">Delete</li>
          </ul>

          <Menu as="div" className="relative inline-block text-left float-right m-3.5 ">
            <div>
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                Options
                <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
              </MenuButton>
            </div>
            <Transition
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <MenuItem>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Edit
                      </a>
                    )}
                  </MenuItem>
                </div>
                <div className="py-1">
                  <MenuItem>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Duplicate
                      </a>
                    )}
                  </MenuItem>
                </div>
                <div className="py-1">
                  <MenuItem>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Archive
                      </a>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Move
                      </a>
                    )}
                  </MenuItem>
                </div>
              </MenuItems>
            </Transition>
          </Menu>
        </div>

        <div className="float-right bg-slate-100 w-4/5 min-h-screen">
          {/* <button onClick={getfn}>click</button> */}
          <div >
            {mails.length > 0 ? (
            //   <ul >
            //     {mails.map((mail) => (
            //       <li key={mail.id} className="w-3/4 bg-slate-200 ">
            //         <p>to:{mail.to}</p>
            //         <p>Subject: {mail.subject}</p>
            //         <p>Body: {mail.body}</p>
            //       </li>
            //     ))}
            //   </ul>

            <ul className="space-y-4">
            {mails.map((mail) => (
              <li key={mail.id} className="p-4 bg-white rounded shadow-md">
                <p className="font-bold">To: {mail.to}</p>
                <p className="font-semibold">Subject: {mail.subject}</p>
                <p className="text-gray-700">Body: {mail.body}</p>
              </li>
            ))}
          </ul>

            ) : (
              <p>No mails found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
