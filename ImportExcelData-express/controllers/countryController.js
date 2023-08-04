const mongoose = require("mongoose");
const C = mongoose.model("country");

//GET ALL COUNTRIES DATA
const getCountries = (request, response) => {
 C.find().exec((error, Countries) => {
    if (error) {
      response.status(400).json(error);
    } else {
      if (Countries) {
        response.status(201).json(Countries);
      } else {
        return response.status(404).json({
          message: "Country not found",
        });
      }
    }
  });
};

//ADD COUNTRY DATA
const createCountry = (request, response) => {
 C.create(
    {
      name: request.body.name,
      code: request.body.code
    },
    (error, Country) => {
      if (error) {
        response.status(400).json(error);
      } else {
        response.status(201).json(Country);
      }
    }
  );
};

//UPDATE A SPECIFIC COUNTRY DATA
const updateCountry = (request, response) => {
  const Countryid = request.params.Countryid;

 C.findById(Countryid).exec((error, Country) => {
    if (!Country) {
      return response.status(404).json({
        message: "Countryid not found",
      });
    } else if (error) {
      return response.status(400).json(error);
    }
    Country.name = request.body.name;
      Country.code = request.body.code;
    Country.save((error, Country) => {
      if (error) {
        response.status(404).json(error);
      } else {
        response.status(200).json(Country);
      }
    });
  });
};


//DELETE SPECIFIC COUNTRY DATA
const deleteCountry = (request, response) => {
  const { Countryid } = request.params;
  if (Countryid) {
   C.findByIdAndRemove(Countryid).exec((error, Country) => {
      if (error) {
        response.status(404).json(error);
      }
      response.status(204).json({ message: "deleted" });
    });
  } else {
    return response.status(404).json({ message: "Countryid not found" });
  }
};

//READ A SPECIFIC COUNTRY DATA
const readCountry = (request, response) => {
  const Countryid = request.params.Countryid;
 C.findById(Countryid).exec((err, Country) => {
    if (!Country) {
      return response.status(404).json({
        message: "Country not found",
      });
    } else if (err) {
      return response.status(404).json(err);
    }
    response.status(200).json(Country);
  });
};

//ADD COUNTRY FUNCTION

const addCountry = (data) => {
  C.create(
    {
      name: data.name,
      code: data.code
    },
    (error, Country) => {
      if (error) {
        console.log("failed");
      } else {
        console.log("Country data added");
      }
    }
  );
};

module.exports = {
  getCountries,
  createCountry,
  updateCountry,
  deleteCountry,
  readCountry,
  addCountry
};
