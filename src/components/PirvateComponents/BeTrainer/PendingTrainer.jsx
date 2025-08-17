import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const PendingTrainers = () => {
  const { user } = useAuth();
  const [pendingTrainers, setPendingTrainers] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [showModal, setShowModal] = useState(false);
  const axiosSecure = useAxiosSecure();

  const fetchPending = async () => {
    try {
      const res = await axiosSecure.get("/trainers/pending");
      setPendingTrainers(res.data);
    } catch (err) {
      toast.error("Failed to load pending trainers");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleApprove = async (id) => {
    try {
      await axiosSecure.patch(`/trainers/pending/${id}`, {
        status: "approved",
      });
      toast.success("Trainer approved!");
      fetchPending();
    } catch (err) {
      toast.error(err.message || "Failed to approve");
    }
  };

  const handleRejectClick = (trainer) => {
    setSelectedTrainer(trainer);
    setFeedback("");
    setShowModal(true);
  };

  const handleRejectSubmit = async () => {
    try {
      await axiosSecure.patch(`/trainers/pending/${selectedTrainer._id}`, {
        status: "rejected",
        feedback,
      });
      toast.success("Trainer rejected with feedback");
      setPendingTrainers((prev) =>
        prev.filter((t) => t._id !== selectedTrainer._id)
      );
      setShowModal(false);
      setSelectedTrainer(null);
    } catch (error) {
      console.error("Rejection error:", error);
      setShowModal(false);
      toast.error("Rejection failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-bold text-center text-[#C65656] mb-6">
        Pending Trainer Requests 🕒
      </h2>

      {pendingTrainers.length === 0 ? (
        <p className="text-center text-gray-500">No pending requests found.</p>
      ) : (
        <div className="space-y-4">
          {pendingTrainers.map((trainer) => (
            <div
              key={trainer._id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <img
                  src={trainer.image || "https://via.placeholder.com/80"}
                  alt={trainer.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-[#C65656]">
                    {trainer.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{trainer.email}</p>
                  <p className="text-gray-600 text-sm">
                    Age: {trainer.age} | Skills: {trainer.skills?.join(", ")}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Days: {trainer.days?.join(", ")} | Time: {trainer.time}
                  </p>
                  {trainer.otherInfo && (
                    <p className="text-gray-500 text-sm italic mt-1">
                      {trainer.otherInfo}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-start md:justify-end">
                {user?.role === "Admin" ? (
                  <>
                    <Button
                      size="sm"
                      onClick={() => handleApprove(trainer._id)}
                      className="bg-green-500 hover:bg-green-600 text-white"
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleRejectClick(trainer)}
                      className="bg-red-500 hover:bg-red-600 text-white"
                    >
                      Reject
                    </Button>
                  </>
                ) : (
                  <span
                    className={`text-white px-3 py-1 rounded ${
                      trainer.status === "approved"
                        ? "bg-green-500"
                        : trainer.status === "rejected"
                        ? "bg-red-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {trainer.status.charAt(0).toUpperCase() +
                      trainer.status.slice(1)}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && selectedTrainer && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full space-y-4">
            <h3 className="text-xl font-semibold text-[#C65656]">
              Reject Trainer
            </h3>
            <p>
              <strong>Name:</strong> {selectedTrainer.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedTrainer.email}
            </p>
            <p>
              <strong>Skills:</strong> {selectedTrainer.skills?.join(", ")}
            </p>

            <label className="block text-sm font-medium">Feedback</label>
            <textarea
              className="w-full p-2 border rounded resize-none focus:outline-none focus:ring-2 focus:ring-[#C65656]"
              rows="4"
              placeholder="Write reason for rejection..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />

            <div className="flex justify-end gap-2 pt-2 flex-wrap">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button
                className="bg-red-500 hover:bg-red-600 text-white"
                onClick={handleRejectSubmit}
              >
                Submit Rejection
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingTrainers;
