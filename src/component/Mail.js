
/*
import React, { useState } from 'react';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


export default function Mail() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

   const getTextFromEditor = () => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    const blocks = raw.blocks;
    const text = blocks.map(block => block.text).join('\n');
    return text;
  };

  console.log(getTextFromEditor());

  return (
    <>
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={onEditorStateChange}
      />
    </>
  );
}

*/

import React, { useState } from 'react';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function Mail() {
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
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Compose Mail</h2>
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
