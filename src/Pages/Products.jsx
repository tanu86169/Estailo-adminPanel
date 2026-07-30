import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DashboardLayout from '../Components/DashboardLayout'

const Products = () => {

  const api_url = import.meta.env.VITE_API_URL
  const token = localStorage.getItem('token')
  const [images, setImages] = useState([])
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [editId, setEditId] = useState(null)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    productName: '',
    price: '',
    description: '',
    category: '',
    subCategory: '',
    trending: true,
    favorite: true,
    antiTernish: true,
    newArrivals: true,
    hairAccessories: true,
    ownBox: true,
  })

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("productName", data.productName);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("subCategory", data.subCategory);
    formData.append("trending", data.trending);
    formData.append("favorite", data.favorite);
    formData.append("antiTernish", data.antiTernish);
    formData.append("newArrivals", data.newArrivals);
    formData.append("hairAccessories", data.hairAccessories);
    formData.append("ownBox", data.ownBox);
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    try {
      setLoading(true)
      if (editId) {

        await axios.put(
          `${api_url}/api/product/update/${editId}`,
          formData,
          {
            headers: {
              Authorization: token,
            },
          }
        );

        setLoading(false)
        alert("Product Updated SUccessfully");

      } else {

        setLoading(true)
        await axios.post(
          `${api_url}/api/product/create`,
          formData,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setLoading(false)
        alert("Product Added");
      }

      setEditId(null);

      setData({
        productName: "",
        price: "",
        description: "",
        category: "",
        subCategory: '',
        trending: true,
        favorite: true,
        antiTernish: true,
        newArrivals: true,
        hairAccessories: true,
        ownBox: true,
      });

      setImages([]);

      getProduct();
      getAllCategory();

    } catch (error) {
      console.log(error);
      setLoading(false)
    }
    finally {
      console.log("Loading end");
      setLoading(false)
    }
  };


  const getAllCategory = async () => {
    try {
      const res = await axios.get(
        `${api_url}/api/category/get-all-category`,
        {
          headers: {
            Authorization: token
          }
        }
      )

      console.log("All Categories:", res.data)

      setCategories(res.data.category)

    } catch (error) {
      console.log("FULL ERROR:", error)
      console.log("BACKEND RESPONSE:", error.response?.data)
    }
  }

  const subCategory = async (categoryId) => {
    try {
      const res = await axios.get(
        `${api_url}/api/subCategory/get-sub-categoryById/${categoryId}`,
        {
          headers: {
            Authorization: token
          }
        }
      );
      setSubCategories(res.data.data || []);
    } catch (error) {
      console.log(error)
      setSubCategories([]);
    }
  };

  const getProduct = async () => {
    try {
      const res = await axios.get(`${api_url}/api/product/get-all`, {
        headers: {
          Authorization: `${token}`
        }
      })
      console.log("All Products:", res.data)
      setProducts(res.data.product)
    } catch (error) {
      console.log(error)
    }
  }

  const getAllProduct = async () => {
    try {
      const res = await axios.get(
        `${api_url}/api/product/get-all-product`,
        {
          headers: {
            Authorization: token
          }
        }
      );

      console.log("All Products:", res.data);
      setProducts(res.data.product || []);

    } catch (error) {
      console.log("FULL ERROR:", error);
      console.log("BACKEND RESPONSE:", error.response?.data);
      console.log("STATUS:", error.response?.status);
    }
  };
  useEffect(() => {
    getAllCategory(),
      getAllProduct()
  },[])

  const handleEdit =async (item) => {
  console.log("Edit Item:", item);
  setEditId(item._id);
     await subCategory(item.category._id);
    setData({
      productName: item.productName,
      price: item.price,
      description: item.description,
      category: item.category._id,
      subCategory: item.subCategory._id,
      trending: item.trending,
      favorite: item.favorite,
      antiTernish: item.antiTernish,
      newArrivals: item.newArrivals,
      hairAccessories: item.hairAccessories,
      ownBox: item.ownBox,
    })
  }
  const handleDelete = async (id) => {
    try {
     const res = await axios.delete(
        `${api_url}/api/product/delete/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert("Product Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <DashboardLayout>

      <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg p-6 rounded-xl">

        <h1 className="text-2xl font-bold text-center mb-5">
          Add Product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="productName"
            placeholder="Enter Product Name"
            value={data.productName}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={(e) =>
              setData({
                ...data,
                productName: e.target.value
              })
            }
          />

          <input
            type="number"
            name='price'
            placeholder="Enter Price"
            value={data.price}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={(e) =>
              setData({
                ...data,
                price: e.target.value
              })
            }
          />

          <textarea
            name='description'
            type='text'
            placeholder="Enter Description"
            value={data.description}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            onChange={(e) =>
              setData({
                ...data,
                description: e.target.value
              })
            }
          />

          {/* category select */}
          <select
            value={data.category}
            onChange={(e) => {
              const id = e.target.value;

              setData({
                ...data,
                category: id,
                subCategory: "",
              });

              subCategory(id); // function call
            }}
            className="w-full border border-gray-300 p-3 rounded-lg bg-white focus:ring-2 focus:ring-blue-400 outline-none"
          >
            <option value="">Select Category</option>
            {categories.map((item) => (
              <option key={item._id} value={item._id}>
                {item.categoryName}
              </option>
            ))}
          </select>

          {/* sub Category select*/}
          <select
            value={data.subCategory}
            onChange={(e) =>
              setData({
                ...data,
                subCategory: e.target.value
              })
            }
            className="w-full border border-pink-200 rounded-xl p-3 outline-none"
          >
            <option value="">---Select Sub Category---</option>

            {Array.isArray(subCategories) &&
              subCategories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.subCategoryName || item.subCategory || item.name}
                </option>
              ))}
          </select>
          <input
            type="file"
            multiple onChange={(e) => {
              console.log(e.target.files);
              setImages(e.target.files);
            }}

            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              id="trending"
              name="trending"
              checked={data.trending}
              onChange={(e) =>
                setData({
                  ...data,
                  trending: e.target.checked
                })
              }
              className="mr-2"
            />
            <label>Trending</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="favorite"
              name="favorite"
              checked={data.favorite}
              onChange={(e) =>
                setData({
                  ...data,
                  favorite: e.target.checked

                })
              }
              className="mr-2"
            />
            <label>Favorite</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="antiTernish"
              name="antiTernish"
              checked={data.antiTernish}
              onChange={(e) =>
                setData({
                  ...data,
                  antiTernish: e.target.checked

                })
              }
              className="mr-2"
            />
            <label>Anti Ternish</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="newArrivals"
              name="newArrivals"
              checked={data.newArrivals}
              onChange={(e) =>
                setData({
                  ...data,
                  newArrivals: e.target.checked

                })
              }
              className="mr-2"
            />
            <label>New Arrivals</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="hairAccessories"
              name="hairAccessories"
              checked={data.hairAccessories}
              onChange={(e) =>
                setData({
                  ...data,
                  hairAccessories: e.target.checked

                })
              }
              className="mr-2"
            />
            <label>Hair Accessories</label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="ownBox"
              name="ownBox"
              checked={data.ownBox}
              onChange={(e) =>
                setData({
                  ...data,
                  ownBox: e.target.checked

                })
              }
              className="mr-2"
            />
            <label>Own Box</label>
          </div>

          <button
  type="submit"
  disabled={loading}
  className={`
    w-full 
    py-3 
    rounded-xl 
    text-white 
    font-semibold 
    transition-all 
    duration-300
    flex 
    items-center 
    justify-center
    gap-2
    ${
      loading
        ? "bg-gray-400 cursor-not-allowed"
        : editId
        ? "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg"
        : "bg-pink-600 hover:bg-pink-700 shadow-md hover:shadow-lg"
    }
  `}
>
  {loading ? (
    <>
      <div className="
        w-5 
        h-5 
        border-2 
        border-white 
        border-t-transparent 
        rounded-full 
        animate-spin
      "></div>

      <span>
        {editId ? "Updating Product..." : "Creating Product..."}
      </span>
    </>
  ) : (
    editId ? "Update Product" : "Add Product"
  )}
</button>

        </form>

      </div>
     <div className="mt-10 bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">

  {/* Header */}
  <div className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b">
    <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
      All Products
    </h2>

    <span className="text-sm text-gray-500">
      Total: {products.length} Products
    </span>
  </div>


  {/* Desktop Table */}
  <div className="hidden md:block overflow-x-auto">

    <table className="w-full">

      <thead>
        <tr className="bg-gray-50 text-gray-600 text-sm uppercase">
          <th className="px-6 py-4 text-left">Image</th>
          <th className="px-6 py-4 text-left">Product</th>
          <th className="px-6 py-4 text-left">Price</th>
          <th className="px-6 py-4 text-left">Description</th>
          <th className="px-6 py-4 text-left">Category</th>
          <th className="px-6 py-4 text-center">Action</th>
        </tr>
      </thead>
      <tbody>

      {products.map((item)=>(

        <tr 
        key={item._id}
        className="border-b hover:bg-pink-50 transition"
        >

          <td className="px-6 py-4">
            <img
              src={item.images?.[0]?.url}
              className="h-14 w-14 rounded-xl object-cover"
            />
          </td>


          <td className="px-6 py-4">
            <p className="font-semibold">
              {item.productName}
            </p>
          </td>


          <td className="px-6 py-4">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
              ₹{item.price}
            </span>
          </td>


          <td className="px-6 py-4 max-w-xs">
            <p className="line-clamp-2 text-sm text-gray-600">
              {item.description}
            </p>
          </td>


          <td className="px-6 py-4">
            <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full">
              {item.category?.categoryName || "N/A"}
            </span>
          </td>


          <td className="px-6 py-4">

            <div className="flex justify-center gap-2">

              <button
              onClick={()=>handleEdit(item)}
              className="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm">
                Edit
              </button>


              <button
              onClick={()=>handleDelete(item._id)}
              className="bg-red-500 text-white px-3 py-2 rounded-lg text-sm">
                Delete
              </button>

            </div>

          </td>

        </tr>

      ))}

      </tbody>

    </table>

  </div>



  {/* Mobile Card View */}
  <div className="md:hidden p-4 space-y-5">

  {
    products.map((item)=>(

      <div
      key={item._id}
      className="
      border 
      rounded-2xl 
      p-4
      shadow-sm
      hover:shadow-md
      transition
      "
      >

        <div className="flex gap-4">

          <img
          src={item.images?.[0]?.url}
          className="
          h-20
          w-20
          rounded-xl
          object-cover
          "
          />


          <div>

            <h3 className="font-bold text-gray-800">
              {item.productName}
            </h3>


            <p className="text-green-600 font-semibold mt-1">
              ₹{item.price}
            </p>


            <span className="
            inline-block
            mt-2
            bg-pink-100
            text-pink-600
            px-3 py-1
            rounded-full
            text-xs
            ">
              {item.category?.categoryName || "N/A"}
            </span>

          </div>

        </div>



        <p className="
        text-sm 
        text-gray-600 
        mt-4
        line-clamp-3
        ">
          {item.description}
        </p>



        <div className="flex gap-3 mt-4">

          <button
          onClick={()=>handleEdit(item)}
          className="
          flex-1
          bg-blue-500
          text-white
          py-2
          rounded-lg
          text-sm
          ">
            Edit
          </button>


          <button
          onClick={()=>handleDelete(item._id)}
          className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm
          ">
            Delete
          </button>


        </div>


      </div>

    ))
  }

  </div>



  {/* Empty */}
  {
    products.length===0 && (
      <div className="py-10 text-center text-gray-400">
        <p className="font-semibold">
          No Products Found
        </p>
      </div>
    )
  }


</div>

    </DashboardLayout>
  )
}

export default Products