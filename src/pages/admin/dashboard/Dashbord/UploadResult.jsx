import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import {fireDB} from "../../../../fireabase/FirebaseConfig"

const UploadResult = () => {
  const [formData, setFormData] = useState({
    rollNumber: "",
    name: "",
    email: "",
    subject: "",
    grade: "",
    marks: "",
    position: "",
  });

  const [loading, setLoading] = useState(false);
  const [allResults, setAllResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(formData).some((field) => !field)) {
      return toast.error("All fields are required");
    }
    setLoading(true);
    try {
      if (editId) {
        await updateDoc(doc(fireDB, "results", editId), formData);
        toast.success("Result updated successfully!");
        setEditId(null);
      } else {
        await addDoc(collection(fireDB, "results"), formData);
        toast.success("Result uploaded successfully!");
      }
      setFormData({
        rollNumber: "",
        name: "",
        email: "",
        subject: "",
        grade: "",
        marks: "",
        position: "",
      });
      fetchAllResults();
    } catch (error) {
      toast.error("Failed to save result");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllResults = async () => {
    setLoading(true);
    try {
      const resultsRef = collection(fireDB, "results");
      const querySnapshot = await getDocs(resultsRef);
      const resultsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAllResults(resultsData);
      setFilteredResults(resultsData);
    } catch (error) {
      toast.error("Failed to fetch results");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllResults();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setFilteredResults(
      !query.trim()
        ? allResults
        : allResults.filter((result) => result.email.toLowerCase().includes(query.toLowerCase()))
    );
  };

  const handleEdit = (result) => {
    setFormData(result);
    setEditId(result.id);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "results", id));
      toast.success("Result deleted successfully!");
      fetchAllResults();
    } catch (error) {
      toast.error("Failed to delete result");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6 flex flex-col items-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-3xl">
        <h1 className="text-2xl font-semibold text-center mb-6">{editId ? "Edit" : "Upload"} Student Result</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(formData).map((field) => (
            <div key={field} className="flex flex-col">
              <label className="text-sm text-gray-300 capitalize">{field}</label>
              <input
                name={field}
                type={field === "marks" ? "number" : "text"}
                value={formData[field]}
                onChange={handleChange}
                className="mt-1 p-2 rounded-md bg-gray-700 border-gray-600 text-gray-200 focus:ring-blue-500 focus:border-blue-500"
                placeholder={`Enter ${field}`}
              />
            </div>
          ))}
          <button
            type="submit"
            disabled={loading}
            className={`col-span-1 md:col-span-2 py-2 px-4 rounded-md font-semibold text-white ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {loading ? "Saving..." : editId ? "Update Result" : "Upload Result"}
          </button>
        </form>
      </div>

      <div className="w-full  mt-10 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-6">Search Student Results</h1>
        <input
          type="text"
          placeholder="Enter email to search"
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-3 rounded-lg bg-gray-700 border-gray-600 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
        />
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-gray-200">
            <thead>
              <tr className="bg-gray-700">
                {['Sr. No.', 'Roll Number', 'Name', 'Email', 'Subject', 'Grade', 'Marks', 'Position', 'Actions'].map(header => (
                  <th key={header} className="px-4 py-2">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((result, index) => (
                <tr key={result.id} className="bg-gray-700 border-b border-gray-600 text-center">
                  <td className="px-4 py-2">{index + 1}</td>
                  {Object.values(result).slice(1).map((value, i) => (
                    <td key={i} className="px-4 py-2">{value}</td>
                  ))}
                  <td className="px-4 py-2 space-x-2">
                    <button onClick={() => handleEdit(result)} className="bg-yellow-500 text-black px-2 py-1 rounded">Edit</button>
                    <button onClick={() => handleDelete(result.id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UploadResult;
