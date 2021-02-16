import {ref} from "vue";

export default function usePosts() {
    let post = ref({});
    let posts = ref([]);
    let user = ref({});

    function fetchPosts() {
        fetch(`//jsonplaceholder.typicode.com/posts`)
            .then(response => response.json())
            .then(data => (posts.value = data));
    }

    function fetchPost(postId: any) {
        fetch(`//jsonplaceholder.typicode.com/posts/${postId}`)
            .then(response => response.json())
            .then(data => (post.value = data))
            .then(data => fetchUser(data.userId));
    }

    function fetchUser(userId: any) {
        fetch(`//jsonplaceholder.typicode.com/users/${userId}`)
            .then(response => response.json())
            .then(data => (user.value = data));
    }

    return {fetchPosts, fetchPost, fetchUser, post, posts, user}
}