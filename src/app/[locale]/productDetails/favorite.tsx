"use client";
import { LuHeart } from "react-icons/lu";
import { useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import { Toaster } from "../../components/ui/toaster";
import { useToast } from "../../components/ui/use-toast";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
function Favorite({ productId }) {
  const [clicked, setClicked] = useState(false);
  const [myFavorite, setMyFavorite] = useState();
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState("");
  const [userId, setUserId] = useState();
  const [deleted, setDeleted] = useState(false);
  const [done, setDone] = useState(false);
  const path = usePathname();
  const { toast } = useToast();

  const tT = useTranslations("Toasts");
  useEffect(() => {
    fetch("/api/me")
      .then((res) => res.json())
      .then((res) => {
        setUserId(res?.user?._id ? res.user?._id : "guest");
      });
  }, [userId, path]);
  useEffect(() => {
    const favoriteHandler = async () => {
      try {
        setLoading(true);
        if (userId === "guest") {
          setError("You have to sign in first");
        }
        userId &&
          userId !== "guest" &&
          (await axios
            .get(`/api/favorite?userId=${userId}&productId=${productId}`)
            .then((res) => {
              return res.data;
            })
            .then((res) =>
              res?.favoriteExist === true
                ? setMyFavorite(true)
                : setMyFavorite(false)
            ));

        clicked &&
          !myFavorite &&
          (await axios.put(
            `/api/favorite?productId=${productId}&userId=${userId}`,
            {
              productId,
              userId,
            }
          ));
        clicked &&
          myFavorite === true &&
          (await axios.delete(
            `/api/favorite?productId=${productId}&userId=${userId}`
          ));
      } catch (err) {
        console.log(err);
      } finally {
        setClicked(false);
        setLoading(false);
        setDone(true);
      }
    };
    favoriteHandler();
  }, [clicked, userId]);

  return (
    <>
      <button
        onClick={() => {
          setClicked(true);
          Error &&
            toast({
              variant: "destructive",
              title: tT("errorTitle"),
              description: tT("errorSignIn"),
            });
          !Error &&
            myFavorite !== true &&
            toast({
              variant: "success",
              title: tT("addedTitle"),
              description: tT("addedDescription"),
            });
          !Error &&
            myFavorite &&
            toast({
              variant: "success",
              title: tT("removedTitle"),
              description: tT("removedDescription"),
            });
        }}
      >
        <LuHeart
          size={35}
          className={cn(
            "text-gray-400 hover:bg-gray-200 p-1 bg-gray-100 rounded-md ",
            myFavorite && " fill-gray-400",
            loading && "opacity-50 cursor-not-allowed pointer-events-none"
          )}
        />
      </button>
      {/* make the toaster appear in bottom*/}

      <Toaster />
    </>
  );
}

export default Favorite;
