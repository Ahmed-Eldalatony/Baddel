"use client";
import "@smastrom/react-rating/style.css";
import { Textarea } from "../../components/ui/textarea";
import { useState, useEffect } from "react";
import { Rating as ReactRating } from "@smastrom/react-rating";
import { Button } from "../components/ui/button";
import { useRouter } from "next/navigation";
import { BsPersonCircle } from "react-icons/bs";
import { cn } from "../../lib/utils";
import { useRef } from "react";
import axios from "axios";
import Loading from "../../loading";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
export function RatingComponent({ productId }: String) {
  const [rating, setRating] = useState();
  const [comment, setComment] = useState();
  const [submit, setSubmit] = useState<String | boolean>(false);
  const [user, setUser] = useState();
  const [userId, setUserId] = useState();
  const [reviews, setReviews] = useState();
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [edit, setEdit] = useState<String | boolean>(false);
  const [read, setRead] = useState(false);
  const [Error, setError] = useState("");
  const [editError, setEditError] = useState("");
  const ratingRef = useRef(null);
  const inputRef = useRef(null);
  const tR = useTranslations("Product.Review");
  const path = usePathname();
  useEffect(() => {
    fetch("/api/me")
      .then((res) => res.json())
      .then((res) => {
        setUserId(res?.user?._id ? res.user?._id : "guest");
        return res;
      })
      .then((data) => data?.user?.username && setUser(data?.user));
  }, [user, path]);
  useEffect(() => {
    if (userId === undefined) {
      return;
    }
    axios
      .get(`/api/rating?productId=${productId}${`&userId=${userId}`}`)
      .then((data) => setReviews(data?.data));
  }, [submit, userId, path, edit]);
  const URL = `/api`;
  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
    } else {
      submit === true && handleReview();
    }
  }, [submit]);
  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
    } else {
      edit && handleEditing();
    }
  }, [edit, comment, rating]);

  const handleReview = async () => {
    if (userId === "guest") {
      setError("Please login to leave a review");
      return;
    }
    if (reviews?.isGuest === true) {
      setError("Please login to leave a review");
      return;
    }

    if (comment.length > 200) {
      setError("Comment must be less than 200 characters");
      return;
    }
    if (rating > 5 || rating < 1) {
      setError("Please add a rating between 1 and 5");
      return;
    }
    setError("");
    try {
      setSubmit("loading");
      await axios
        .post(`${URL}/rating`, {
          productId,
          userId: user?._id,
          username: user?.username,
          rating,
          comment,
        })
        .then((data) => data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setSubmit(false);
      setRead(true);
    }
  };

  const handleEditing = async () => {
    if (comment.length > 200) {
      setEditError("Comment must be less than 200 characters");
      return;
    }
    if (rating > 5 || rating < 1) {
      setEditError("Please add a rating between 1 and 5");
      return;
    }
    setError("");
    try {
      setEdit("loading");
      await axios
        .put(`${URL}/rating`, {
          productId,
          userId: user?._id,
          username: user?.username,
          rating,
          comment,
        })
        .then((data) => data.data);
    } catch (err) {
    } finally {
      setEdit(false);
    }
  };
  return (
    <>
      {reviews && (
        <div>
          <h3 className="text-xl text-gray-900 font-medium">
            {tR("yourReview")}
          </h3>
          <ReactRating
            style={{ maxWidth: 150 }}
            value={
              reviews?.yourRating && read ? reviews.yourRating.rating : rating
            }
            onChange={setRating}
            readOnly={read}
          />

          <Textarea
            placeholder={tR("typeReviews")}
            className={cn("mt-2 resize-none max-w-[50ch]  text-gray-700", {
              "ring-2 ring-ring ring-offset-2 ": read === false,
            })}
            cols={10}
            rows={1}
            value={
              reviews?.yourRating && read ? reviews.yourRating.comment : comment
            }
            onChange={(e) => setComment(e.target.value)}
            disabled={read}
          />
          <span className="block mt-2 text-red-600">
            {""} {Error}
          </span>
          <div className="flex items-center  gap-4">
            {!reviews?.yourRating && (
              <Button
                className=" "
                onClick={() => setSubmit(true)}
                variant={"accent"}
              >
                {tR("submit")}
              </Button>
            )}
            {reviews?.yourRating && (
              <>
                <Button
                  className={cn(
                    " text-red-500 hover:text-red-500 active-text-red-500",
                    {
                      "opacity-70 bg-gray-300 pointer-events-none":
                        submit === "loading",
                    }
                  )}
                  variant={"ghost"}
                  onClick={() => {
                    // inputRef.current.focus();
                    setRead(false);
                    setComment(reviews?.yourRating?.comment);
                    setRating(reviews?.yourRating?.rating);
                  }}
                >
                  {tR("edit")}
                </Button>

                <Button
                  variant={"ghost"}
                  className={cn(
                    " text-green-700 hover:text-green-600 active-text-green-800",
                    {
                      "opacity-70 bg-gray-300 pointer-events-none":
                        edit === "loading",
                    }
                  )}
                  onClick={() => {
                    setEdit(true);
                    setRead(true);
                    // setComment(comment);
                  }}
                >
                  {tR("done")}
                </Button>
              </>
            )}
          </div>
        </div>
      )}
      <div>
        <h3 className=" mt-16 mb-8 text-xl text-gray-900 font-medium">
          {tR("otherReviews")}
        </h3>

        {/* {reviews === "loading" && <Loading />} */}
        {reviews?.productRatings.map((review, i, arr) => (
          <div key={review._id}>
            <div className="flex gap-4 items-center">
              <BsPersonCircle size={35} color="#aaa" />
              <span className="text-gray-700">{review.username}</span>
            </div>
            <ReactRating
              // if id keyId=== userId edit else not
              key={`${i}`}
              className="mt-2 ps-2"
              style={{ maxWidth: 100 }}
              value={review.rating}
              readOnly={true}
              // ref={ratingRef}
              // onChange={setRating}
            />
            <div>
              <textarea
                onChange={(e) => setComment(e.target.value)}
                className="resize-none text-gray-700 w-full appearance-none"
                readOnly={true}
                value={review.comment}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
