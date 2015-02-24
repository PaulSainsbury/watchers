Handlebars.registerHelper('myHelper', function(myArgument){
  return "Hello, " + myArgument;
});

Handlebars.registerHelper("checkedIf",function(value){
  return value?"checked":"";
});

Handlebars.registerHelper("selectedIfEquals",function(left,right){
  return left==right?"selected":"";
});
