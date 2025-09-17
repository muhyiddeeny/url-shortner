import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("urlHistory")) || [];
    setHistory(stored);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem("urlHistory");
    setHistory([]);
  };

  return (
    <div className="history-container">
      <h2>History</h2>
      {history.length === 0 ? (
        <p>No history found.</p>
      ) : (
        history.map((item, index) => (
          <div key={index} className="history-item">
            <p><b>Original:</b> {item.original}</p>
            <p>
              <b>Short:</b>{" "}
              <a href={item.short} target="_blank" rel="noreferrer">
                {item.short}
              </a>
            </p>
            <small>{item.date}</small>
            <br />

         
            <CopyToClipboard text={item.short}>
              <button>Copy</button>
            </CopyToClipboard>

            <hr />
          </div>
        ))
      )}

      {history.length > 0 && (
        <button onClick={clearHistory}>Clear History</button>
      )}
    </div>
  );
}

export default History;
