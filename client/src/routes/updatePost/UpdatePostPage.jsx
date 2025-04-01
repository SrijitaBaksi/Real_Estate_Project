import { useEffect, useState } from "react";
import "../newPostPage/NewPostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../lib/apiRequests";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { useNavigate, useParams } from "react-router-dom";

function UpdatePostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [postData, setPostData] = useState(null);
  const [value, setValue] = useState(""); // For description
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await apiRequest.get(`/posts/${id}`);
        console.log("Fetched post data:", res.data);

        setPostData(res.data);
        setValue(res.data?.postDetail?.desc || "");
        setImages(res.data?.images || []);
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      await apiRequest.put(`/posts/${id}`, {
        
          title: inputs.title,
          price: parseInt(inputs.price),
          address: inputs.address,
          city: inputs.city,
          bedroom: parseInt(inputs.bedroom),
          bathroom: parseInt(inputs.bathroom),
          type: inputs.type,
          property: inputs.property,
          latitude: inputs.latitude,
          longitude: inputs.longitude,
          images: images,
        
        postDetail: {
          desc: value,
          utilities: inputs.utilities,
          pet: inputs.pet,
          income: inputs.income,
          size: parseInt(inputs.size),
          school: parseInt(inputs.school),
          bus: parseInt(inputs.bus),
          restaurant: parseInt(inputs.restaurant),
        },
      });
      navigate("/" + id);
    } catch (err) {
      console.log(err);
      setError("Failed to update post");
    }
  };

  if (!postData) return <p>Loading...</p>;

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Update Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" defaultValue={postData?.title || ""} />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="number" defaultValue={postData?.price || ""} />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" defaultValue={postData?.address || ""} />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" defaultValue={postData?.city || ""} />
            </div>
            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input min={1} id="bedroom" name="bedroom" type="number" defaultValue={postData?.bedroom || ""} />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input min={1} id="bathroom" name="bathroom" type="number" defaultValue={postData?.bathroom || ""} />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" defaultValue={postData?.latitude || ""} />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" defaultValue={postData?.longitude || ""} />
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type" defaultValue={postData?.type || "rent"}>
                <option value="rent">Rent</option>
                <option value="buy">Buy</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="property">Property</label>
              <select name="property" defaultValue={postData?.property || "apartment"}>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select name="utilities" defaultValue={postData?.utilities || "owner"}>
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select name="pet" defaultValue={postData?.postDetail?.pet || "allowed"}>
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="income">Income Policy</label>
              <input id="income" name="income" type="text" defaultValue={postData?.postDetail?.income || ""} />
            </div>
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input min={0} id="size" name="size" type="number" defaultValue={postData?.postDetail?.size || ""} />
            </div>
            <div className="item">
              <label htmlFor="school">School</label>
              <input min={0} id="school" name="school" type="number" defaultValue={postData?.postDetail?.school || ""} />
            </div>
            <div className="item">
              <label htmlFor="bus">Bus</label>
              <input min={0} id="bus" name="bus" type="number" defaultValue={postData?.postDetail?.bus || ""} />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Restaurant</label>
              <input min={0} id="restaurant" name="restaurant" type="number" defaultValue={postData?.postDetail?.restaurant || ""} />
            </div>
            <button className="sendButton">Update</button>
            {error && <span>{error}</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images.map((image, index) => (
          <img src={image} key={index} alt="" />
        ))}
        <UploadWidget setState={setImages} />
      </div>
    </div>
  );
}

export default UpdatePostPage;
