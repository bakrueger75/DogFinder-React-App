import React from 'react';
import { Link } from 'react-router-dom';
import DogImage from './DogImage/DogImage';

const DogSearchItem = ({itemIndex, dog}) => {
    return (
      <div id={"dogBreed_"+itemIndex} className='col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12 justify-content-center text-center p-2' key={itemIndex} >
        <DogImage breedName={dog.breedName} breed={dog.breed} subBreed={dog.subBreed} />
        <div id={"dogBreedName_"+itemIndex} >
          <h4 className="text-capitalize text-red text-center">
            <Link to={"/detail/" + dog.breed + ((dog.subBreed) ? "/" + dog.subBreed : "")}>{dog.breedName}</Link>
          </h4>
        </div>
      </div>
    );
};

export default DogSearchItem;
