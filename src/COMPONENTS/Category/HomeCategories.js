import React,{useState} from 'react'
import ReactCardFlip from  'react-card-flip';
import '../Category/HomeCategories.css'
const HomeCategories = () => {

    const cards = [
        {
            frontImage: 'https://media.istockphoto.com/id/1644577817/photo/assortment-of-various-types-of-vegetables-arranged-in-a-rainbow-gradient-pattern.jpg?s=612x612&w=0&k=20&c=2TR4CQB6KUa6y5_JdukMz9VzEWRlhMVIhfYvlZp5pH4=',
            backText: "Our selection of organic vegetables is picked at the peak of freshness, ensuring you get the best quality."
        },
        {
            frontImage: 'https://media.istockphoto.com/id/501706215/photo/fresh-fruits-on-wooden-table.webp?a=1&b=1&s=612x612&w=0&k=20&c=9QJ5kUYhq9noyFEKYc1Y4P1A8NWqlDtzv4EcQkQ5vug=',
            backText: "Indulge in our wide selection of fresh, seasonal fruits picked at their peak for optimal flavor and nutrition."
        },
        {
            frontImage: 'https://media.istockphoto.com/id/1137312526/photo/assortment-of-products-with-high-sugar-level.jpg?s=612x612&w=0&k=20&c=QfHpmAIdx1pjVapm0UqSfqn1U9S87EFrO1oJrke_P2g=',
            backText: " Savor artisan breads, pastries, and desserts, perfectly complemented by our refreshing beverages, including gourmet coffees, teas, and smoothies."
        },
        {
            frontImage: 'https://media.istockphoto.com/id/1132268292/photo/animal-protein-sources.webp?a=1&b=1&s=612x612&w=0&k=20&c=l13ICJe9yeUoobrRSl0LGPFnaoRpQqAk6wofkRMxW-4=',
            backText: "Quality Dairy & Fresh Meats: Savor fresh milk, cheeses, yogurts, and high-quality meats for the best taste and nutrition!"
        }
    ];

    const FlipCard = ({ frontImage, backText }) => {
        const [flip, setFlip] = useState(false);
    
        const handleCardClick = () => {
            setFlip(!flip);
        };
    
        return (
            <ReactCardFlip isFlipped={flip} flipDirection="vertical">
                {/* Front side of the card */}
                <div className="card card-front" onClick={handleCardClick}>
                    <img 
                        src={frontImage} 
                        alt="Front Card" 
                        className="card-image" 
                    />
                </div>
    
                {/* Back side of the card */}
                <div className="card card-back" onClick={handleCardClick}>
                    <div className="card-back-text">
                        <p>{backText}</p>
                    </div>
                </div>
            </ReactCardFlip>
        );
    };
    
  return (
<div className="card-container">
            {cards.map((card, index) => (
                <FlipCard 
                    key={index} 
                    frontImage={card.frontImage} 
                    backText={card.backText} 
                />
            ))}
        </div>    
  )
}

export default HomeCategories
