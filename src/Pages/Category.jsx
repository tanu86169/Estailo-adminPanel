import { useEffect, useState } from 'react'
import DashboardLayout from '../Components/DashboardLayout'
import axios from 'axios'

const Category = () => {

  const [categoryName, setCategoryName] = useState('')
  const [category, setCategory] = useState([])
  const [image, setImage] = useState(null)
  const [shopVibe, setShopVibe] = useState(true)
  const [loading, setLoading] = useState(false)
  const [editId, setEditId] = useState(null)
  const api_url = import.meta.env.VITE_API_URL
  const token = localStorage.getItem('token')
 const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("categoryName", categoryName);
  formData.append("shopVibe", shopVibe);

  if (image) {
    formData.append("image", image);
  }

  try {
    setLoading(true);

    if (editId) {
      // UPDATE
      await axios.put(
        `${api_url}/api/category/update-category/${editId}`,
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      alert("Category Updated Successfully");
    } else {
      // CREATE
      await axios.post(
        `${api_url}/api/category/create-category`,
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert("Category Created Successfully");
    }

    // Form reset
    setEditId(null);
    setCategoryName("");
    setImage(null);
    setShopVibe(true);

    // Table refresh
    getCategory();

  } catch (error) {
    console.log(error);
    alert("Something went wrong");
  } finally {
    setLoading(false);
  }
};

  // table ke liye
  const getCategory = async () => {
    try {

      const res = await axios.get(
        `${api_url}/api/category/all-category`
      );

      setCategory(res.data.category); // API response ke hisaab se change karna
    } catch (err) {
      console.log(err);
    }
  };


  const handleEdit = (item) => {
    setEditId(item._id);
    setCategoryName(item.categoryName);
    setShopVibe(item.shopVibe);
  };

const handleDelete =async(id)=>{
  try {
    const res = await axios.delete(`${api_url}/api/category/delete-category/${id}`,
      {
        headers:{
          Authorization: token
        }
      }
    )
    alert("category deleted")
  } catch (error) {
    console.log(error)
  }
}

  useEffect(() => {
    getCategory();
  }, [])

  return (
    <>
      <DashboardLayout>
        <div className="max-w-lg mx-auto mt-8">
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Add Category
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Category Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Name
                </label>
                <input
                  type="text"
                  name="categoryName"
                  placeholder="Enter category name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Category Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Image
                </label>
                <input
                  type="file"
                  name="categoryImage"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="w-full border border-gray-300 rounded-lg p-2 cursor-pointer"
                />
              </div>

              {/* Image Preview */}
              {image && (
                <div className="flex justify-center">
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="h-32 w-32 object-cover rounded-lg border"
                  />
                </div>
              )}

              {/* shop vibe */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="shopVibe"
                  checked={shopVibe}
                  onChange={(e) => setShopVibe(e.target.checked)}
                  className="mr-2"
                />
                <label className="text-sm font-medium text-gray-700">
                  Shop Vibe
                </label>
              </div>

              {/* luxe */}


              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full text-white font-semibold py-2 rounded-lg transition duration-300 ${loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : editId
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : "bg-blue-600 hover:bg-blue-700"
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

          {/* data ko table ke form me dikhana */}

          <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

            {/* Heading */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                📂 All Categories
              </h2>

              <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
                Total: {category.length}
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">

                <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left">Image</th>
                    <th className="px-6 py-3 text-left">Category Name</th>
                    <th className="px-6 py-3 text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {category.map((item) => (
                    <tr
                      key={item._id}
                      className="border-b hover:bg-gray-50 transition duration-300"
                    >
                      <td className="px-6 py-4">
                        <img
                          src={item.image}
                          alt={item.categoryName}
                          className="w-16 h-16 rounded-lg object-cover border shadow"
                        />
                      </td>

                      <td className="px-6 py-4 font-medium text-gray-700">
                        {item.categoryName}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-3">

                          <button
                            onClick={() => handleEdit(item)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition duration-300"
                          >
                            ✏ Edit
                          </button>

                          <button
                          onClick={()=> handleDelete(item._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-300"
                          >
                            🗑 Delete
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

          </div>
        </div>
      </DashboardLayout>
    </>
  )
}

export default Category