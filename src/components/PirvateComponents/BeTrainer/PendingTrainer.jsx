import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
// <-- added this

const PendingTrainers = () => {
  const { user } = useAuth(); // <-- get current user info

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
      toast.error("Failed to approve", err.message || "Unknown error");
    }
  };

  const handleRejectClick = (trainer) => {
    setSelectedTrainer(trainer);
    setFeedback("");
    setShowModal(true);
    setPendingTrainers("");
  };

  const handleRejectSubmit = async () => {
    try {
      await axiosSecure.patch(`/trainers/pending/${selectedTrainer._id}`, {
        status: "rejected",
        feedback,
      });
      toast.success("Trainer rejected with feedback");
      // Remove the rejected trainer from the list right away
      setPendingTrainers((prev) =>
        prev.filter((t) => t._id !== selectedTrainer._id)
      );
      setShowModal(false);
      setSelectedTrainer(null);
      setFeedback(""); // Clear feedback input too, just to be safe
    } catch (err) {
      toast.error("Rejection failed");
      console.error(err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        Pending Trainer Requests 🕒
      </h2>

      {pendingTrainers.length === 0 ? (
        <p className="text-center text-gray-500">No pending requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-[#C65656] text-white">
              <tr>
                <th className="border px-4 py-2 whitespace-nowrap">Name</th>
                <th className="border px-4 py-2 whitespace-nowrap">Email</th>
                <th className="border px-4 py-2 whitespace-nowrap hidden sm:table-cell">
                  Age
                </th>
                <th className="border px-4 py-2 whitespace-nowrap">Skills</th>
                <th className="border px-4 py-2 whitespace-nowrap hidden md:table-cell">
                  Days
                </th>
                <th className="border px-4 py-2 whitespace-nowrap hidden md:table-cell">
                  Time
                </th>
                <th className="border px-4 py-2 italic whitespace-nowrap hidden lg:table-cell">
                  Other Info
                </th>
                <th className="border px-4 py-2 text-center whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {pendingTrainers.map((trainer) => (
                <tr key={trainer._id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2 whitespace-nowrap">
                    {trainer.name}
                  </td>
                  <td className="border px-4 py-2 whitespace-nowrap">
                    {trainer.email}
                  </td>
                  <td className="border px-4 py-2 whitespace-nowrap hidden sm:table-cell">
                    {trainer.age}
                  </td>
                  <td className="border px-4 py-2 whitespace-nowrap">
                    {trainer.skills?.join(", ")}
                  </td>
                  <td className="border px-4 py-2 whitespace-nowrap hidden md:table-cell">
                    {trainer.days?.join(", ")}
                  </td>
                  <td className="border px-4 py-2 whitespace-nowrap hidden md:table-cell">
                    {trainer.time}
                  </td>
                  <td className="border px-4 py-2 italic whitespace-nowrap hidden lg:table-cell">
                    {trainer.otherInfo || "-"}
                  </td>
                  <td className="border px-4 py-2 flex flex-wrap gap-2 justify-center whitespace-nowrap">
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
                      <span className="text-gray-500 italic">No actions</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL */}
      {showModal && selectedTrainer && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-lg w-full space-y-4">
            <h3 className="text-xl font-semibold">Reject Trainer</h3>
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
              className="w-full p-2 border rounded"
              rows="4"
              placeholder="Write reason for rejection..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />

            <div className="flex justify-end gap-2 pt-2">
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
