var s = document.getElementsByTagName("form");
for (const item of s) {
  item.addEventListener("submit", (e) => {
    e.preventDefault();
    let firstname = item.elements["fname"].value;
    let lastname = item.elements["lname"].value;
    let salary = item.elements["salary"].value;
    console.log(firstname);
    console.log(lastname);
    console.log(salary);
    var table = document.getElementById("table");
    // Create row element
    var row = document.createElement("tr");

    // Create cells
    var c1 = document.createElement("td");
    var c2 = document.createElement("td");
    var c3 = document.createElement("td");
    var c4 = document.createElement("td");
    var c5 = document.createElement("td");
    var c6 = document.createElement("td");
    var c7 = document.createElement("td");

    // Insert data to cells
    c1.innerText = firstname;
    c2.innerText = lastname;
    c3.innerText = salary;
    c4.innerText = " ";
    c5.innerText = " ";
    c6.innerText = " ";
    c7.innerText = " ";

    // Append cells to row
    row.appendChild(c1);
    row.appendChild(c2);
    row.appendChild(c3);
    row.appendChild(c4);
    row.appendChild(c5);
    row.appendChild(c6);
    row.appendChild(c7);

    // Append row to table body
    table.appendChild(row);
    item.reset();
  });
}

var result = document.getElementById("result");
console.log(result);
result.addEventListener("click", (e) => {
  e.preventDefault();
  var table = document.getElementById("table");
  console.log(table);
  for (var r = 1, n = table.rows.length; r < n; r++) {
    for (var c = 3, m = table.rows[r].cells.length; c < m; c++) {
      var d = table.rows[r].cells[2].innerText.replace(/[^\d.]/g, "");
      var comma = Intl.NumberFormat("en-US");
      if (c === 3) {
        table.rows[r].cells[c].innerText = "\u20a6"+comma.format(
          CalculatePension(d * 12)
        );
      } else if (c === 4) {
        table.rows[r].cells[c].innerText =  "\u20a6"+comma.format(
          CalculateTaxableIncome(d)
        );
      } else if (c === 5) {
        table.rows[r].cells[c].innerText = "\u20a6"+ comma.format(
          GetYearlyTax(CalculateTaxableIncome(d))
        );
      } else if (c === 6) {
        table.rows[r].cells[c].innerText =
          //   GetMonthlyTax(
          //   GetYearlyTax(CalculateTaxableIncome(table.rows[r].cells[2].innerText))
          // );
          "\u20a6"+comma.format(GetYearlyTax(CalculateTaxableIncome(d)) / 12);
      }
    }
  }
});



function CalculatePension(grossIncome) {
  if (salary <= 30000) {
    return null;
  }
  var pension = Math.fround(0.08 * grossIncome);
  return pension;
}

function CalculateTaxableIncome(salary) {
  if (salary <= 30000) {
    return null;
  }
  var annualSalary = Math.fround(salary * 12);
  var pension = CalculatePension(annualSalary);
  var grossIncome = Math.fround(annualSalary - pension);
  var twentyGross = Math.fround(0.2 * grossIncome);
  var ConsolidatedReliefAllowance = 0;
  if (200000 > Math.fround(0.01 * annualSalary)) {
    ConsolidatedReliefAllowance += 200000;
  } else {
    ConsolidatedReliefAllowance += Math.fround(0.01 * annualSalary);
  }
  var total = Math.fround(pension + twentyGross + ConsolidatedReliefAllowance);
  var taxableIncome = Math.fround(annualSalary - total);
  return taxableIncome;
}

function CalculateTaxFor1600000(salary) {
  return Math.fround(salary * 0.21);
}

function CalculateTaxFor3200000(salary) {
  return Math.fround(salary * 0.24);
}

function CalculateTaxForFirst300000(salary) {
  return Math.fround(salary * 0.07);
}

function CalculateTaxForFirst500000(salary) {
  return Math.fround(salary * 0.15);
}

function CalculateTaxForSecond300000(salary) {
  return Math.fround(salary * 0.11);
}

function CalculateTaxForSecond500000(salary) {
  return Math.fround(salary * 0.19);
}

function GetMonthlyTax(salary) {
  var annualSalary = CalculateTaxableIncome(salary);
  var yearlyTax = GetYearlyTax(annualSalary);
  return Math.fround(yearlyTax / 12);
}

function GetYearlyTax(salary) {
  var tax = 0;
  var annualSalary = salary;
  if (annualSalary <= 300000) {
    tax += CalculateTaxForFirst300000(annualSalary);
  } else if (annualSalary > 300000 && annualSalary <= 600000) {
    tax += CalculateTaxForFirst300000(300000);
    annualSalary -= 300000;
    tax += CalculateTaxForSecond300000(annualSalary);
  } else if (annualSalary > 600000 && annualSalary <= 1100000) {
    tax += CalculateTaxForFirst300000(300000);
    annualSalary -= 300000;
    tax += CalculateTaxForSecond300000(300000);
    annualSalary -= 300000;
    tax += CalculateTaxForFirst500000(annualSalary);
  } else if (annualSalary > 1100000 && annualSalary <= 1600000) {
    tax += CalculateTaxForFirst300000(300000);
    annualSalary -= 300000;
    tax += CalculateTaxForSecond300000(300000);
    annualSalary -= 300000;
    tax += CalculateTaxForFirst500000(500000);
    annualSalary -= 500000;
    tax += CalculateTaxForSecond500000(annualSalary);
  } else if (annualSalary > 1600000 && annualSalary <= 3200000) {
    tax += CalculateTaxForFirst300000(300000);
    annualSalary -= 300000;
    tax += CalculateTaxForSecond300000(300000);
    annualSalary -= 300000;
    tax += CalculateTaxForFirst500000(500000);
    annualSalary -= 500000;
    tax += CalculateTaxForSecond500000(500000);
    annualSalary -= 500000;
    tax += CalculateTaxFor1600000(annualSalary);
  } else {
    tax += CalculateTaxForFirst300000(300000);
    annualSalary -= 300000;
    tax += CalculateTaxForSecond300000(300000);
    annualSalary -= 300000;
    tax += CalculateTaxForFirst500000(500000);
    annualSalary -= 500000;
    tax += CalculateTaxForSecond500000(500000);
    annualSalary -= 500000;
    tax += CalculateTaxFor1600000(1600000);
    annualSalary -= 1600000;
    tax += CalculateTaxFor3200000(annualSalary);
  }
  return tax;
}

function Change(e) {
  formatCurrency(e);
}

var input = document.getElementById("currency-field");
input.addEventListener("blur", (e) => {
  formatCurrency(e);
  blur();
});

function formatNumber(n) {
  // format number 1000000 to 1,234,567
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatCurrency(blur) {
  // appends $ to value, validates decimal side
  // and puts cursor back in right position.
  var input = document.getElementById("currency-field");
  // get input value
  var input_val = input.value;

  // don't validate empty input
  if (input_val === "") {
    return;
  }
  console.log(input_val);
  // original length
  var original_len = input_val.length;

  // initial caret position
  var caret_pos = input.selectionStart;

  // check for decimal
  if (input_val.indexOf(".") >= 0) {
    // get position of first decimal
    // this prevents multiple decimals from
    // being entered
    var decimal_pos = input_val.indexOf(".");

    // split number by decimal point
    var left_side = input_val.substring(0, decimal_pos);
    var right_side = input_val.substring(decimal_pos);

    // add commas to left side of number
    left_side = formatNumber(left_side);

    // validate right side
    right_side = formatNumber(right_side);

    // On blur make sure 2 numbers after decimal
    if (blur === "blur") {
      right_side += "00";
    }

    // Limit decimal to only 2 digits
    right_side = right_side.substring(0, 2);

    // join number by .
    input_val =  "\u20a6" + left_side + "." + right_side;
  } else {
    // no decimal entered
    // add commas to number
    // remove all non-digits
    input_val = formatNumber(input_val);
    input_val =  "\u20a6" + input_val;

    // final formatting
    if (blur === "blur") {
      input_val += ".00";
    }
  }

  // send updated string to input
  input.value = input_val;

  // put caret back in the right position
  var updated_len = input_val.length;
  caret_pos = updated_len - original_len + caret_pos;
  input.setSelectionRange(caret_pos, caret_pos);
}
