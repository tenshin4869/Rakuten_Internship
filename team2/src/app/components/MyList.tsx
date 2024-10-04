/* 
note: ProductList.tsxに統合したので実際に利用していないコードです

import { useState, useEffect } from "react";

interface ListItem {
  id: number;
  name: string;
  description: string;
  details: string;
}

const MyList = () => {
  const [list, setList] = useState<ListItem[]>([]); 
  const [newItem, setNewItem] = useState(""); 
  const [popupContent, setPopupContent] = useState<string | null>(null); 
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState<number | null>(null); // ラベルを押したときに詳細を表示するための状態

  useEffect(() => {
    const initialList = [
      { id: 1, name: "Item 1", description: "Hatena1", details: "stored information 1" },
      { id: 2, name: "Item 2", description: "Hatena2", details: "stored information 2" },
    ];
    setList(initialList);
  }, []);

  const addItem = () => {
    if (newItem.trim() === "") return; 
    const newItemObj = { id: list.length + 1, name: newItem, description: `${newItem}の説明`, details: `${newItem}の詳細な情報` };
    setList([...list, newItemObj]);
    setNewItem("");
  };

  const toggleDetails = (id: number) => {
    setSelectedDetails((prevSelected) => (prevSelected === id ? null : id));
  };

  const showPopup = (description: string) => {
    setPopupContent(description);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
    setPopupContent(null);
  };

  return (
    <div>
      <div className="item-container">
        <h2>My List</h2>
        <ul>
          {list.map((item) => (
            <li className="item" key={item.id}>
              <div className="label-and-btn">
                <span onClick={() => toggleDetails(item.id)}>{item.name}</span>
                <button className="info-btn" onClick={() => showPopup(item.description)}>?</button>
              </div>

              {selectedDetails === item.id && (
                <div className="details-container">
                  <p>{item.details}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="add-btn">
        <button onClick={addItem}>Add</button>
      </div>

      {isPopupVisible && (
        <div className="popup">
          <div className="popup-content">
            <p>{popupContent}</p>
            <button className="close-btn" onClick={closePopup}>閉じる</button>
          </div>
        </div>
      )}
    </div>
  );
};



export default MyList;

*/