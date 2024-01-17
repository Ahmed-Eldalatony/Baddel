import TheRedTriangle from "@/public/imgs/TheRedTriangle.svg";
import Image from "next/image";
function Loading() {
  return (
    <span className="h-screen  w-screen flex justify-center items-center">
      <Image
        className="animate-bounce  duration-500 w-32 "
        src={TheRedTriangle}
        alt="The Red Triangle"
      />
    </span>
  );
}

export default Loading;
