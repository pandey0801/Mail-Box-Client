// import React from 'react'

// export default function FullScreen() {
//   return (
//     <div>FullScreen</div>
//   )
// }

// FullScreen.js
import React from 'react';

function FullScreen({ mail, onClose }) {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-2/3">
        <button className="mb-4 text-red-500" onClick={onClose}>Close</button>
        <h2 className="text-2xl font-bold mb-4">To: {mail.to}</h2>
        <h3 className="text-xl font-semibold mb-4">Subject: {mail.subject}</h3>
        <p className="text-gray-700">{mail.body}</p>
      </div>
    </div>
  );
}

export default FullScreen;

