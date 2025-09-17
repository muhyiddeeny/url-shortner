import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import axios from "axios";

function LinkResult({ inputValue }) {
  const [shortenLink, setShortenLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://tinyurl.com/api-create.php?url=${encodeURIComponent(inputValue)}`
      );
      setShortenLink(res.data);


      let history = JSON.parse(localStorage.getItem("urlHistory")) || [];
      history.push({
        original: inputValue,
        short: res.data,
        date: new Date().toLocaleString()
      });
      localStorage.setItem("urlHistory", JSON.stringify(history));

    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inputValue.length) {
      fetchData();
    }
  }, [inputValue]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopied(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [copied]);

  if (loading) return <p className="noData">Loading...</p>;
  if (error) return <p className="noData">Something went wrong</p>;

  return (
    <>
      {shortenLink && (
        <div className="result">
          <p>{shortenLink}</p>

          <CopyToClipboard text={shortenLink} onCopy={() => setCopied(true)}>
            <button className={copied ? "copied" : ""}>
              {copied ? "Copied!" : "Copy"}
            </button>
          </CopyToClipboard>
        </div>
      )}
    </>
  );
}

export default LinkResult;
