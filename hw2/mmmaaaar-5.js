function getRootProperty(object, number) {
    for (let key in object) {
      if (Array.isArray(object[key]) && object[key].includes(number)) {
        return key;
      } else if (typeof object[key] === 'object') {
        let result = getRootProperty(object[key], number);
        if (result !== null) {
          return key;
        }
      }
    }
    return null;
}