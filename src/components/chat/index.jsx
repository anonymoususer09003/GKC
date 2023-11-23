import { useEffect, useState } from 'react';

import { BsFillChatFill, BsFillSendFill } from 'react-icons/bs';
import { GoDeviceCameraVideo } from 'react-icons/go';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useRouter } from 'next/router';
import moment from 'moment';
import FirebaseChat from '../../hooks/firebase-chat';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { base_url } from '../../api/client';

const ChatModal = (props) => {
  const navigation = useRouter();
  const loggedInUser = useSelector((state) => state.user.userInfo);
  const {
    sendMessage,
    messages,
    setChatInfo,
    setNewMessage,
    newMessage,
    setMessages,
    chatInfo,
  } = FirebaseChat();

  const [activeChat, setActiveChat] = useState(null);

  //MESSAGES ALSO PROBABLY NEEDS TO BE CHECKED --- MESSAGE

  const instructor = {
    name: props?.instructorName,
    id: props?.instructorId,
  };

  const student = {
    name: loggedInUser?.firstName,
    id: loggedInUser?.id,
  };

  const openChat = (chatId) => {
    setChatInfo({
      sender: {
        id: props?.student?.id,
        name: props?.student?.firstName,
      },
      receiver_user: {
        id: props?.instructor?.id,
        name: props?.instructor?.firstName,
      },
      chatId,
    });
  };

  useEffect(() => {
    openChat(props?.instructor?.id + '-' + props?.student?.id);
  }, []);
  const handleTextChange = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <>
      {/* CHAT MODAL NEEDS TO BE FIXED */}
      <div tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content p-2">
            <div className="d-flex justify-content-between">
              <h5 className="modal-title" id="exampleModal2Label"></h5>
              <button
                onClick={() => {
                  props.onClose();
                  setShowModal(false); // Close the modal when the close button is clicked
                }}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">{/* Modal content here */}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ChatModal;
