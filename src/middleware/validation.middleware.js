const dataMethods = ['body','query','params'];
const validation = (schema) => {
  return (req, res, next) => {

    const validationErr = [];

    dataMethods.forEach((key) => {
      if (schema[key]) {
        console.log(key);
        const validationResult = schema[key].validate(req[key], {
          abortEarly: false,
        });
        if (validationResult.error) {
          validationErr.push(validationResult.error.details);
          // return res.json({ message: "validation error", validationResult });
        }
      }
    });
    if(validationErr.length > 0){
      return res.json({message:"Validation Error",validationErr})
    }

    return next();
  };
};

export default validation;
