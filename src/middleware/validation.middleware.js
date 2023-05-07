import joi from 'joi'
const dataMethods = ['body','query','params'];
export const generalFields={
  email:joi.string().email().required(),
  password : joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required() ,
  cPassword : joi.string().valid(joi.ref('newPassword')).required(),
  id:joi.string().min(24).max(24).required()
  
}
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
