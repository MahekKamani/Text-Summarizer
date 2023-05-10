import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Form({ setSummary, setOriginal }) {
  const [file, setfile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handlefileChange = (event) => {
    setfile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    if (file) {
      const formData = new FormData();
      formData.set('file', file);
      const fileReader = new FileReader();
      fileReader.onloadend = (e) => {
        setOriginal(fileReader.result);
      };
      fileReader.readAsText(file);
      fetch(`${process.env.REACT_APP_BASE_URL}/file`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then(({ summary }) => {
          if (summary) {
            setSummary(summary);
            navigate('/summary');
          }
        });
    } else if (message) {
      setOriginal(message);
      fetch(`${process.env.REACT_APP_BASE_URL}/text`, {
        method: "POST",
        body: JSON.stringify({ text: message }),
        headers: {'content-type':'application/json'}
      })
        .then((res) => res.json())
        .then(({ summary }) => {
          if (summary) {
            setSummary(summary);
            navigate('/summary');
          }
        });
    } else {
      setError("Text or File is Required");
    }
  };

  return (
    <div className="HomeScreen">
      <div className="nav">
        <h1>Text Summarizer</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="Uploadfile">
        <h2>No need to go through large and boring text files</h2>
        <h2>Upload your text file here and get the summary.</h2>
          <input
            type="file"
            accept=".txt"
            name="file"
            onChange={handlefileChange}
          ></input>
        </div>
        <input className="button" type="submit" value="Get Summary" />
        {error && <p className="danger-text">{error}</p>}
      </form>
    </div>
  );
}

export default Form;
