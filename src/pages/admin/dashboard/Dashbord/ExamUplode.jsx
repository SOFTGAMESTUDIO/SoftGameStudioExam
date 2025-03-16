import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { fireDB } from "../../../../fireabase/FirebaseConfig";

const ExamDetails = () => {
    const [title, setExamTitle] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [category, setExamCategory] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocationLink] = useState("");
    const [description, setDescription] = useState("");
    const [exams, setExams] = useState([]);
    const [editingExam, setEditingExam] = useState(null);
    
    useEffect(() => {
        const fetchExams = async () => {
            const examsSnapshot = await getDocs(collection(fireDB, "ExamConduct"));
            setExams(examsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };
        fetchExams();
    }, []);

    const handleUpload = async () => {
        try {
            const newExam = { title, imageUrl, category, price, location, description, timestamp: new Date() };
            const docRef = await addDoc(collection(fireDB, "ExamConduct"), newExam);
            setExams([...exams, { id: docRef.id, ...newExam }]);
            resetForm();
            alert("Exam details added successfully!");
        } catch (error) {
            console.error("Error adding exam details:", error);
        }
    };

    const handleEdit = (exam) => {
        setEditingExam(exam);
        setExamTitle(exam.title);
        setImageUrl(exam.imageUrl);
        setExamCategory(exam.category);
        setPrice(exam.price);
        setLocationLink(exam.location);
        setDescription(exam.description);
    };

    const handleUpdate = async () => {
        if (!editingExam) return;
        try {
            const examRef = doc(fireDB, "ExamConduct", editingExam.id);
            await updateDoc(examRef, { title, imageUrl, category, price, location, description });
            setExams(exams.map(exam => exam.id === editingExam.id ? { ...exam, examTitle, imageUrl, examCategory, price, locationLink, description } : exam));
            resetForm();
            alert("Exam details updated successfully!");
        } catch (error) {
            console.error("Error updating exam details:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(fireDB, "ExamConduct", id));
            setExams(exams.filter(exam => exam.id !== id));
            alert("Exam details deleted successfully!");
        } catch (error) {
            console.error("Error deleting exam details:", error);
        }
    };

    const resetForm = () => {
        setExamTitle("");
        setImageUrl("");
        setExamCategory("");
        setPrice("");
        setLocationLink("");
        setDescription("");
        setEditingExam(null);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
            <div className="w-full max-w-3xl bg-gray-800 p-6 rounded-2xl shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-center">Manage Exam Details</h1>
                
                <input type="text" placeholder="Exam Title" value={title} onChange={(e) => setExamTitle(e.target.value)} className="w-full p-2 mb-2 bg-gray-700 rounded" />
                <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="w-full p-2 mb-2 bg-gray-700 rounded" />
                <input type="text" placeholder="Exam Category" value={category} onChange={(e) => setExamCategory(e.target.value.split(",").map((cat) => cat.trim()))} className="w-full p-2 mb-2 bg-gray-700 rounded" />
                <input type="text" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-2 mb-2 bg-gray-700 rounded" />
                <input type="text" placeholder="Location Link" value={location} onChange={(e) => setLocationLink(e.target.value)} className="w-full p-2 mb-2 bg-gray-700 rounded" />
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 bg-gray-700 rounded"></textarea>
                
                <button onClick={editingExam ? handleUpdate : handleUpload} className="bg-blue-500 hover:bg-blue-700 p-3 rounded-lg w-full mt-4">{editingExam ? "Update Exam" : "Add Exam"}</button>
            </div>
            <div className="w-full max-w-3xl bg-gray-800 p-6 rounded-2xl shadow-lg mt-6">
                <h2 className="text-2xl font-bold mb-4 text-center">Exam List</h2>
                {exams.map((exam) => (
                    <div key={exam.id} className="bg-gray-700 p-4 rounded-lg mb-2">
                        <h2 className="text-lg font-bold">{exam.title}</h2>
                        <div className="flex m-2 w-full">
                            <button onClick={() => handleEdit(exam)} className="bg-yellow-500 p-2 rounded w-full m-2">Edit</button>
                            <button onClick={() => handleDelete(exam.id)} className="bg-red-500 p-2 rounded w-full m-2 ">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExamDetails;
