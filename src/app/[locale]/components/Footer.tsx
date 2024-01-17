import Link from "next/link";
function Footer() {
  return (
    <footer className=" container   grid grid-cols-3 p-4 mt-16 text-gray-100">
      <div>
        <p className="font-semibold text-[1.05rem] mb-2">Developed By</p>
        <strong className=" ont-normal">
          <a
            className=" font-medium text-gray-200 ps-2"
            href="https://github.com/Ahmed-ElDalatony"
          >
            Ahmed Dalton
          </a>
        </strong>
      </div>
      <div>
        <p className="font-semibold  text-[1.05rem] mb-2">
          Support the developer
        </p>
        <Link className="underline text-gray-200 ps-2" href={"/donate"}>
          Donate
        </Link>
      </div>
      <div>
        <p className="font-semibold  text-[1.05rem] mb-2">Contact</p>
        <ul>
          <li>
            <a
              className=" text-gray-200 ps-2"
              href={
                "https://mail.google.com/mail/u/0/?fs=1&tf=cm&to=a01141399246@gmail.com"
              }
            >
              {" "}
              Email
            </a>
          </li>
          <li>
            <a
              className=" text-gray-200 ps-2"
              href={"https://www.linkedin.com/in/ahmed-dalton-47a871234/"}
            >
              Linked in
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
