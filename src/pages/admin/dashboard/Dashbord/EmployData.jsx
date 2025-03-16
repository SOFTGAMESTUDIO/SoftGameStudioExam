import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { fireDB } from "../../../../fireabase/FirebaseConfig";

const EmployData = () => {
  const [applications, setApplications] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    post: "",
    address: "",
    qualifications: "",
    portfolio: "",
    project: "",
    cvUrl: "",
  });

  const fetchApplications = async () => {
    try {
      const querySnapshot = await getDocs(collection(fireDB, "jobApplications"));
      const applicationsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setApplications(applicationsData);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      if (editId) {
        // Update existing application
        const docRef = doc(fireDB, "jobApplications", editId);
        await updateDoc(docRef, {
          ...formData,
          timestamp: new Date(),
        });
        setEditId(null);
      } else {
        // Add new application
        await addDoc(collection(fireDB, "jobApplications"), {
          ...formData,
          timestamp: new Date(),
        });
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        post: "",
        address: "",
        qualifications: "",
        portfolio: "",
        project: "",
        cvUrl: "",
      });
      await fetchApplications();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    setLoading(false);
  };

  const handleEdit = (app) => {
    setFormData({
      name: app.name || "",
      email: app.email || "",
      phone: app.phone || "",
      post: app.post || "",
      address: app.address || "",
      qualifications: app.qualifications || "",
      portfolio: app.portfolio || "",
      project: app.project || "",
      cvUrl: app.cvUrl || "",
    });
    setEditId(app.id);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(fireDB, "jobApplications", id));
      await fetchApplications();
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8 px-4 justify-center items-center flex flex-col">
      <div className="w-full max-w-3xl bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-400">Soft Game Studio Members Details</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="bg-black p-1 text-white border-2 border-red-500 rounded"
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              className="bg-black p-1 text-white border-2 border-red-500 rounded"
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              className="bg-black p-1 text-white border-2 border-red-500 rounded"
              type="tel"
              name="phone"
              placeholder="Phone No"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              className="bg-black p-1 text-white border-2 border-red-500 rounded"
              type="text"
              name="post"
              placeholder="Post Applied For"
              value={formData.post}
              onChange={handleChange}
              required
            />
            <input
              className="bg-black p-1 text-white border-2 border-red-500 rounded"
              type="text"
              name="portfolio"
              placeholder="Portfolio Link (Optional)"
              value={formData.portfolio}
              onChange={handleChange}
            />
            <input
              className="bg-black p-1 text-white border-2 border-red-500 rounded"
              type="text"
              name="project"
              placeholder="Project Link (Optional)"
              value={formData.project}
              onChange={handleChange}
            />
            <input
              className="bg-black p-1 text-white border-2 border-red-500 rounded"
              type="text"
              name="qualifications"
              placeholder="Qualifications"
              value={formData.qualifications}
              onChange={handleChange}
              required
            />
            <input
              className="bg-black p-1 text-white border-2 border-red-500 rounded"
              type="text"
              name="cvUrl"
              placeholder="CV Link (optional)"
              value={formData.cvUrl}
              onChange={handleChange}
            />
          </div>
          <div>
            <textarea
              className="bg-black p-1 text-white border-2 border-red-500 rounded w-full h-28"
              name="address"
              placeholder="Full Address"
              value={formData.address}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="flex justify-center items-center w-full">
            <button type="submit" className="btn w-fit p-4 border-2 border-white bg-cyan-600 rounded-full hover:scale-110" disabled={loading}>
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </div>
        </form>
        {success && <p className="text-green-400 text-center mt-4 font-medium">Application Submitted Successfully!</p>}
      </div>
      <div className="overflow-scroll w-screen p-4">
        <table className="w-full mt-8 text-sm border border-white rounded-xl">
          <thead className="bg-gray-900 text-gray-200 border border-white rounded-xl">
            <tr>
              {[ 'Name', 'Email', 'Phone', 'Post', 'Qualifications', 'Portfolio', 'Project', 'CV', 'Address', 'Actions'].map((header) => (
                <th key={header} className="px-6 py-3 text-left border-b border border-white rounded-xl">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {applications.map((app, index) => (
              <tr key={app.id} className={`transition ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-850'} hover:bg-gray-700`}>
               
                <td className="px-3 py-3 border-b border border-white rounded-xl">{app.name}</td>
                <td className="px-3 py-3 border-b border border-white rounded-xl">{app.email}</td>
                <td className="px-3 py-3 border-b border border-white rounded-xl">{app.phone}</td>
                <td className="px-3 py-3 border-b border border-white rounded-xl">{app.post}</td>
                <td className="px-3 py-3 border-b border border-white rounded-xl">{app.qualifications}</td>
                <td className="px-3 py-3 border-b border border-white rounded-xl">
                  <a href={app.portfolio} className="text-blue-400 hover:underline">Portfolio</a>
                </td>
                <td className="px-3 py-3 border-b border border-white rounded-xl">
                  <a href={app.project} className="text-blue-400 hover:underline">Project</a>
                </td>
                <td className="px-3 py-3 border-b border border-white rounded-xl">
                  <a href={app.cvUrl} className="text-blue-400 hover:underline">CV</a>
                </td>
                <td className="px-3 py-3 border-b border border-white rounded-xl">{app.address}</td>
                <td className="px-3 py-3 border-b border border-white rounded-xl flex-wrap">
                  <button className="p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition mt-2 mb-2 w-full" onClick={() => handleEdit(app)}>
                    Edit
                  </button>
                  <button className="p-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition mt-2 mb-2 w-full" onClick={() => handleDelete(app.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployData;
