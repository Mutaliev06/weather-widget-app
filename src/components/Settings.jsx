import React, { useContext, useState } from "react";
import Content from "./Content";
import { RiDeleteBinLine } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineEnter } from "react-icons/ai";
import { GlobalContext } from "./DataProvider";

const Settings = ({ setOpen, open }) => {
  const [cities, setCities] = useContext(GlobalContext)
  const [input, setInput] = useState("");

  const [currentCard, setCurrentCard] = useState(null)
 
  const addCity = () => {
      setCities([...cities, {id: cities.length, name: input}])
      setInput("")
  };

  const deleteCity = (text) => {
      const newCities = cities.filter(city => city !== text)
      setCities(newCities)
  }


  const dragStartHandler = (e, card) => {
    setCurrentCard(card)

  }
  const dragEndHandler = (e) => {
  }

  const dragLeaveHandler = (e) => {

  }

  const dragOverHandler = (e) => {
    e.preventDefault()
  }

  const dropHandler = (e, card) => {
    e.preventDefault()
    setCities(cities.map(item => {
      if (item.id === card.id) {
        return {...item, id: currentCard.id}
      }
      if (item.id === currentCard.id) {
        return {...item, id: card.id}
      }
      return item
    }))
  }

  const sortCities = (a, b) => {
    if (a.id > b.id) {
      return 1
    } else {
      return -1
    }
  }

  return (
    <div className="settings">
      {open ? (
        <div className="settings__box">
          <div className="settings__box__title">
            <h3>Settings</h3>
          </div>
          <ul className="settings__box__ul">
          {cities.sort(sortCities).map((item, index) => (
            <li 
            key={index}
            onDragStart={(e) => dragStartHandler(e, item)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e, item)}
            draggable="true" 
            className="settings__box__li">
              <div className="item__burg">
                <div>
                  <GiHamburgerMenu />
                </div>
                <div>{item.name}</div>
              </div>
              <div className="settings__box__delete">
                <RiDeleteBinLine onClick={() => deleteCity(item)}/>
              </div>
            </li>
          ))}
          </ul>
          <div className="settings__box__input">
            <div className="input__label">
              <label htmlFor="">Add Location:</label>
            </div>
            <div className="input__text">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="sumbit">
                <AiOutlineEnter onClick={addCity}/>
              </button>
            </div>
          </div>
        </div>
      ) : (
        cities.map((item) => {
          return <Content item={item} setOpen={setOpen} />;
        })
      )}
    </div>
  );
};

export default Settings;
