import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faPaperPlane,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { getComments, postComment } from "../../services/comment.service";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const CommentOverlay = ({ targetType, Id, onClose }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    try {
      const res = await getComments(Id);

      // console.log(res);
      setComments(res?.data?.comments || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (Id) {
      fetchComments();
    }
  }, [Id]);

  const submitComment = async () => {
    if (!text.trim()) return;

    try {
      setLoading(true);

      const res = await postComment({
        targetType,
        targetId: Id,
        text,
      });

      if (res.status == 201) {
        toast.success("Your Comment Added");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-end md:items-center">
      {/* Modal */}
      <div className="bg-white w-full md:max-w-xl h-[85%] md:h-[70%] rounded-t-2xl md:rounded-2xl flex flex-col shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Comments</h2>
          <button onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} className="text-gray-500 text-xl" />
          </button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {comments.length === 0 && (
            <p className="text-gray-400 text-sm text-center">
              No comments yet 💬
            </p>
          )}

          {comments.map((c) => (
            <div
              key={c._id}
              className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition"
            >
              {/* Avatar */}
              {c?.userId?.avatar ? (
                <img
                  src={c.userId.avatar}
                  alt={c.userId.fullName}
                  className="w-9 h-9 rounded-full object-cover"
                />
              ) : (
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-200">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-gray-500 text-sm"
                  />
                </div>
              )}

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-800">
                    {c.userId?.fullName || "Unknown User"}
                  </p>

                  <span className="text-xs text-gray-400">
                    {dayjs(c.createdAt).format("DD MMM YYYY • hh:mm A")}
                  </span>
                </div>

                <p className="text-sm text-gray-700 mt-1 leading-relaxed">
                  {c.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="border-t p-3 flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write a comment..."
            className="flex-1 px-4 py-2 text-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={submitComment}
            disabled={loading}
            className="px-4 rounded-full bg-blue-600 text-white hover:bg-blue-700"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentOverlay;
