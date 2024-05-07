import { redirect } from "react-router-dom";

export const loader = async () => {
  console.log('loading contacts...');
  return 1;
  
  // return redirect('/signup');
};
