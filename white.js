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
      console.log(table.rows[r].cells[c]);

      if (c === 3) {
        table.rows[r].cells[c].innerText = CalculatePension(
          table.rows[r].cells[2].innerText * 12
        );
      } else if (c === 4) {
        table.rows[r].cells[c].innerText = CalculateTaxableIncome(
          table.rows[r].cells[2].innerText
        );
      } else if (c === 5) {
        table.rows[r].cells[c].innerText = GetYearlyTax(
          CalculateTaxableIncome(table.rows[r].cells[2].innerText)
        );
      } else if (c === 6) {
        table.rows[r].cells[c].innerText =
          //   GetMonthlyTax(
          //   GetYearlyTax(CalculateTaxableIncome(table.rows[r].cells[2].innerText))
          // );
          GetYearlyTax(
            CalculateTaxableIncome(table.rows[r].cells[2].innerText)
          ) / 12;
      }
    }
  }
});
console.log(GetYearlyTax(2744000));
console.log(GetMonthlyTax(9845000));
function CalculatePension(grossIncome) {
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

// public decimal CalculatePension(decimal GI)
// {
//     var pension = (8 / 100m) * GI;
//     return pension;
// }

// public decimal CalculateTaxableIncome(decimal salary)
// {
//     if(salary <= 30000)
//     {
//         throw new ArgumentException("Salary not taxable");
//     }
//     decimal annualSalary = salary*12;
//     decimal pension = CalculatePension(annualSalary);
//     decimal grossIncome = annualSalary - pension;
//     decimal twentyGross = (20/100m) * grossIncome;
//     decimal ConsolidatedReliefAllowance = 0;
//     if (200000 > ((1 / 100m) * annualSalary))
//     {
//         ConsolidatedReliefAllowance += 200000;
//     }
//     else
//     {
//         ConsolidatedReliefAllowance += ((1 / 100m) * annualSalary);
//     }
//     decimal total = pension + twentyGross + ConsolidatedReliefAllowance;
//     decimal taxableIncome = annualSalary - total;
//     return taxableIncome;
// }

// public decimal CalculateTaxFor1600000(decimal salary)
// {
//     return salary * (21 / 100m);
// }

// public decimal CalculateTaxFor3200000(decimal salary)
// {
//     return salary * (24 / 100m);
// }

// public decimal CalculateTaxForFirst300000(decimal salary)
// {
//     return (salary * (7 / 100m));
// }

// public decimal CalculateTaxForFirst500000(decimal salary)
// {
//     return (salary * (15 / 100m));
// }

// public decimal CalculateTaxForSecond300000(decimal salary)
// {
//     return (salary * (11 / 100m));
// }

// public decimal CalculateTaxForSecond500000(decimal salary)
// {
//     return salary * (19 / 100m);
// }

// public decimal GetMonthlyTax(decimal salary)
// {
//     decimal annualSalary=CalculateTaxableIncome(salary);
//       decimal yearlyTax=GetYearlyTax(annualSalary);
//     return yearlyTax/12;
// }

// public decimal GetYearlyTax(decimal salary)
// {
//     decimal tax = 0;
//     decimal annualSalary = salary;
//     if(annualSalary <= 300000)
//     {
//         tax += CalculateTaxForFirst300000((annualSalary));
//     }
//     else if(annualSalary > 300000 && annualSalary <= 600000)
//     {
//         tax += CalculateTaxForFirst300000(300000);
//         annualSalary-= 300000;
//         tax += CalculateTaxForSecond300000(annualSalary);
//     }
//     else if(annualSalary > 600000 && annualSalary <= 1100000)
//     {
//         tax += CalculateTaxForFirst300000(300000);
//         annualSalary -= 300000;
//         tax += CalculateTaxForSecond300000(300000);
//         annualSalary -= 300000;
//         tax += CalculateTaxForFirst500000(annualSalary);
//     }
//     else if(annualSalary > 1100000 && annualSalary <= 1600000)
//     {
//         tax += CalculateTaxForFirst300000(300000);
//         annualSalary -= 300000;
//         tax += CalculateTaxForSecond300000(300000);
//         annualSalary -= 300000;
//         tax += CalculateTaxForFirst500000(500000);
//         annualSalary -= 500000;
//         tax +=CalculateTaxForSecond500000(annualSalary);
//     }
//     else if(annualSalary > 1600000 && annualSalary <= 3200000)
//     {
//         tax += CalculateTaxForFirst300000(300000);
//         annualSalary -= 300000;
//         tax += CalculateTaxForSecond300000(300000);
//         annualSalary -= 300000;
//         tax += CalculateTaxForFirst500000(500000);
//         annualSalary -= 500000;
//         tax += CalculateTaxForSecond500000(500000);
//         annualSalary -= 500000;
//         tax += CalculateTaxFor1600000(annualSalary);
//     }
//     else
//     {
//         tax += CalculateTaxForFirst300000(300000);
//         annualSalary -= 300000;
//         tax += CalculateTaxForSecond300000(300000);
//         annualSalary -= 300000;
//         tax += CalculateTaxForFirst500000(500000);
//         annualSalary -= 500000;
//         tax += CalculateTaxForSecond500000(500000);
//         annualSalary -= 500000;
//         tax += CalculateTaxFor1600000(1600000);
//         annualSalary -= 1600000;
//         tax += CalculateTaxFor3200000(annualSalary);
//     }
//     return tax;
// }
