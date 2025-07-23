import User from '../models/user.model.js';

export const getUserById =  async (request, response) => {
  const {id} = request.params;
  debugger;
  if(!id)
  {
    console.error("User Id is null");
  }

  try{
    const userDetail = await User.findOne({_id: id});
    if(!userDetail)
    {
      console.error("User not found against id:", id);
      response.status(400).json({message:`User not found against id:${id}`});
    }
    else{
      response.status(200).json({userDetail});
    }
  }
  catch(exception)
  {
    response.status(500).json({message:`Exception occurred ${exception}`});
  }
}
