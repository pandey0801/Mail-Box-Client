
import React, { useState } from 'react';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function Mail({onClose,  onMailSent}) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [showCcBcc, setShowCcBcc] = useState(false);
  const [mailDetails, setMailDetails] = useState({
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    body: '',
  });

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setMailDetails({
      ...mailDetails,
      body: convertToRaw(editorState.getCurrentContent()).blocks.map(block => block.text).join('\n')
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMailDetails({
      ...mailDetails,
      [name]: value,
      read: false,
    });
  };

  const toggleCcBcc = () => {
    setShowCcBcc(!showCcBcc);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(mailDetails);

    fetch('https://expensetracker-7f8dd-default-rtdb.firebaseio.com/mail.json',{
      method:'POST',
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mailDetails),
    }).then((req)=>{
      if(req.ok)
        {
          console.log("mail post");
          const result = req.json();
          onMailSent({ id: result.name, ...mailDetails });
          // onMailSent({ id: result.name, ...newMail }); 

        }
        else{
          console.log("error")
        }
    }).catch((err)=>
    {
      console.log(err);
    })
    setMailDetails({
      to:'',
      cc: '',
      bcc: '',
      subject: '',
      body: '',
    })

    onClose();

  };

  return (
    // <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <div className='flex justify-between'>
        <h2 className="text-2xl font-bold mb-4">Compose Mail</h2>
        <button className='border rounded-md bottom-2 bg-red-500 px-3 py-2 font-bold' onClick={onClose}>X</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="to" className="block text-sm font-medium text-gray-700">To</label>
            <input
              type="email"
              name="to"
              id="to"
              value={mailDetails.to}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div className="mb-4 flex justify-between">
            <button type="button" onClick={toggleCcBcc} className="text-blue-500 text-sm">Add Cc/Bcc</button>
          </div>
          {showCcBcc && (
            <div className="mb-4">
              <label htmlFor="cc" className="block text-sm font-medium text-gray-700">Cc</label>
              <input
                type="email"
                name="cc"
                id="cc"
                value={mailDetails.cc}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
              <label htmlFor="bcc" className="block text-sm font-medium text-gray-700 mt-4">Bcc</label>
              <input
                type="email"
                name="bcc"
                id="bcc"
                value={mailDetails.bcc}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
            <input
              type="text"
              name="subject"
              id="subject"
              value={mailDetails.subject}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Body</label>
            <Editor
              editorState={editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor border border-gray-300 rounded p-2"
              onEditorStateChange={onEditorStateChange}
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Send</button>
        </form>
      </div>
    </div>
  );
}

/*

import React, { useState } from "react";

export default function Mail({ onClose, onMailSent }) {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newMail = {
      to,
      subject,
      body,
      read: false,
    };

    try {
      const response = await fetch(
        "https://expensetracker-7f8dd-default-rtdb.firebaseio.com/mail.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMail),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send mail.");
      }

      const result = await response.json();
      onMailSent({ id: result.name, ...newMail }); // Call the callback function with the new mail

      // Reset form fields
      setTo("");
      setSubject("");
      setBody("");
      onClose(); // Close the compose window
    } catch (error) {
      console.error("Error sending mail:", error);
    }
  };

  return (
    <div className="compose-mail">
      <form onSubmit={handleSubmit}>
        <div>
          <label>To:</label>
          <input
            type="email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Body:</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Send</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}

*/