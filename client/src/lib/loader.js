import { defer } from "react-router-dom";
import apiRequests from "./apiRequests";

export const singlePageLoader = async ({ request, params }) => {
  const res = await apiRequests.get("/posts/" + params.id);
  return res.data;
};

export const listPageLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1];
  const postPromise = apiRequests.get("/posts?" + query);
  return defer({
    postResponse: postPromise,
  });
};

export const profilePageLoader = async () => {
  try {
    
    const userPromise = apiRequests.get("/users/profilePosts");
    const chatPromise = apiRequests.get('/chats')
    return defer({
      userResponse: userPromise,
      chatResponse: chatPromise,
    });
  } catch (error) {
    console.log(error)
  }
};
