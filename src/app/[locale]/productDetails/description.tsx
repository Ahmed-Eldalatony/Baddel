"use client";
import { set } from "mongoose";
import { useState } from "react";
function Description({ description, more, less }) {
  const descriptionArr = description.split("- ");
  const [num, setNum] = useState(2);
  const [buttonOpen, setButtonOpen] = useState(false);
  return (
    <div>
      {/* <p className="bg-gray-100 w-[40em] p-5  text-gray-800 rounded-lg mt-3 whitespace-pre-line"> */}
      <ul className="list-disc list-inside bg-gray-100 w-[40em] md:w-[33em] p-5  text-gray-700 rounded-lg mt-3 whitespace-pre-line">
        {descriptionArr
          .filter((item) => {
            return item !== "";
          })
          .map((item, i, arr) => {
            arr.length = num;
            return (
              <li key={i} className="w-[55ch] md:w-[42ch] sm:w-[30ch]   mb-3">
                {item}
              </li>
            );
          })}
        {/* </p> */}
        {descriptionArr.length > 2 && (
          <button
            onClick={() => {
              !buttonOpen ? setNum(10) : setNum(2);
              setButtonOpen(!buttonOpen);
            }}
            className="font-semibold"
          >
            {buttonOpen ? less : more}
          </button>
        )}
      </ul>
    </div>
  );
}

export default Description;
