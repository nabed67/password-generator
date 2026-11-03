import { useState } from "react";
import { generatePassword } from "./utils/generate-password";

export default function App() {
  const [length, setLength] = useState(8);
  const [passwords, setPasswords] = useState([]);

  const generate = () => {
    const results = Array.from({ length: 1 }, () => generatePassword(length));
    setPasswords(results);
  };

  const copyPassword = async (password) => {
    await navigator.clipboard.writeText(password);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-md mx-auto pt-12">
        <h1 className="text-3xl font-bold mb-2">Password Generator</h1>

        <p className="text-slate-400 mb-8">
          Generate memorable passwords using meaningful words.
        </p>

        <div className="bg-slate-900 rounded-xl p-6">
          <label className="block mb-3">
            Password Length: <strong>{length}</strong>
          </label>

          <input
            type="range"
            min="5"
            max="10"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full mb-6"
          />

          <button
            onClick={generate}
            className="w-full bg-blue-600 hover:bg-blue-700
              rounded-lg py-3 font-semibold"
          >
            Generate Passwords
          </button>

          <div className="mt-6 space-y-3">
            {passwords.map((password, index) => (
              <div
                key={`${password}-${index}`}
                className="flex justify-between items-center
                  bg-slate-800 rounded-lg p-4"
              >
                <span className="font-mono text-lg">{password}</span>

                <button
                  type="button"
                  onClick={() => copyPassword(password)}
                  className="text-blue-400 hover:text-blue-300 transition-colors  focus:scale-95"
                  aria-label={`Copy password ${index + 1}`}
                  title="Copy"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <rect x="9" y="9" width="11" height="11" rx="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
