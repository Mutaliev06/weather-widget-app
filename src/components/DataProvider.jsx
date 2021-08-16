import React, { useState, useEffect, createContext } from "react";
export const GlobalContext = createContext();

const DataProvider = ({ children }) => {
  const [cities, setCities] = useState(
    () => JSON.parse(localStorage.getItem("cityStore")) || []
  );
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (cities.length === 0) {
      navigator.geolocation.getCurrentPosition((position) => {
        try {
          fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=7611703e1032af42b08107f48e55e71d`)
            .then((res) => res.json())
            .then((data) => {
              setCities([...cities, {
                id: cities.length,
                name: data.name
              }]);
              setLoading(false);
            });
        } catch (e) {
          console.log(e.message);
        }
      });
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const ssStore = JSON.parse(localStorage.getItem("cityStore"));
    if (ssStore) setCities(ssStore);
  }, [setCities]);


  useEffect(() => {
    localStorage.setItem("cityStore", JSON.stringify(cities));
  }, [cities, setCities]);



  return (
    <GlobalContext.Provider value={[cities, setCities]}>
      {children}
    </GlobalContext.Provider>
  );
};

export default DataProvider;
