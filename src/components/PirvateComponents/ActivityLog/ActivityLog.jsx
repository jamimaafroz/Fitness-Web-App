import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";

import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {
  Dialog,
  DialogTrigger,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "../../ui/dialog";

const ActivityLog = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [applications, setApplications] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/trainers/pending?email=${user.email}`)
        .then((res) => {
          setApplications(res.data.filter((app) => app.status !== "approved"));
        })
        .catch((err) => console.error("Error fetching applications:", err));
    }
  }, [user, axiosSecure]);

  const openModal = (feedback) => {
    setSelectedFeedback(feedback);
    setIsOpen(true);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Trainer Application Log</h2>

      {applications.length === 0 ? (
        <p>No trainer applications found.</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id} className="border-t">
                <td className="p-3">{app.name}</td>
                <td className="p-3 capitalize">{app.status}</td>
                <td className="p-3">
                  {app.status === "rejected" && (
                    <button
                      onClick={() => openModal(app.feedback)}
                      className="text-blue-600 hover:underline"
                      title="View Feedback"
                    >
                      <FaEye size={18} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen} className="relative z-50">
        <DialogOverlay />
        <DialogContent>
          <DialogTitle className="text-xl font-bold mb-2">Feedback</DialogTitle>
          <p>{selectedFeedback}</p>
          <DialogClose asChild>
            <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Close
            </button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActivityLog;
