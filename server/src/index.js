import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';



 class Liste extends React.Component {
     render() {
         const List = require("./restaurant_both.json");
         const listeItem = List.map((d)=>
         <div className={d.name}>
             <h3 className="nom">{d.name}</h3>
             <h3 className='info'>information complementaire :</h3>
             <h3 className='num'>numero : {d.num}</h3>
             <h3 className='location'>adresse : {d.location}</h3>
             <p><a className='location' href={d.link}>Visit our HTML tutorial</a></p>
             

         </div>);
         var status = listeItem.size
       return (
        <div>
        <div className="ListRestaurant">
            Liste des restaurant possedant la recompense Bib Gourmand et Maitre Restaurateur
        </div>
        <div className="List">
          {listeItem}
        </div>
        </div>
       );
     }
   }







  ReactDOM.render(<Liste />, document.getElementById("root"));


