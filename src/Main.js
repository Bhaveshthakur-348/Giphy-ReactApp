// MY CODESandBOX LINK:
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "./Loader";
import React, { useState, useEffect } from "react";
import "./Main.css";
import axios from "axios";
import { Button } from "@material-ui/core";

function Main() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);

      try {
        const results = await axios("https://api.giphy.com/v1/gifs/trending", {
          params: {
            api_key: "ObZ4Wg8MBKE9k5hJqTMNCnaogexuSpmi",
            limit: 100,
          },
        });

        console.log(results);
        setData(results.data.data);
      } catch (err) {
        setIsError(true);
        setTimeout(() => setIsError(false), 3000);
      }
    };

    fetchData();
  }, []);

  const renderGifs = () => {
    return data.map((el) => {
      return (
        <div key={el.id} className="gif">
          <img src={el.images.fixed_height.url} />
        </div>
      );
    });
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsError(false);

    try {
      const results = await axios("https:/api.giphy.com/v1/gifs/search", {
        params: {
          api_key: "ObZ4Wg8MBKE9k5hJqTMNCnaogexuSpmi",
          q: search,
          limit: 100,
        },
      });
      setData(results.data.data);
    } catch (err) {
      setIsError(true);
      setTimeout(() => setIsError(false), 4000);
    }
  };
  const renderError = () => {
    if (isError) {
      return <div>Unable to get Gifs, please try again in a few second</div>;
    }
  };

  return (
    <>
      <div className="header">
        {renderError()}
        <img
          className="header__icon"
          src="https://cdn.worldvectorlogo.com/logos/giphy-logo.svg"
          alt="img"
        />
        <div className="header__right">
          <input
            value={search}
            onChange={handleSearchChange}
            type="text"
            placeholder="search"
            className="form-control"
          />
          <Button
            onClick={handleSubmit}
            type="submit"
            variant="contained"
            color="primary"
          >
            Search
          </Button>
        </div>
      </div>
      <div>
        <InfiniteScroll
          dataLength={data.length}
          next={renderGifs}
          hasMore={true}
          loader={<Loader />}
        >
          <div className="container gifs">{renderGifs()}</div>
        </InfiniteScroll>
      </div>
    </>
  );
}
export default Main;
