import { useEffect, useState } from "react";
import styles from "./PostsBox.module.css";
import { useRef } from "react";

function PostsBox() {
  const [posts, setPosts] = useState([]);

  const [activePostId, setActivePostId] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    fetch("/posts.json")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error("Ошибка загрузки постов:", err));
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActivePostId(null);
      }
    }
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);  

  function timeAgo(dateString) {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffMs = now - postDate;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHr / 24);
    const diffWeek = Math.floor(diffDay / 7);
    const diffMonth = Math.floor(diffDay / 30);
    const diffYear = Math.floor(diffDay / 365);
  
    if (diffSec < 60) return "только что";
    if (diffMin < 60) return `${diffMin} мин. назад`;
    if (diffHr < 24) return `${diffHr} ч. назад`;
    if (diffDay < 7) return `${diffDay} дн. назад`;
    if (diffWeek < 5) return `${diffWeek} нед. назад`;
    if (diffMonth < 12) return `${diffMonth} мес. назад`;
    return `${diffYear} г. назад`;
  }  

  return (
    <main className={styles.postsBox}>
      <div className={styles.choosePostsType}>
        <a id="postsType-recomed" className={styles.choosePostsTypeRecomed}>
          Рекомендации
        </a>
        <a id="postsType-subs" className={styles.choosePostsTypeSubs}>
          Подписки <span></span>
        </a>
      </div>

      <section className={styles.postsList}>
        {posts.length === 0 ? (
          <p className={styles.loading}>Загрузка постов...</p>
        ) : (
          posts.map((post) => (
            <article key={post.id} className={styles.post}>
              <div className={styles.postHeader}>
                <picture className={styles.photo}>
                    <img src="./assets/images/photo.jpg"></img>
                </picture>
                <div className={styles.postSubHeader}>
                    <p className={styles.author}>{post.author}</p>
                    <p className={styles.date}>
                        <time>{timeAgo(post.timestamp)}</time>
                    </p>
                </div>
                <img className={styles.moreBtn} src="./assets/icons/more.svg" onClick={() => setActivePostId(post.id)}></img>
                {activePostId === post.id && (
                        <div ref={menuRef} className={styles.popupMenu}>
                            <button>Не интересно</button>
                            <button>Оставить жалобу</button>
                        </div>
                    )
                    }
              </div>
              <div className={styles.postContent}>
                {post.content}
              </div>
              <div className={styles.actions}>
                <div className={styles.like}>
                    <img src="./assets/icons/like.svg"></img>
                    <p>12032</p>
                </div>
                <div className={styles.comment}>
                    <img src="./assets/icons/comment.svg"></img>
                    <p>152</p>
                </div>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}

export default PostsBox;
