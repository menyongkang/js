const camelCasedData = {
  age: 18,
  gender: "female",
  experiences: [{
      from: "2009-09",
      to: "2013-06",
      exp: "School"
    },
    {
      from: "2013-09",
      to: "2020-02",
      exp: "Job",
    }
  ],
}

const camelToPascal = (input) => {
  // TODO
  let newObj = {};
  let upperKey = (key) => key.replace(key[0], key[0].toUpperCase());
  for (let [key, value] of Object.entries(input)) {
    if (Array.isArray(value) && value.length > 0) {
      newObj[upperKey(key)] = value.map((item) => {
        if (JSON.stringify(item) !== "{}") {
          return camelToPascal(item)
        }
      });
    } else {
      newObj[upperKey(key)] = value;
    }
  }
  return newObj;
};

const pascalToCamel = (input) => {
  // TODO
  let newObj = {};
  let upperKey = (key) => key.replace(key[0], key[0].toLowerCase());
  for (let [key, value] of Object.entries(input)) {
    if (Array.isArray(value) && value.length > 0) {
      newObj[upperKey(key)] = value.map((item) => {
        if (JSON.stringify(item) !== "{}") {
          return pascalToCamel(item)
        }
      });
    } else {
      newObj[upperKey(key)] = value;
    }
  }
  return newObj;
};

const pascalCased = camelToPascal(camelCasedData);
console.log(pascalCased);
/* 期望输出：
{
  Age: 18,
  Gender: "female",
  Experiences: [
      { From: "2009-09", To: "2013-06", Exp: "School" },
      { From: "2013-09", To: "2020-02", Exp: "Job" },
  ]
}
*/

const camelCasedData2 = pascalToCamel(pascalCased);
console.log(camelCasedData2)
// 应该和 camelCasedData 一样