import { useState, useEffect } from "react";
import { storage } from "./firebaseConfig.js";
import "./App.css";
import axios from "axios";


function App() {
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [document, setDocument] = useState("");
  const [textdata, setTextData] = useState({ text: "", ip: "0.0.0.0",date: "" });
  const [ip, setIp] = useState("0.0.0.0");

  useEffect(() => {
    async function getIp() {
      try {
        const response = await axios.get("https://api.ipify.org?format=json");
        setTextData({ ...textdata, ip: response.data.ip,date:new Date() });
        setIp(response.data.ip);
      } catch (error) {
        console.log(error.response.data);
      }
    }
    getIp();
  }, [textdata]);
  const uploadImage = () => {
    if (image === null) {
      alert("please!!");
    } else if (image === "0") {
      console.log("please");
    }
    if (image != null) {
      const imageref = storage
        .ref(`/images/${image.name}`)
        .put(image)
        .on("state_changed", alert("success, alert"));

      imageref();
      setTextData({ text:'image uploaded', ip: ip,date:new Date() });
      uploadText();
    }
  };
  const uploadVideo = () => {
    if (video == null) return;
    const videoref = storage
      .ref(`/videos/${video.name}`)
      .put(video)
      .on("state_changed", alert("success, alert"));

    videoref();
    setTextData({ text:'video uploaded', ip: ip ,date:new Date()});
    uploadText();
  };
  const uploadDocument = () => {
    uploadText();
    if (document == null) return;
    const documentref = storage
      .ref(`/documents/${document.name}`)
      .put(document)
      .on("state_changed", alert("success, alert"));

    documentref();
    setTextData({ text:'document uploaded', ip: ip,date:new Date() });
  };
  const uploadText = async (e) => {
    console.log(new Date())

    const { text, ip,date } = textdata;

    const res = await fetch(
      "https://react-upload-firebase-default-rtdb.firebaseio.com/text.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          ip,
          date,
        }),
      }
    );
  };
  return (
    <div className="app">
      <div className="container">
        <div className="card">
          <label>For image: </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImage(e.target.files[0]);
              setTextData({ ...textdata, text: 'image uploading',date:new Date() });
            }}
          />
          <button onClick={function(e){ uploadImage(); uploadText(textdata)}} className="button">
            Upload to Firebase
          </button>
        </div>
        <div className="card">
          <label>For video: </label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => {
              setVideo(e.target.files[0]);
            }}
          />
          <button onClick={uploadVideo} className="button">
            Upload to Firebase
          </button>
        </div>
        <div className="card">
          <label>For documents: </label>
          <input
            type="file"
            accept="file_extension"
            onChange={(e) => {
              setDocument(e.target.files[0]);
            }}
          />
          <button onClick={uploadDocument} className="button">
            Upload to Firebase
          </button>
          <div className="card">
            <label>For text: </label>
            <input
              type="text"
              onChange={(e) => {
                setTextData({ ...textdata, text: e.target.value,date:new Date() });
              }}
            />
            <button onClick={uploadText} className="button">
              Upload to Firebase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
