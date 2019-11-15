import bcrypt from 'bcryptjs';

const BCRYPT_COST_FACTOR = 8;

export const getHash = (password, callback) => {
  const salt = bcrypt.genSaltSync(BCRYPT_COST_FACTOR);
  bcrypt.hash(password, salt, (err, hash) => callback(hash));
};

export const checkHash = (string, hash, callback) => {
  bcrypt.compare(string, hash, (err, res) => {
    callback(res);
  });
};
