import { Await, useLoaderData } from "react-router-dom";
import Card from "../../components/card/Card";
import Filter from "../../components/filter/Filter";
import Map from "../../components/map/Map";
import { listData } from "../../lib/dummydata";
import "./ListPage.scss";
import { Suspense } from "react";

const ListPage = () => {
  const data = useLoaderData();

  return (
    <div className="listpage">
      <div className="listContainer">
        List
        <div className="wrapper">
          <Filter />
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.postResponse}
              errorElement={<p>Error loading Posts!</p>}
            >
              {(postResponse) =>
                postResponse.data.map((post) => (
                  <Card key={post._id} item={post} />
                ))
              }
            </Await>
          </Suspense>
        </div>
      </div>
      <div className="mapContainer">
        <Suspense fallback={<p>Loading...</p>}>
          <Await
            resolve={data.postResponse}
            errorElement={<p>Error loading Map!</p>}
          >
            {(postResponse) => (
              <Map
                items={postResponse.data.map((post) => ({
                  postId: post, // wrap the entire post inside postId
                }))}
              />
            )}
          </Await>
        </Suspense>
      </div>
    </div>
  );
};

export default ListPage;
