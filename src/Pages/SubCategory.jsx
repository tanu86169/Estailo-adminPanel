import React, { useEffect, useState } from 'react'
import DashboardLayout from '../Components/DashboardLayout'
import axios from 'axios'

const SubCategory = () => {
    const [subCategory, setSubCategory] = useState('')
    const [subCategories, setSubCategories] = useState([]);
    const [categories, setCategories] = useState([])
    const [editId, setEditId] = useState(null)
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(null)
    const [data, setData] = useState({
        categoryId: '',
    })

    const api_url = import.meta.env.VITE_API_URL
    const token = localStorage.getItem('token')

    const handleEdit = (item) => {
        console.log(item);
        setEditId(item._id)
        setSubCategory(item.subCategoryName)
        setData({
            categoryId:item.CategoryId._id || ""
        })        
        
    }


    const getAllCategory = async () => {
        try {
            setLoading(true)
            const res = await axios.get(
                `${api_url}/api/category/get-all-category`,
                {
                    headers: {
                        Authorization: `${token}`
                    }
                }
            )
            setLoading(false)
            console.log("All Categories:", res.data)

            setCategories(res.data.category)

        } catch (error) {
            console.log("FULL ERROR:", error)
            console.log("BACKEND RESPONSE:", error.response?.data)
            setLoading(false)
        }
        finally {
            console.log("Loading subCategory End")
            setLoading(false)
        }
    }

    useEffect(() => {
        getAllCategory();
        getAllSubCategory();
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("subCategoryName", subCategory);
        formData.append("CategoryId", data.categoryId);
      
        if (image) {
            formData.append("image", image);
        }
        try {
            setLoading(true)
            
            if (editId) {
                const res = await axios.put(
                    `${api_url}/api/subCategory/sub-Update-category/${editId}`,
                    formData,
                    {
                        headers: {
                            Authorization: token
                        },
                    }
                );
                console.log(editId)
                alert("Sub Category Updated Successfully");
                await getAllSubCategory();
                setEditId(null);

            } else {
                setLoading(true)
                await axios.post(
                    `${api_url}/api/subCategory/sub-create-category`,
                    formData,
                    {
                        headers: {
                            Authorization: token,
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                setLoading(false)
                alert("Sub Category Created Successfully");
            }

            console.log("Response:", data);
            setSubCategory("");
            setImage(null);
            setData({
                subCategoryName: "",
                categoryId: "",
            });

        } catch (error) {
            console.log(error);
            setLoading(false)
        }
        finally {
            console.log("loading end")
            setLoading(false)
        }
    };

    const getAllSubCategory = async () => {
        try {
            const res = await axios.get(
                `${api_url}/api/subCategory/get-sub-allCategory`,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            console.log("All Sub Categories:", res.data);
            setSubCategories(res.data.subCategory || []);
        } catch (error) {
            console.log(error);
        }
    };

    
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${api_url}/api/subCategory/sub-delete-category/${id}`,
                {
                    headers: {
                        Authorization: token
                    }
                }
            )
            alert("subCategory deleted")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <DashboardLayout>
                <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-pink-100 mt-10">

                    <h2 className="text-3xl font-bold text-center text-[#f80451f2] mb-8">
                        Add Sub Category
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Name */}
                        <div>
                            <label className="block mb-2 font-semibold text-gray-700">
                                Sub Category Name
                            </label>

                            <input
                                type="text"
                                value={subCategory}
                                onChange={(e) => setSubCategory(e.target.value)}
                                placeholder="Enter Sub Category"
                                className="w-full border border-pink-200 rounded-xl p-3 outline-none focus:border-pink-500"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block mb-2 font-semibold text-gray-700">
                                Select Category
                            </label>

                            <select
                                value={data.categoryId}
                                onChange={(e) =>
                                    setData({ ...data, categoryId: e.target.value })
                                }
                                className="w-full border border-pink-200 rounded-xl p-3 outline-none focus:border-pink-500"
                            >
                                <option value="">---select category---</option>
                                {categories.map((item) => (
                                    <option key={item._id} value={item._id}>
                                        {item.categoryName}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Image */}
                        <div>
                            <label className="block mb-2 font-semibold text-gray-700">
                                Upload Image
                            </label>

                            <input
                                type="file"
                                onChange={(e) => setImage(e.target.files[0])}
                                className="w-full border border-pink-200 rounded-xl p-3"
                            />
                        </div>

                        {/* Preview */}

                        {image && (
                            <div className="flex justify-center">
                                <img
                                    src={URL.createObjectURL(image)}
                                    className="h-36 w-36 rounded-xl object-cover shadow-lg"
                                />
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full text-white font-semibold py-2 rounded-lg transition duration-300 ${loading
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : editId
                                        ? "bg-blue-500 hover:bg-blue-600"
                                        : "bg-pink-500 hover:bg-pink-600"
                                }`}
                        >
                            {loading
                                ? editId
                                    ? "Updating..."
                                    : "Creating..."
                                : editId
                                    ? "Update Category"
                                    : "Add Category"}
                        </button>

                    </form>

                </div>

                {/* table created */}

                <div className="max-w-6xl mx-auto mt-14 bg-white rounded-2xl shadow-xl p-8">

                    <h2 className="text-3xl font-bold text-[#f80451f2] mb-6">
                        All Sub Categories
                    </h2>

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead className="bg-[#f80451f2] text-white">

                                <tr>

                                    <th className="py-4">Image</th>

                                    <th>Sub Category</th>

                                    <th>Category</th>

                                    <th>Action</th>

                                </tr>

                            </thead>

                            <tbody>

                                {subCategories.length > 0 ? (

                                    subCategories.map((item) => (
                                        <tr
                                            key={item._id}
                                            className="text-center border-b hover:bg-pink-50 duration-300"
                                        >

                                            <td className="py-4">

                                                <img
                                                    src={item.image}
                                                    className="h-16 w-16 object-cover rounded-lg mx-auto"
                                                    alt=""
                                                />

                                            </td>

                                            <td className="font-semibold">
                                                {item.subCategoryName}
                                            </td>

                                            <td>
                                                {item.CategoryId?.categoryName}
                                            </td>

                                            <td>

                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg mr-2"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(item._id)}
                                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                                                >
                                                    Delete
                                                </button>

                                            </td>

                                        </tr>
                                    ))

                                ) : (

                                    <tr>

                                        <td
                                            colSpan="4"
                                            className="py-10 text-center text-gray-500 text-xl"
                                        >
                                            No Sub Categories Found 😔
                                        </td>

                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>
            </DashboardLayout>
        </>
    )
}

export default SubCategory;