function findByType(type, myArray) {
  for (var i = 0; i < myArray.length; i++) {
    if (myArray[i].type === type) {
      return myArray[i];
    }
  }
}
