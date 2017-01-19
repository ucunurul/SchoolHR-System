window.onload = function(){
	document.getElementById("displayResults").style.visibility = "hidden";
	// document.getElementById("calculateSalary").disabled = true;
    // create employee class
    function Employee(){
    	this.basicSalary = 25000;
    	this.salary = 0;
        this.health = 0;
        this.feeding = 0;
        this.transport = 0;
        this.vat = 0;

    }
    // calculate salary method
    Employee.prototype.calculateSalary = function(level, type){
    	this.level = parseInt(level);
    	this.type = type;
    	if(type == "leader"){
            var salaryMod = 1000;
    	}
    	else if(type == "teacher"){
    		var salaryMod = 500;
    	}
    	else if(type == "staff"){
    		var salaryMod = 100;
    	}
    	else if(type == "security"){
    		var salaryMod = 50;
    	}
    	else if(type == "pantry"){
    		var salaryMod = 25;
    	}
        this.salary = this.basicSalary * salaryMod * level
        this.health = 20000 * level;
        this.feeding = 4000 * level;
        this.transport = 2500 * level;
        this.housing = 45000 * level;
        this.vat = 0.05 * (this.salary + this.health + this.feeding + this.transport);
    }

	function displayResult(e){
		e.preventDefault();
		var level = document.getElementById("level").value;
		var type = document.getElementById("type").value;
		var worker = new Employee();
		worker.calculateSalary(level, type);
		
		document.getElementById("employeeType").textContent = worker.type;
		document.getElementById("employeeLevel").textContent = worker.level;
		document.getElementById("employeeSalary").textContent = worker.salary;
		document.getElementById("employeeFeeding").textContent = worker.feeding;
		document.getElementById("employeeTransport").textContent = worker.transport;
		document.getElementById("employeeHealth").textContent = worker.health;

	    document.getElementById("displayResults").style.visibility = "visible";
	}


	document.getElementById("calculateSalary").addEventListener("click", displayResult);
}