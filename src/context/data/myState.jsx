import React, { useEffect, useState } from "react";
import MyContext from "./myContext";
import {
  Timestamp,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { auth, fireDB } from "../../fireabase/FirebaseConfig";
import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";



function myState(props) {
  const [mode, setMode, ] = useState("dark");

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    }
  };

  const [loading, setLoading] = useState(false);

  

  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    Links : null,
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  const addProduct = async () => {
    if (
      products.title == null ||
      products.price == null ||
      products.imageUrl == null ||
      products.category == null 
    ) {
      return toast.error("all fields are required");
    }

    setLoading(true);

    try {
      const productRef = collection(fireDB, "products");
      await addDoc(productRef, products);
      toast.success("Add product successfully");
      setTimeout(() => {
        window.location.href = "/ADMIN-PRODUCT";
      }, 800);
      getProductData();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    // setProducts("")
  };

  const [product, setProduct] = useState([]);

  const getProductData = async () => {
    setLoading(true);

    try {
      const q = query(collection(fireDB, "products"), orderBy("time"));

      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productArray);
        setLoading(false);
      });

      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  // update product function

  const edithandle = (item) => {
    setProducts(item);
  };

  const updateProduct = async () => {
    setLoading(true);
    try {
      await setDoc(doc(fireDB, "products", products.id), products);
      toast.success("Product Updated successfully");
      setTimeout(() => {
        window.location.href = "/ADMIN-PRODUCT";
      }, 800);
      getProductData();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // delete product

  const deleteProduct = async (item) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success("Product Deleted successfully");
      getProductData();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const [order, setOrder] = useState([]);

  const getOrderData = async () => {
    setLoading(true);
    try {
      const result = await getDocs(collection(fireDB, "orders"));
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false);
      });
      setOrder(ordersArray);
      // console.log(ordersArray)
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

 



  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    rollNumber: "",
    phone: "",
    password: "",
    address: {
      houseno: "",
      streetno: "",
      area: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
    },
  });

 

  // Function to generate a unique roll number
  const generateRollNumber = async () => {
    const rollSnapshot = await getDocs(collection(fireDB, "rollNumbers"));
    const nextRollNo = 250001 + rollSnapshot.size;

    await addDoc(collection(fireDB, "rollNumbers"), { rollNo: nextRollNo });

    return nextRollNo;
  };

 

  const addUser = async () => {
    setLoading(true);
    
    if (!newUser.name || !newUser.email || !newUser.password) {
      toast.error("All fields are required");
      setLoading(false);
      return; // Stop execution
    }

    try {
      const rollno = await generateRollNumber(); // Use await

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        newUser.email,
        newUser.password
      );

      const userId = userCredential.user.uid;

      const user = {
        name: newUser.name,
        uid: userId,
        email: newUser.email,
        rollNumber: rollno || "",
        phone: newUser.phone || "",
        address: newUser.address || {},
        time: Timestamp.now(),
      };

      const userRef = doc(collection(fireDB, "users"), userId);
      await setDoc(userRef, user);

      toast.success("Signup Successfully");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error during signup: ", error.message);
      toast.error("Your Account Already Exists");
    } finally {
      setLoading(false);
    }
  };



  

  

  const [user, setUser] = useState([]);

  const getUserData = async () => {
    setLoading(true);
    try {
      const result = await getDocs(collection(fireDB, "users"));
      const usersArray = [];
      result.forEach((doc) => {
        usersArray.push(doc.data());
      });

      setUser(usersArray);
      setLoading(false); // Move setLoading(false) outside of the loop
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
    getOrderData(); // Use getUserData instead of getOrderData
  }, []);

  const editUserHandle = (item) => {
    setUser(item); // This will update the user state with the selected item
  };

  const updateUser = async () => {
    setLoading(true);
    try {
      // Update Firestore document
      await setDoc(doc(fireDB, "users", user.uid), user);
      toast.success("User Details Updated successfully");

      // Redirect user after a delay
      window.location.href = "/profile";
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user details. Please try again.");
    } finally {
      setLoading(false); // Ensure loading state is updated even on error
    }
  };

  const deleteUserData = async (item) => {
    setLoading(true);

    try {
      // Ensure `item.uid` exists before proceeding
      if (!item.uid) {
        setLoading(false);
        return toast.error("Invalid user ID");
      }

      // Confirmation alert
      const confirmDeletion = window.confirm(
        "Are you sure you want to delete your account permanently? This action cannot be undone."
      );

      if (!confirmDeletion) {
        setLoading(false);
        return toast.info("Account deletion canceled");
      }

      // Delete user document from Firestore
      await deleteDoc(doc(fireDB, "users", item.uid));

      // Delete the authenticated user from Firebase Auth
      const user = auth.currentUser;
      if (user) {
        localStorage.clear("user");
        await deleteUser(user);
        toast.success("User deleted successfully");

        // Redirect after a delay (use React Router for better navigation)
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } else {
        toast.error("No authenticated user found");
      }

      // Refresh user data
      await getUserData();
    } catch (error) {
      console.error("Error deleting user: ", error.message);
      toast.error("Failed to delete user");
    } finally {
      // Ensure loading state is turned off
      setLoading(false);
    }
  };

  const [searchkey, setSearchkey] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterPrice, setFilterPrice] = useState("");

  return (
    <MyContext.Provider
      value={{
        mode,
        toggleMode,
        loading,
        setLoading,
        products,
        setProducts,
        addProduct,
        product,
        edithandle,
        updateProduct,
        deleteProduct,
        order,
        user,
        setUser,
        searchkey,
        setSearchkey,
        filterType,
        setFilterType,
        filterPrice,
        setFilterPrice,
        editUserHandle,
        updateUser,
        deleteUserData,
        addUser,
        newUser,
        setNewUser,
        
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
}

export default myState;
