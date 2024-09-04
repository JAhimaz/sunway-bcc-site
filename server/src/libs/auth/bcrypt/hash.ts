
import bcrypt from 'bcrypt';

const saltRounds = 10;

const EncryptPassword = async (password: string) : Promise<{
  success: boolean,
  hash?: string
}> => {

  return await bcrypt.hash(password, saltRounds)
  .then((hash) => {
    return {
      success: true,
      hash
    };
  })
  .catch((err) => {
    return {
      success: false,
    };
  });
}

export default EncryptPassword;