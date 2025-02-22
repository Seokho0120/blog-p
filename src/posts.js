// const apiUrl = "https://jsonplaceholder.typicode.com/posts";

// async function fetchPosts() {
//   try {
//     const response = await fetch(apiUrl);
//     if (!response.ok) throw new Error("네트워크 응답이 좋지 않습니다.");

//     const posts = await response.json();
//     console.log("posts", posts);

//     const postList = document.getElementById("post-list");
//     posts.forEach((post) => {
//       const listItem = document.createElement("li");
//       listItem.innerHTML = `<strong>${post.title}</strong><p>${post.body}</p>`;
//       // postList.appendChild(listItem);
//     });
//   } catch (error) {
//     console.error("포스트를 가져오는 중 오류 발생:", error);
//   }
// }

// document.addEventListener("DOMContentLoaded", fetchPosts);
