import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const HotCollections = () => {
  const [hotCollections, setHotCollections] = useState([]);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    mode: "free-snap",
    breakpoints: {
      "(min-width: 0px)": {
        slides: {
          slidesPerView: 1,
          spacing: 10,
        },
      },
      "(min-width: 600px)": {
        slides: {
          perView: 2,
          spacing: 10,
        },
      },
      "(min-width: 768px)": {
        slides: {
          perView: 3,
          spacing: 10,
        },
      },
      "(min-width: 1200px)": {
        slides: {
          perView: 4,
          spacing: 10,
        },
      },
    },
  });

  function Arrow(props) {
    return (
      <svg
        onClick={props.onClick}
        className={`arrow ${props.left ? "arrow--left" : "arrow--right"} `}
      >
        {props.left && <KeyboardArrowLeftIcon />}
        {!props.left && <KeyboardArrowRightIcon />}
      </svg>
    );
  }

  async function fetchData() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setHotCollections(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {hotCollections.length ? (
            <div className="navigation-wrapper">
              <div ref={sliderRef} className="keen-slider">
                {hotCollections.map((collection, index) => (
                  <div className="keen-slider__slide" key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to={`/item-details/${collection.nftId}`}>
                          <img
                            src={collection.nftImage}
                            className="lazy img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${collection.authorId}`}>
                          <img
                            className="lazy pp-coll"
                            src={collection.authorImage}
                            alt=""
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to={`/item-details/${collection.nftId}`}>
                          <h4>{collection.title}</h4>
                        </Link>
                        <span>ERC-{collection.code}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <>
                <Arrow left onClick={() => instanceRef.current?.prev()} />
                <Arrow onClick={() => instanceRef.current?.next()} />
              </>
            </div>
          ) : (
            <div className="navigation-wrapper">
              <div ref={sliderRef} className="keen-slider">
                {new Array(6).fill(0).map((_, index) => (
                  <div className="keen-slider__slide" key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Skeleton width="100%" height="200px" />
                      </div>
                      <div className="nft_coll_pp">
                        <Skeleton
                          width="60px"
                          height="60px"
                          borderRadius="50%"
                        />
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Skeleton width="100px" height="20px" />
                        <br />
                        <Skeleton width="60px" height="20px" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <>
                <Arrow left onClick={(e) => instanceRef.current?.prev()} />
                <Arrow onClick={(e) => instanceRef.current?.next()} />
              </>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
