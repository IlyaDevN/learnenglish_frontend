import clsx from "clsx";
import { Cookies } from "react-cookie";
import { useState, useEffect } from "react";

export default function EditOwnSentences() {
  const [sentences, setSentences] = useState([]);

  useEffect(() => {
    const cookies = new Cookies();
    const currentUser = cookies.get("user");

    const fetchData = async () => {
      const response = await fetch(
        "http://englishback.ua/getOwnSentences.php",
        {
          method: "post",
          header: { "Content-type": "application/json" },
          body: JSON.stringify(currentUser),
        },
      );
      const data = await response.json();
      setSentences(data);
    };

    fetchData();
  }, []);

  return (
    <div className="px-4 py-7">
      <div
        className={clsx(
          "w-full bg-orange-100 border-4 border-s-gray-100 rounded-2xl px-3.5 py-8 bg-opacity-80",
        )}
      >
		
      </div>
    </div>
  );
}
