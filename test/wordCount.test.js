var expect = require("chai").expect;
var wordCount = require("../utils/wordCount");
describe("Word Count", function() {
  // A "canary" test is one we set up to always pass
  // This can help us ensure our testing suite is set up correctly before writing real tests
  it("should return the number of words in the text", function() {
    expect(wordCount("Just do a lorem")).to.equal(4);
  });
  it("should fail when passed anything besides a string", function(){
    expect(function(){ wordCount(7); }).to.throw();
  });
  it("should count numbers as their own words", function(){
    expect(wordCount("57 58 59")).to.equal(3);
  });
  it("should return zero words with an empty string", function(){
    expect(wordCount("")).to.equal(0);
  });
  it("should return zero words with an empty string", function(){
    expect(wordCount("     ")).to.equal(0);
  });
  it("should not count extra spaces", function(){
    expect(wordCount("something    else")).to.equal(2);
  });
});
