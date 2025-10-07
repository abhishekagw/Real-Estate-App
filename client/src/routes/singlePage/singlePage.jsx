import { useLoaderData, useNavigate } from "react-router-dom";
import Map from "../../components/map/Map";
import Slider from "../../components/slider/Slider";
import { singlePostData, userData } from "../../lib/dummydata";
import "./singlePage.scss";
import DOMPurify from "dompurify";
import apiRequests from "../../lib/apiRequests";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";

const SinglePage = () => {
  const post = useLoaderData();
  console.log(post);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [saved, setSaved] = useState(post.isSaved);

  const handleSave = async () => {
    setSaved((prev) => !prev);
    if (!currentUser) navigate("/login");
    try {
     await apiRequests.post("/posts/save", {
        id: post.postId._id,
      });
    } catch (error) {
      console.log(error);
      setSaved((prev) => !prev);
    }
  };

  return (
    <div className="singlepage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.postId.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.postId.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{post.postId.address}</span>
                </div>
                <div className="price">$ {post.postId.price}</div>
              </div>
              <div className="user">
                <img src={userData.img} alt="" />
                <span>{post.postId.user.username}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.desc),
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>Utilites</span>
                {post.utilites === "owner" ? (
                  <p>Owner is Responsible</p>
                ) : (
                  <p>Tenant is Responsible</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                {post.utilites === "allowed" ? (
                  <p>Pets Allowed</p>
                ) : (
                  <p>Pets Not Allowed</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Property Fees</span>
                <p>{post.income ? post.income : "Not Mentioned"}</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>
                {" "}
                <p>{post.size}</p>
                sqft
              </span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>{post.bedroom} Beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>{post.bathroom} BathRoom</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>{post.school} Away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{post.bus} Away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{post.restaurant}</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
            {/* {console.log([post])} */}
          </div>
          <div className="buttons">
            <button>
              <img src="/chat.png" alt="" />
              Send a Message
            </button>
            <button onClick={handleSave} style={{backgroundColor:saved?"#fece51":"white"}}>
              <img src="/save.png" alt="" />
             { saved?"Saved" : "Save the Place"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
