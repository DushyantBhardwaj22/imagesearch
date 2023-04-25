import React, { useState } from "react";
import { createApi } from "unsplash-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const unsplash = createApi({
  accessKey: "yWtWOmzKmYgZvWHF8XerBDj0PybBXBBHuPLHSI4Zpec",
});

const Images = () => {
  const [photos, setPhotos] = useState([]);
  const [search, setSearch] = useState("");
  const [bookmarks, setBookmarks] = useState([]);
  const [isClicked, setIsClicked] = useState(false);


  const bookmarkHandle = (e) => {
    toast.success("Added to Bookmarks successfully", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      theme: "colored",
    });
    setBookmarks([...bookmarks, e.target.parentNode.firstChild.src]);
  };
  

  const changeHandler = (e) => {
    setSearch(e.target.value);
  };
  const fetchedImg = async (e) => {
    e.preventDefault();
    unsplash.search.getPhotos({
        query: search,
      }).then((data) => {
        setPhotos(data.response.results);
      });
  };
  const isClickBookmark = () => {
    setIsClicked(!isClicked);
  };
  return (
    <>
      <div className="div">
      <div className="head">
        <h1>IMAGE SEARCH GALLERY</h1>
        <button id="button" className="bookmarks" onClick={isClickBookmark}>
          Bookmarks
        </button>
      </div>

      <form onSubmit={fetchedImg}>
        <input
        
          type="text"
          placeholder="Search free high resolution images"
          onChange={changeHandler}
          name="search"
          value={search}
        />
        <button  id="button1" className="sub" type="submit" >
          Search
        </button>
      </form>
      </div>

      <div className="img-con">
        {isClicked ? (
          <>
            <p className="bHead">BookMark Images</p>
            {bookmarks.map((image, i) => {
              return (
                <div className="img-div" key={i}>
                  <img className="m-img" src={image} alt="imageError" />
                </div>
              );
            })}
          </>
        ) : (
          photos.map((image) => {
            return (
             <div> 
                 <div className="imgDiv" key={image.id}>
                <img
                  className="mainimg"
                  src={image.urls.small}
                  alt="imgBookmark"
                />
                <div id="addbook" className="addBookMark" onClick={bookmarkHandle}>
                  Add to Bookmark
                  
                </div>
                <ToastContainer />
              </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Images;
