import { Header } from "./components/Header"
import { Post } from "./components/Post"
import { Sidebar } from "./components/Sidebar"

import styles from "./App.module.css"
import "./global.css"

// Post data
const posts = [
  {
    id: 1,
    author: {
      avatarUrl: 'https://github.com/CarlosLonghi.png',
      name: 'Carlos Longhi',
      role: 'Web Developer',
    },
    content: `Fala galeraa 👋 

    Acabei de subir mais um projeto no meu portifólio. É um projeto que fiz no Ignite. 🚀
        
    🚀 https://github.com/CarlosLonghi/Node_Fundamentals

    #novoprojeto #nlw #rocketseat`,
    publishedAt: new Date('2023-12-04 20:00:00')
  },
  {
    id: 2,
    author: {
      avatarUrl: 'https://github.com/gabrielfanti.png',
      name: 'Gabriel Fanti',
      role: 'QA'
    },
    content: `Fala galeraa 👋 
    https://www.youtube.com/watch?v=QdBZY2fkU-0
      
    #qa #dev`,
    publishedAt: new Date('2023-12-06 8:05:00')
  },
]
export function App() {
  return (
    <>
      <Header/>

      <div className={styles.wrapper}>
        <Sidebar/>
        <main>
          {posts.map(post => {
            return (
            <Post
              key={post.id}
              author={post.author}
              content={post.content}
              publishedAt={post.publishedAt}
            />)
          })}
        </main>
      </div>
    </>
  )
}