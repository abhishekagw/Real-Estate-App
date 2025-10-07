import React from "react";
import Card from "../card/Card";
import { listData } from "../../lib/dummydata";
import "../list/list.scss";

const List = ({ posts }) => {
  return (
    <div className="list">
      {posts && posts.map((item) => <Card key={item._id} item={item} />)}
      {!posts &&console.log(posts)}
    </div>
  );
};

export default List;
