export function totalStudents(data) {
  let totalStudents = 0;
  let failedStudents = 0;
  let withdrewStudents = 0;
  for (let i = 0; i < data.length; i++) {
    totalStudents += data[i].students;
    failedStudents += data[i].numF;
    withdrewStudents += data[i].numW;
  }
  return [totalStudents, failedStudents, withdrewStudents];
}

export function totalAvgGPA(data) {
  let result = 0;
  let students = totalStudents(data)[0];
  for (let i = 0; i < data.length; i++) {
    result += data[i].avgGPA * data[i].students;
  }

  return (result / students).toString().substring(0,6);
}

export function gpaByProf(data) {
  let result = [];
  for (let i = 0; i < data.length; i++) {
    let prof = data[i].instructor;
    if (containsProf(result, prof) == -1) {
      result.push({
        "Professor": prof,
        "GPA": data[i].avgGPA,
        "students": data[i].students
      });
    } else {
      result[containsProf(result, prof)].GPA = 
        (data[i].avgGPA * data[i].students 
          + result[containsProf(result, prof)].GPA * result[containsProf(result, prof)].students) 
          / (data[i].students + result[containsProf(result, prof)].students);
      result[containsProf(result, prof)].students += data[i].students;
    }
  }
  return result;
}

function containsProf(ary, prof) {
  let idx = -1;
  for (let i = 0; i < ary.length; i++) {
    if (ary[i].Professor == prof) idx = i;
  }
  return idx;
}

export function findVeteranProf(ary) {
  let idx = 0;
  let students = 0;
  for (let i = 0; i < ary.length; i++) {
    if (ary[i].students > students) {
      idx = i;
      students = ary[i].students;
    }
  }
  return ary[idx].Professor;
}

export function findBestProf(ary) {
  let idx = 0;
  let GPA = 0.0;
  for (let i = 0; i < ary.length; i++) {
    if (ary[i].GPA > GPA) {
      idx = i;
      GPA = ary[i].GPA;
    }
  }
  return ary[idx].Professor;
}

export function findWorstProf(ary) {
  let idx = 0;
  let GPA = 4.0;
  for (let i = 0; i < ary.length; i++) {
    if (ary[i].GPA < GPA) {
      idx = i;
      GPA = ary[i].GPA;
    }
  }
  return ary[idx].Professor;
}

export function gpaXYFit(data) {
  let result = [];
  for (let i = 0; i < data.length; i++) {
    let year = data[i].year + " " + data[i].term
    if (containsTime(result, year) == -1) {
      result.push({
        "Time": year,
        "GPA": data[i].avgGPA,
        "students": data[i].students
      });
    } else {
      result[containsTime(result, year)].GPA = 
        (data[i].avgGPA * data[i].students 
          + result[containsTime(result, year)].GPA * result[containsTime(result, year)].students) 
          / (data[i].students + result[containsTime(result, year)].students);
      result[containsTime(result, year)].students += data[i].students;
    }
  }
  result.reverse();
  let x = [];
  let y = [];
  for (let i = 0; i < result.length; i++) {
    let term = result[i].Time.charAt(5) == 'S' ? 0 : 0.5;
    let year = parseFloat(result[i].Time.substring(0,4)) + term;
    x.push(year);
    y.push(result[i].GPA);
  }
  let slope = leastSquareFitForSlope(x, y);

  return slope;
}

function containsTime(ary, year) {
  let idx = -1;
  for (let i = 0; i < ary.length; i++) {
    if (ary[i].Time == year) idx = i;
  }
  return idx;
}

function leastSquareFitForSlope(values_x, values_y) {
    var x_sum = 0;
    var y_sum = 0;
    var xy_sum = 0;
    var xx_sum = 0;
    var count = 0;

    /*
     * The above is just for quick access, makes the program faster
     */
    var x = 0;
    var y = 0;
    var values_length = values_x.length;

    if (values_length != values_y.length) {
        throw new Error('The parameters values_x and values_y need to have same size!');
    }

    /*
     * Above and below cover edge cases
     */
    if (values_length === 0) {
        return [ [], [] ];
    }

    /*
     * Calculate the sum for each of the parts necessary.
     */
    for (let i = 0; i< values_length; i++) {
        x = values_x[i];
        y = values_y[i];
        x_sum+= x;
        y_sum+= y;
        xx_sum += x*x;
        xy_sum += x*y;
        count++;
    }

    /*
     * Calculate m and b for the line equation:
     * y = x * m + b
     */
    var m = (count*xy_sum - x_sum*y_sum) / (count*xx_sum - x_sum*x_sum);
    var b = (y_sum/count) - (m*x_sum)/count;

    return m;
}

export function numTerms(data) {
  let result = [];
  for (let i = 0; i < data.length; i++) {
    let year = data[i].year + " " + data[i].term
    if (containsTime(result, year) == -1) {
      result.push({
        "Time": year,
        "GPA": data[i].avgGPA,
        "students": data[i].students
      });
    } else {
      result[containsTime(result, year)].GPA = 
        (data[i].avgGPA * data[i].students 
          + result[containsTime(result, year)].GPA * result[containsTime(result, year)].students) 
          / (data[i].students + result[containsTime(result, year)].students);
      result[containsTime(result, year)].students += data[i].students;
    }
  }
  return result.length;
}