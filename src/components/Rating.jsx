import React from 'react';
import StarRatings from 'react-star-ratings';

const Rating = ({ rating = 4.5 }) => {
    return (
        <div className="flex items-center">
            <StarRatings
                rating={rating}
                starRatedColor="orange"
                starEmptyColor="gray"
                starDimension="24px"
                starSpacing="2px"
                numberOfStars={5}
                name='rating'
            />
        </div>
    );
};

export default Rating;
