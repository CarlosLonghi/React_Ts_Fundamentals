import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import styles from './Post.module.css'

import { Comment } from './Comment'
import { Avatar } from './Avatar'

// Interfaces
interface Author {
  name: string;
  role: string;
  avatarUrl: string
}

export interface PostType {
  id: number;
  author: Author;
  publishedAt: Date;
  content: string;
}

interface PostProps {
  post: PostType;
}

// Percorre o conteúdo content e adiciona Links nas # e https
const replaceHashtagsUrlsWithLinks = (content: string) => {
  const hashtagOrUrlRegex = /#(\w+)|(https?:\/\/\S+)/g;
  
  const replacedContent = content.replace(hashtagOrUrlRegex, (match, hashtag, url) => {
    switch (true) {
      case !!hashtag:
        return `<a href="#">#${hashtag}</a>`
      case !!url:
        return `<a href="${url}" target="_blank">${url}</a>`
      default:
        return match;
    }
  });

  return replacedContent;
}

export function Post({ post }: PostProps) {
  const [comments, setComments] = useState(['Comentário exemplo'])
  const [newCommentText, setNewCommentText] = useState('')
  
  const isNewCommentEmpty = newCommentText.length === 0

  const publishedDateFormatted = format(post.publishedAt, "d 'de' LLLL 'às' H:mm'h'", {
    locale: ptBR
  }) 

  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true
  })

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault()

    if (newCommentText) {
      setComments([...comments, newCommentText])
      setNewCommentText('')
    }
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('')
    setNewCommentText(event.target.value)
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Escreva um comentário!')
  }

  function deleteComment(commentToDelete: string) {
    // Imutabilidade -> as variáveis não sofrem mutação, nós criamos um novo espaço em memória.
    const commentsWithoutDeletedOne = comments.filter(comment => {
      return comment !== commentToDelete
    })

    setComments(commentsWithoutDeletedOne)
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar
            src={post.author.avatarUrl}
          />
          <div className={styles.authorInfo}>
            <strong>{post.author.name}</strong> 
            <span>{post.author.role}</span> 
          </div>
        </div>

        <time title={publishedDateFormatted} dateTime={post.publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        <p dangerouslySetInnerHTML={{ __html: replaceHashtagsUrlsWithLinks(post.content)}}></p>
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea 
          name='comment'
          value={newCommentText}
          placeholder='Escreva um comentário...'
          onChange={handleNewCommentChange}
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button type='submit' disabled={isNewCommentEmpty}>Comentar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => {
          return (
            <Comment
              key={comment} 
              content={comment} 
              onDeleteComment={deleteComment}
            />
          )
        })}
      </div>
    </article>
  )
}