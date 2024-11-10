import {
  addDoc,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Post as Ipost } from "./Main";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props {
  post: Ipost;
}

interface Like {
  likeId: string;
  userId: string;
}

export const Post = (props: Props) => {
  const { post } = props;

  const likesRef = collection(db, "likes");
  const [user] = useAuthState(auth);

  const [likes, setLikes] = useState<Like[]>([]);

  const likesDoc = query(likesRef, where("postid", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    );
  };

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postid: post.id,
      });
      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user.uid, likeId: newDoc.id }]
            : [{ userId: user.uid, likeId: newDoc.id }]
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("postid", "==", post.id),
        where("userId", "==", user?.uid)
      );

      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likedId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, "likes", likedId);
      await deleteDoc(likeToDelete);

      await addDoc(likesRef, {
        userId: user?.uid,
        postid: post.id,
      });
      if (user) {
        setLikes(
          (prev) => prev && prev.filter((like) => like.likeId !== likedId)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLikes();
  }, [post.id, user]);

  return (
    <div key={post.id}>
      <div className="title">
        <h1>{post.title}</h1>
      </div>
      <div className="body">
        <p>{post.description}</p>
      </div>
      <div className="footer">
        <p>@{post.username}</p>
        <button onClick={hasUserLiked ? removeLike : addLike}>
          {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}{" "}
        </button>
        {likes && <p> Likes:{likes.length} </p>}
      </div>
    </div>
  );
};
