
  try {
    const formData = new FormData()
    formData.append("name", data.name)
    formData.append("price", data.price)
    formData.append("category", data.category)
    formData.append("image", data.image)

    const res = await axios.post("http://localhost:3000/api/food/add",formData)

    if (res.data.success) {
      toast.success("Food added successfully 🍔")
      setData({
        name: "",
        category: "salad",
        price: "",
        image: ""
      })
      setPreview(null)
    } else {
      toast.error("Failed to add food")
    }

    } catch (error) {
    console.log(error)
    toast.error("Server error ")
    }
    }


  
  