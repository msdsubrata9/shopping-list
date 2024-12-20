import { useEffect, useState } from "react";

function App() {
  const [searchItem, setSearchItem] = useState("");
  const [searchResultList, setSearchResultList] = useState([]);
  const [bucketList, setBucketList] = useState([]);

  async function fetchSearchResults() {
    const data = await fetch(
      "https://api.frontendeval.com/fake/food/" + searchItem
    );
    const json = await data.json();
    console.log(json);
    setSearchResultList(json);
  }

  function handleShoppingList(e) {
    const itemIndex = e.target.getAttribute("data-id");
    if (itemIndex) {
      const obj = {
        id: Date.now(),
        data: searchResultList[itemIndex],
        isDone: false,
      };
      const copyBucketList = [...bucketList];
      copyBucketList.push(obj);
      setBucketList(copyBucketList);
    }
    setSearchItem("");
  }

  function handleRightClick(bucketItemId) {
    const copyBucketList = [...bucketList];
    const newBucketList = copyBucketList.map((bucketItem) => {
      if (bucketItem.id === bucketItemId) {
        bucketItem.isDone = !bucketItem.isDone;
      }
      return bucketItem;
    });
    setBucketList(newBucketList);
  }

  function handleCrossClick(bucketItemId) {
    const copyBucketList = [...bucketList];
    const newList = copyBucketList.filter((item) => item.id !== bucketItemId);
    setBucketList(newList);
  }

  useEffect(() => {
    if (searchItem.length >= 2) fetchSearchResults();
  }, [searchItem]);

  return (
    <div className="bg-gray-400 min-h-screen">
      <h1 className="text-3xl font-bold py-6 text-center">My Shopping List</h1>
      <div className="flex justify-center m-6">
        <input
          type="text"
          className="p-6 w-1/3 border border-black outline-none"
          placeholder="search shopping item"
          value={searchItem}
          onChange={(e) => {
            setSearchItem(e.target.value);
          }}
        />
      </div>
      {searchItem.length >= 2 && (
        <div className="flex justify-center items-center">
          <div className="h-56 w-1/4 border border-black bg-white shadow-lg rounded-lg p-4 overflow-y-auto">
            <div className="text-center" onClick={handleShoppingList}>
              {searchResultList.map((searchResult, index) => (
                <div
                  data-id={index}
                  className="text-xl m-2 p-4 bg-gray-100 rounded-md hover:bg-gray-300 cursor-pointer transition-all"
                  key={index}
                >
                  {searchResult}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className="mt-8">
        {bucketList.map((bucketItem) => (
          <div key={bucketItem.id} className="flex justify-center mb-4 mx-6">
            <div className="flex items-center bg-white p-4 rounded-lg shadow-lg w-1/3">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-4">
                  <button
                    className="text-green-500 hover:text-green-700 transition duration-200"
                    onClick={() => handleRightClick(bucketItem.id)}
                  >
                    ✓
                  </button>
                  <div
                    className={`text-lg font-semibold ${
                      bucketItem.isDone
                        ? "line-through text-gray-400"
                        : "text-black"
                    }`}
                  >
                    {bucketItem.data}
                  </div>
                </div>
                <button
                  className="text-red-500 hover:text-red-700 transition duration-200"
                  onClick={() => handleCrossClick(bucketItem.id)}
                >
                  X
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
