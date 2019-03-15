exports.dateInPast = days => {

    //Adds a variable that holds the days in past based on the parameter passed
	let dateInPast = Date.now() - (days * 24 * 60 * 60 * 1000);
	dateInPast = new Date(dateInPast);
	dateInPast.setHours(00,00,01); //Set it to one second past twelve so all receipts of that days counts in

    return Date.parse(dateInPast);
  };