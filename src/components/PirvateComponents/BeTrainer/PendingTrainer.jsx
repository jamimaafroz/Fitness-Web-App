import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PendingTrainers = () => {
  const [pendingTrainers, setPendingTrainers] = useState([]);
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

  const confirmAction = (message, onConfirm) => {
    toast.info(
      <div className="flex flex-col gap-2">
        <p>{message}</p>
        <div className="flex justify-end gap-2">
          <Button size="sm" variant="outline" onClick={() => toast.dismiss()}>
            Cancel
          </Button>
          <Button
            size="sm"
            variant="default"
            onClick={() => {
              toast.dismiss();
              onConfirm();
            }}
          >
            Yes
          </Button>
        </div>
      </div>,
      {
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        draggable: false,
      }
    );
  };

  const updateTrainerStatus = (id, status) => {
    confirmAction(
      `Are you sure you want to ${status} this trainer?`,
      async () => {
        try {
          await axiosSecure.patch(`/trainers/pending/${id}`, { status });
          toast.success(`Trainer ${status} successfully`);
          fetchPending();
        } catch (error) {
          toast.error("Failed to update trainer status");
          console.error(error);
        }
      }
    );
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
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Email
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Age
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Skills
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Days
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Time
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Other Info
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {pendingTrainers.map((trainer) => (
                <tr key={trainer._id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">
                    {trainer.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {trainer.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {trainer.age}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {trainer.skills?.join(", ") || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {trainer.days?.join(", ") || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {trainer.time || "N/A"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 italic text-sm text-gray-600">
                    {trainer.otherInfo || "-"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 flex gap-2 justify-center">
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() =>
                        updateTrainerStatus(trainer._id, "approved")
                      }
                      className="bg-green-500 hover:bg-green-600 text-white"
                    >
                      Approve
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() =>
                        updateTrainerStatus(trainer._id, "rejected")
                      }
                      className="bg-red-500 hover:bg-red-600 text-white"
                    >
                      Reject
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PendingTrainers;
