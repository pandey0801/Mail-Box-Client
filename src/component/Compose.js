import React, { useState, useEffect } from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import FullScreen from "./FullScreen";
import Mail from "./Mail";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network not working");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [url]);

  return { data, error };
}

export default function Compose() {
  const [mails, setMails] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isSentBox, setIsSentBox] = useState(false);
  const [defaultScreen, setDefaultScreen] = useState(true);
  const [selectedMail, setSelectedMail] = useState(null); // State to manage the selected mail
  const [mailOpen, setMailOpen] = useState(false);
  const [isComposeOpen, setIsComposeOpen] = useState(false);

  const { data, error } = useFetch(
    "https://expensetracker-7f8dd-default-rtdb.firebaseio.com/mail.json"
  );


  useEffect(() => {
    if (data) {
      const dataArray = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
      setMails(dataArray);
      setUnreadCount(dataArray.filter((mail) => !mail.read).length);
    }
  }, [data]);



  const getInboxMails = () => {
    setDefaultScreen(true);
    setIsSentBox(false);
  };

  const getSentMails = () => {
    setDefaultScreen(false);
    setIsSentBox(true);
  };

  const deleteHandle = (id, ) => {
    const foundMail = mails.filter((mail) => mail.id === id);
    const [read] = foundMail.map((obj) => obj.read);
    console.log(foundMail);
    console.log(read);
    if(!read){
      setUnreadCount((prevCount) => prevCount - 1);
    }
    
    fetch(
      `https://expensetracker-7f8dd-default-rtdb.firebaseio.com/mail/${id}.json`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        const resdata  = res.json();
        if (res.ok) {
          setMails((prevMails) => prevMails.filter((mail) => mail.id !== id));
          console.log(resdata);
          console.log(resdata.read);

        } else {
          throw new Error("Failed to delete data.");
        }
      })
      .catch((error) => console.error("Error deleting data:", error));
  };

  const markAsRead = (id) => {
    console.log(id);
    const mailToUpdate = mails.find((mail) => mail.id === id);
    if (mailToUpdate) {
      const updatedMail = { ...mailToUpdate, read: true };

      // const mailToUpdate = mails.find((mail) => mail.id === id);
    // if (mailToUpdate) {
      // const updatedMail = { ...mailToUpdate, read: true };


      fetch(
        `https://expensetracker-7f8dd-default-rtdb.firebaseio.com/mail/${id}.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedMail),
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to update data.");
          }
          return res.json();
        })
        .then(() => {
          setMails((prevMails) =>
            prevMails.map((mail) => (mail.id === id ? updatedMail : mail))
          );
          setUnreadCount((prevCount) => prevCount - 1);
        })
        .catch((error) => console.error("Error updating data:", error));
    }
  };

  // const viewHandle = (id, to, subject, body)=>{
  //   console.log(id, to, subject, body);
  //   <FullScreen/>
  // }

  const viewHandle = (mail) => {
    setSelectedMail(mail); // Set the selected mail to be displayed
  };

  const closeFullScreen = () => {
    setSelectedMail(null); // Clear the selected mail to close the FullScreen component
  };

  const handleComposeOpen = () => {
    setIsComposeOpen(true);
    // console.log("im click");
    // console.log(isComposeOpen);
  };

  const handleComposeClose = () => {
    setIsComposeOpen(false);
  };

  const handleMailSent = (newMail) => {
    setMails((prevMails) => [newMail, ...prevMails]);
    setUnreadCount((prevCount) => prevCount + 1);
  };


  return (
    <>
      <div>
        <div className="box float-left bg-gray-400 w-1/5 min-h-screen p-4">
          <button className="w-4/5 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg text-center p-2.5 mb-4"
          onClick={handleComposeOpen}>
            Compose
          </button>

          <ul className="list-none text-gray-700 text-base">
            <li className="m-3 px-6" onClick={getInboxMails}>
              Unread <span className="text-red-500">({unreadCount})</span>
            </li>
            <li className="m-3 px-6">Started</li>
            <li className="m-3 px-6">Draft</li>
            <li className="m-3 px-6" onClick={getSentMails}>
              Sent
            </li>
            <li className="m-3 px-6">Archive</li>
            <li className="m-3 px-6">Spam</li>
            <li className="m-3 px-6">Delete</li>
          </ul>

          <Menu
            as="div"
            className="relative inline-block text-left float-right m-3.5"
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

        <div className="float-right bg-slate-100 w-4/5 min-h-screen p-4">
          <div>
            {defaultScreen &&
              (mails.length > 0 ? (
                <ul className="space-y-4">
                  {mails.map((mail) => (
                    <li
                      key={mail.id}
                      className={`p-4 bg-white rounded shadow-md cursor-pointer ${
                        mail.read ? "" : "border-l-4 border-blue-500"
                      }`}
                    >
                      <p className="font-bold">To: {mail.to}</p>
                      <p className="font-semibold">Subject: {mail.subject}</p>
                      <p className="text-gray-700">Body: {mail.body}</p>
                      {!mail.read && (
                        <button
                          className="bg-blue-500 px-2 border border-1 mt-2 rounded-md mx-2"
                          // onClick={() => markAsRead(mail.id)}
                          onClick={() => markAsRead(mail.id)}
                        >
                          Read
                        </button>
                      )}
                       <button
                        className="bg-green-300 px-2 border border-1 mt-2 rounded-md mx-2"
                        // onClick={() => viewHandle(mail.id, mail.to, mail.subject, mail.body)}
                        onClick={() => viewHandle(mail)}
                      >
                        View
                      </button>

                      <button
                        className="bg-red-500 px-2 border border-1 mt-2 rounded-md mx-2"
                        onClick={() => deleteHandle(mail.id)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No mails found.</p>
              ))}

            {isSentBox && (
              <ul className="space-y-4">
                {mails.map((mail) => (
                  <li
                    key={mail.id}
                    className={`p-4 bg-white rounded shadow-md cursor-pointer border border-l-4 border-yellow-500`}
                  >
                    <p className="font-bold">To: {mail.to}</p>
                    <p className="font-semibold">Subject: {mail.subject}</p>
                    <p className="text-gray-700">Body: {mail.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      {selectedMail && (
        <FullScreen mail={selectedMail} onClose={closeFullScreen} />
      )}
      {/* {mailOpen &&(
        <Mail onClose={handleComposeClose}/>
      )} */}

{/* {isComposeOpen && (<Mail onClose={handleComposeClose} />)} */}
{isComposeOpen && (<Mail onClose={handleComposeClose} onMailSent={handleMailSent} />)}

    </>
  );
}
