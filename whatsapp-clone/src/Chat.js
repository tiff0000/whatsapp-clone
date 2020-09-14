import React from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
function Chat() {
  return (
    <div className="chat">
      {/* ------ start chat header  ------*/}
      <div className="chat__header">
        <Avatar />

        <div className="chat__headerInfo">
          <h3>Room name</h3>
          <p>last seen at ..</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      {/* ------ END chat header  ------*/}

      {/* ------ start chat body  ------*/}
      <div className="chat__body">
        <p className="chat__message">
          <span className="chat__name">Sonny</span>
          message ...
          <span className="chat__timestamp"> {new Date().toUTCString()} </span>
        </p>

        <p className="chat__message">
          <span className="chat__name">Sonny</span>
          message ...
          <span className="chat__timestamp"> {new Date().toUTCString()} </span>
        </p>

        <p className="chat__message chat__receiver">
          <span className="chat__name">Sonny</span>
          message ...
          <span className="chat__timestamp"> {new Date().toUTCString()} </span>
        </p>
      </div>
      {/* ------ END chat body  ------*/}

      {/* ------ START chat footer  ------*/}
      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input type="text" placeholder="Type a message" />
          <button type="submit">Send a message</button>
        </form>
        <MicIcon />
      </div>
      {/* ------ END chat footer  ------*/}
    </div>
  );
}

export default Chat;
