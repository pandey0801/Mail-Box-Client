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

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Compose() {
  const [mails, setMails] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const deleteHandle = (id) =>{
    // console.log(id); //-NzlTYyYVD7QgoH6SYhl
    // fetch(`https://expensetracker-7f8dd-default-rtdb.firebaseio.com/mail/${id}.json`, {
    //   method:'DELETE',
    // }).then((res)=>{
    //   if(res.ok)
    //     {
    //       console.log("delete mail");
    //     }
    //     else{
    //       console.log("some error in the delete featch");
    //       throw new Error("Failed to delete data.");
    //     }
    // }).catch((error)=>
    // {
    //   console.log(error);
    // })

    fetch(
      `https://expensetracker-7f8dd-default-rtdb.firebaseio.com/mail/${id}.json`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (res.ok) {
          // console.log(key); //-NzMGueYmKqrRIyDSKGI
          // dispatch(expensesActions.deleteExpense(key));
          console.log("delete mail");
          setMails((prevMails) => prevMails.filter(mail => mail.id !== id));
        } else {
          throw new Error("Failed to delete data.");
        }
      })
      .catch((error) => console.error("Error deleting data:", error));
  }


  useEffect(() => {
    getfn();
  },[]);

  const getfn = () => {
    fetch("https://expensetracker-7f8dd-default-rtdb.firebaseio.com/mail.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Failed to fetch data.");
        }
      })
      .then((data) => {
        // console.log(data) //{-NzhYmFjAINX2_ErJ1-J: {…}, -NzlTYyYVD7QgoH6SYhl: {…}}
        const dataArray = data
     
          ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
          : [];
        setMails(dataArray);
        // console.log(mails);//(2) [{…}, {…}]
        setUnreadCount(dataArray.filter(mail => !mail.read).length);
        // console.log(unreadCount); //1
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const markAsRead = (id) => {
    const mailToUpdate = mails.find(mail => mail.id === id);
    if (mailToUpdate) {
      const updatedMail = { ...mailToUpdate, read: true };
      fetch(`https://expensetracker-7f8dd-default-rtdb.firebaseio.com/mail/${id}.json`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedMail),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to update data.");
          }
          return res.json();
        })
        .then(() => {
          setMails((prevMails) =>
            prevMails.map((mail) =>
              mail.id === id ? updatedMail : mail
            )
          );
          setUnreadCount((prevCount) => prevCount - 1);
        })
        .catch((error) => console.error("Error updating data:", error));
    }
  };

  
  return (
    <>
      <div>
        <div className="box float-left bg-gray-400 w-1/5 min-h-screen p-4">
          <button className="w-4/5 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg text-center p-2.5 mb-4">
            Compose
          </button>

          <ul className="list-none text-gray-700 text-base">
            <li className="m-3 px-6">
              Unread <span className="text-red-500">({unreadCount})</span>
            </li>
            <li className="m-3 px-6">Started</li>
            <li className="m-3 px-6">Draft</li>
            <li className="m-3 px-6">Sent</li>
            <li className="m-3 px-6">Archive</li>
            <li className="m-3 px-6">Spam</li>
            <li className="m-3 px-6">Delete</li>
          </ul>

          <Menu as="div" className="relative inline-block text-left float-right m-3.5">
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

        <div className="float-right bg-slate-100 w-4/5 min-h-screen p-4">
          {/* <button 
            onClick={getfn}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Fetch Mails
          </button> */}
          <div>
            {mails.length > 0 ? (
              <ul className="space-y-4">
                {mails.map((mail) => (
                  <li
                    key={mail.id}
                    className={`p-4 bg-white rounded shadow-md cursor-pointer ${mail.read ? '' : 'border-l-4 border-blue-500'}`}
                    // onClick={() => markAsRead(mail.id)}
                  >
                    <p className="font-bold">To: {mail.to}</p>
                    <p className="font-semibold">Subject: {mail.subject}</p>
                    <p className="text-gray-700">Body: {mail.body}</p>
                   { !mail.read &&(<button className="bg-blue-500 px-2 border border-1 mt-2 rounded-md" onClick={()=>markAsRead(mail.id)}>Read</button>)}
                    <button className="bg-red-500 px-2 border border-1 mt-2 rounded-md" onClick={()=>deleteHandle(mail.id)}>Delete</button>
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
