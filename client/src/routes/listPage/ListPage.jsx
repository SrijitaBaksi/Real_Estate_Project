import "./ListPage.scss";
import React, { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map.jsx";

function ListPage() {
  const data = useLoaderData(); // data contains a promise
  console.log(data.postResponse)
  return (
    <div className="ListPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter />
          <Suspense fallback={<p>Loading posts...</p>}>
            <Await resolve={data.postResponse} errorElement={<p>Error loading posts!</p>}>
              {(postResponse) => 
                postResponse.data.length > 0 ? (
                  postResponse.data.map((post) => <Card key={post.id} item={post} />)
                ) : (
                  <p>No posts found.</p>
                )
              }
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="mapContainer">
      <Suspense fallback={<p>Loading posts...</p>}>
            <Await resolve={data.postResponse} errorElement={<p>Error loading posts!</p>}>
              {(postResponse) => 
                <Map items={postResponse.data} />
               
              }
            </Await>
          </Suspense>
      </div>
    </div>
  );
}

export default ListPage;
