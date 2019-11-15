package org.motechproject.newebodac.helper;

import java.io.UnsupportedEncodingException;
import java.security.GeneralSecurityException;
import java.security.spec.KeySpec;
import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.PBEKeySpec;
import javax.crypto.spec.SecretKeySpec;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class EncryptionHelper {

  /**
   * Gets required values to encryption - secret key, salt and iv.
   */
  @Value("${encryption.key}")
  private String secret;

  @Value("${encryption.salt}")
  private String salt;

  @Value("${encryption.iv}")
  private String iv;

  /**
   * Encrypts provided value.
   */
  public String encrypt(String strToEncrypt) {

    try {
      IvParameterSpec ivspec = new IvParameterSpec(iv.getBytes());
      SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
      KeySpec spec = new PBEKeySpec(secret.toCharArray(), salt.getBytes(), 65536, 256);
      SecretKey tmp = factory.generateSecret(spec);
      SecretKeySpec secretKey = new SecretKeySpec(tmp.getEncoded(), "AES");

      Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
      cipher.init(Cipher.ENCRYPT_MODE, secretKey, ivspec);
      return Base64.getEncoder().encodeToString(cipher.doFinal(strToEncrypt.getBytes("UTF-8")));
    } catch (GeneralSecurityException | UnsupportedEncodingException e) {
      throw new IllegalStateException("Error occurred while encrypting the data", e);
    }
  }

  /**
   * Decrypts provided value.
   */
  public String decrypt(String strToDecrypt) {

    try {
      IvParameterSpec ivspec = new IvParameterSpec(iv.getBytes());

      SecretKeyFactory factory = SecretKeyFactory.getInstance("PBKDF2WithHmacSHA256");
      KeySpec spec = new PBEKeySpec(secret.toCharArray(), salt.getBytes(), 65536, 256);
      SecretKey tmp = factory.generateSecret(spec);
      SecretKeySpec secretKey = new SecretKeySpec(tmp.getEncoded(), "AES");

      Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5PADDING");
      cipher.init(Cipher.DECRYPT_MODE, secretKey, ivspec);
      return new String(cipher.doFinal(Base64.getDecoder().decode(strToDecrypt)));
    } catch (GeneralSecurityException e) {
      throw new IllegalStateException("Error occurred while encrypting the data", e);
    }
  }
}
