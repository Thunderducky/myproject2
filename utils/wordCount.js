var wordCount = function(text){
  if(typeof text !== "string"){
    throw new Error("Must call wordCount with a string");
  }
  return text.split(' ').filter(fragment => {
    if(fragment.trim().length > 0){
      return true;
    } else {
      return false
    }
  }).length
};

module.exports = wordCount;
