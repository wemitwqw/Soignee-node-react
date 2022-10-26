import PostsTable from '../components/PostsTable';
import { useState, useEffect} from 'react';
    
function Posts() {
  
  const [isLoading, setIsLoading] = useState(true);
  const [loadedPosts, setLoadedPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/api/posts').then(res => { 
    return res.json(); 
    }).then(data => {
    setIsLoading(false);
    setLoadedPosts(data);
    });
  },[])
  
  if (isLoading) {
    return (<div>Loading...</div>);
  }

  return (
    <PostsTable posts={loadedPosts} />    
  )
}

export default Posts;