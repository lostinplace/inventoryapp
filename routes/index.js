
exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

var inventory = {
  jesse: ['ham', 'more ham'],
  angela: ['an awesomeboyfriend', 'an old car'],
  chris: ['a really great girlfriend']
};

exports.inventory = function (request, response){
//  debugger;
  var personalInventory = getInventoryListForRequestedUser(request);

  response.end( personalInventory, 'utf-8');
};

function getInventoryListForRequestedUser(request){
  var name = getUserNameForRequest(request),
    inventoryList = inventory[name];
  if (!inventoryList) {
    readableList = 'Nothing';
  } else {
    readableList = inventoryList.join(', ');
  }
  return readableList; 
};

function getUserNameForRequest(request){
  var name = request.url.split('/')[2];
  return name;
};

function getFriendlyInventoryPrompt(request){
  var prompt = "hello, "+ getUserNameForRequest(request);
  prompt += "you have the following items in your inventory: ";
  prompt += getInventoryListForRequestedUser(request);
  return prompt;
};