function VigenèreCipher (key, alphabet) {
    this.encode = function(message) {
      let result = ''; 
      let keyLength = key.length;
      let alphabetLength = alphabet.length; 
      
      for (let i = 0; i < message.length; i++) {
        let char = message[i];
        if (alphabet.includes(char)) {
          let charIndex = alphabet.indexOf(char);
          let keyChar = key[i % keyLength];
          let keyIndex = alphabet.indexOf(keyChar);
          let shiftedIndex = (charIndex + keyIndex) % alphabetLength;
  
          let shiftedChar = alphabet[shiftedIndex];
          
          result += shiftedChar;
          } else {
            result += char;
          }
      }
      return result;
    }
  
    this.decode = function(message) {
      let result = '';
      let keyLength = key.length;
      let alphabetLength = alphabet.length; 
  
      for (let i = 0; i < message.length; i++) {
        let char = message[i];
        if (alphabet.includes(char)) {
          let charIndex = alphabet.indexOf(char);
          let keyChar = key[i % keyLength];
          let keyIndex = alphabet.indexOf(keyChar);
          let shiftedIndex = (charIndex - keyIndex + alphabet.length) % alphabetLength;
          let shiftedChar = alphabet[shiftedIndex];
          
          result += shiftedChar;
        
        } else {
          result += char;
        }
      }
      return result;
    }
  }