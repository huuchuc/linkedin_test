describe('msgService: Unit testing #1', function() {
  
  	var Message, rootScope;

  	beforeEach(module('msgService'));

	// Register mocks in Angular JS context
    beforeEach(module(function($provide) {
	    $provide.service('Flash', function() {
	    	return {
		      	//Create
		      	create : function(){
		      		return 1;
		      	},
		      	clear : function(){}
	      	}
	    });
	}));

	// Get instance of msgService with mocked dependencies from Angular JS context
	beforeEach(inject(function (_Message_, _$rootScope_) {
	    Message = _Message_;
	    rootScope = _$rootScope_;
	}));

	  // Check init
	  it('Flash define', function() {
	    expect(Message).toBeDefined();
	  });

	  //create alert should be called
	  it("Message.createAlertSuccess be called", function() {
	    expect(Message.createAlertSuccess('a')).toBeGreaterThan(0);
	  });

	  // CHECK LOGIN FAIL
	  it('Message.createAlertError be called', function() {
	    expect(Message.createAlertError('a')).toBeGreaterThan(0);
	  });

})